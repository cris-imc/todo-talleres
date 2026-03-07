import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'

// Mapa de competencias que aparecen en Promiedos → valor del CMS
const COMP_MAP: Record<string, string> = {
    'liga profesional': 'liga',
    'liga prof.': 'liga',
    'copa argentina': 'copa',
    'libertadores': 'libertadores',
    'copa libertadores': 'libertadores',
    'sudamericana': 'sudamericana',
    'copa sudamericana': 'sudamericana',
    'amistoso': 'amistoso',
}

function mapCompetencia(raw: string): string {
    const lower = raw.toLowerCase().trim()
    for (const [key, val] of Object.entries(COMP_MAP)) {
        if (lower.includes(key)) return val
    }
    return 'liga' // default
}

// Mapa de estadios por rival (visitante)
const ESTADIOS: Record<string, string> = {
    'Belgrano': 'Estadio Mario A. Kempes, Córdoba',       // clásico cordobés, neutro
    'Instituto': 'Mario A. Kempes, Córdoba',
    'Independiente': 'Estadio Libertadores de América, Avellaneda',
    'Boca Jrs.': 'Mario A. Kempes, Córdoba',
    'Defensa': 'Estadio Norberto Tomaghello, Florencio Varela',
    'Defensa y Justicia': 'Estadio Norberto Tomaghello, Florencio Varela',
    'River': 'Estadio Monumental, Buenos Aires',
    'Racing': 'Estadio Presidente Perón, Avellaneda',
    'San Lorenzo': 'Estadio Pedro Bidegain, Buenos Aires',
    'Huracán': 'Estadio Tomás A. Ducó, Buenos Aires',
    'Platense': 'Estadio Ciudad de Vicente López, Buenos Aires',
    'Lanús': 'Estadio Ciudad de Lanús, Lanús',
    'Estudiantes': 'Estadio Ciudad de La Plata, La Plata',
    "Newell's": 'Estadio Marcelo Bielsa, Rosario',
    'Rosario Central': 'Estadio Gigante de Arroyito, Rosario',
    'Vélez': 'Estadio José Amalfitani, Buenos Aires',
    'Gimnasia (M)': 'Estadio José María Minella, Mar del Plata',
    'Central Córdoba': 'Estadio Estadio Alfredo Terrera, Santiago del Estero',
    'Riestra': 'Estadio Guillermo Laza, Buenos Aires',
}

const ESTADIO_LOCAL = 'Mario A. Kempes, Córdoba'

// Mapa de códigos cortos
const CODIGOS: Record<string, string> = {
    'Instituto': 'INS',
    'Belgrano': 'BEL',
    'Independiente': 'IND',
    'Boca Jrs.': 'BOC',
    'Defensa': 'DEF',
    'Defensa y Justicia': 'DEF',
    'River': 'RIV',
    'Racing': 'RAC',
    'San Lorenzo': 'SLO',
    'Huracán': 'HUR',
    'Platense': 'PLA',
    'Lanús': 'LAN',
    'Estudiantes': 'EST',
    "Newell's": 'NEW',
    'Rosario Central': 'CEN',
    'Vélez': 'VEL',
    'Gimnasia (M)': 'GIM',
    'Central Córdoba': 'CCO',
    'Riestra': 'RIE',
    'Unión': 'UNI',
    'Sarmiento': 'SAR',
    'Banfield': 'BAN',
    'Aldosivi': 'ALD',
    'Barracas': 'BAR',
    'Tigre': 'TIG',
    'Argentinos': 'ARG',
    'Colón': 'COL',
    'Gimnasia LP': 'GLP',
    'Ind. Rivadavia': 'IRI',
}

function getCode(rival: string): string {
    for (const [key, val] of Object.entries(CODIGOS)) {
        if (rival.toLowerCase().includes(key.toLowerCase())) return val
    }
    return rival.substring(0, 3).toUpperCase()
}

// Cuerpo que envía el scraper
interface PartidoScrapeado {
    rival: string
    condicion: 'local' | 'visitante'
    dia: string        // "12/03"
    hora: string       // "19:15"
    competencia?: string
    anio?: number
}

export async function POST(req: Request) {
    try {
        const { partidos: raw, apiKey }: { partidos: PartidoScrapeado[]; apiKey?: string } = await req.json()

        // Protección mínima: clave de scraping
        if (apiKey !== (process.env.SCRAPE_SECRET ?? 'talleres2026')) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const payload = await getPayloadClient()
        const creados: string[] = []
        const omitidos: string[] = []
        const anio = new Date().getFullYear()

        for (const p of raw) {
            // Parsear fecha: "12/03" + hora "19:15" → ISO con timezone -03:00
            const [dia, mes] = p.dia.split('/').map(Number)
            const [hh, mm] = p.hora.split(':').map(Number)

            // Determinar año: si el mes es menor al actual → año siguiente
            const now = new Date()
            const targetYear = (mes < now.getMonth() + 1) ? anio + 1 : anio
            const fechaISO = `${targetYear}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}T${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00.000-03:00`

            const competitor = p.rival.trim()
            const condicion = p.condicion

            // Anti-duplicados: mismo rival + misma fecha
            const { docs } = await payload.find({
                collection: 'partidos',
                where: {
                    and: [
                        { rival: { equals: competitor } },
                        { fecha: { equals: fechaISO } },
                    ],
                },
                limit: 1,
            })
            if (docs.length > 0) {
                omitidos.push(competitor)
                continue
            }

            const estadio = condicion === 'local'
                ? ESTADIO_LOCAL
                : (ESTADIOS[competitor] ?? 'A confirmar')

            await payload.create({
                collection: 'partidos',
                data: {
                    rival: competitor,
                    condicion,
                    fecha: fechaISO,
                    competencia: mapCompetencia(p.competencia ?? 'liga profesional'),
                    estadio,
                    estado: 'proximo',
                    codigoRival: getCode(competitor),
                } as any,
            })
            creados.push(`${competitor} (${condicion}) — ${p.dia} ${p.hora}`)
        }

        return NextResponse.json({
            ok: true,
            creados,
            omitidos,
            mensaje: `${creados.length} partidos creados, ${omitidos.length} ya existían`,
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
