import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'

// Solo disponible en desarrollo
const IS_DEV = process.env.NODE_ENV === 'development'

const noticias = [
    {
        titulo: 'Talleres golea *4 a 0* a Huracán en el Kempes',
        slug: 'talleres-golea-4-0-huracan',
        categoria: 'Partido',
        tamaño: 'medium' as const,
        destacada: false,
        resumen: 'El equipo de Vélez mostró su mejor fútbol ante un Huracán que no pudo con la intensidad albiazul. Cuatro goles que ilusionan de cara al campeonato.',
        autor: 'Redacción TalleresWeb',
        tiempoLectura: 3,
    },
    {
        titulo: '*INCORPORACIÓN* El Burrito Martínez llega a préstamo',
        slug: 'incorporacion-burrito-martinez',
        categoria: 'Fichajes',
        tamaño: 'medium' as const,
        destacada: false,
        resumen: 'El delantero de 24 años se suma al plantel albiazul hasta diciembre. Viene de anotar 9 goles en la primera mitad de temporada en su club anterior.',
        autor: 'Área de Prensa',
        tiempoLectura: 2,
    },
    {
        titulo: 'Tres jugadores de Talleres *convocados* para la selección',
        slug: 'tres-jugadores-seleccion-argentina',
        categoria: 'Selección',
        tamaño: 'small' as const,
        destacada: false,
        resumen: 'El técnico de la Albiceleste llamó a tres jugadores del plantel cordobés para la próxima fecha FIFA.',
        autor: 'Redacción TalleresWeb',
        tiempoLectura: 3,
    },
    {
        titulo: 'El sistema táctico *4-3-3* que usa el técnico esta temporada',
        slug: 'sistema-tactico-4-3-3-temporada',
        categoria: 'Análisis',
        tamaño: 'small' as const,
        destacada: false,
        resumen: 'Un análisis detallado de cómo el entrenador implementa su idea de juego y por qué funciona tan bien con los volantes actuales.',
        autor: 'Análisis Táctico',
        tiempoLectura: 5,
    },
    {
        titulo: 'El *Kempes* espera el lleno total para el clásico del domingo',
        slug: 'kempes-lleno-clasico-domingo',
        categoria: 'Estadio',
        tamaño: 'small' as const,
        destacada: false,
        resumen: 'Ya se vendieron más del 85% de las entradas disponibles. La barra popular agotó su sector en menos de dos horas.',
        autor: 'Redacción TalleresWeb',
        tiempoLectura: 2,
    },
    {
        titulo: '*Avanzan* las obras del Centro de Alto Rendimiento',
        slug: 'obras-centro-alto-rendimiento',
        categoria: 'Institucional',
        tamaño: 'small' as const,
        destacada: false,
        resumen: 'La comisión directiva mostró imágenes del progreso de las instalaciones que estarán listas para el inicio de la próxima pretemporada.',
        autor: 'Prensa Institucional',
        tiempoLectura: 3,
    },
    {
        titulo: 'Movimientos del *mercado*: quién entra y quién sale',
        slug: 'mercado-pases-entradas-salidas',
        categoria: 'Fichajes',
        tamaño: 'small' as const,
        destacada: false,
        resumen: 'Repasamos los rumores más fuertes del mercado de pases y qué posibilidades concretas tiene el club de cerrar nuevas incorporaciones.',
        autor: 'Mercado de Pases',
        tiempoLectura: 4,
    },
]

export async function POST() {
    if (!IS_DEV) {
        return NextResponse.json({ error: 'Solo disponible en desarrollo' }, { status: 403 })
    }

    try {
        const payload = await getPayloadClient()
        const creados: string[] = []
        const omitidos: string[] = []

        for (const noticia of noticias) {
            // Evitar duplicados por slug
            const { docs } = await payload.find({
                collection: 'noticias',
                where: { slug: { equals: noticia.slug } },
                limit: 1,
            })

            if (docs.length > 0) {
                omitidos.push(noticia.slug)
                continue
            }

            await payload.create({
                collection: 'noticias',
                data: noticia as any,
            })
            creados.push(noticia.slug)
        }

        return NextResponse.json({
            ok: true,
            creados,
            omitidos,
            mensaje: `${creados.length} noticias creadas, ${omitidos.length} ya existían`,
        })
    } catch (err: any) {
        console.error('[seed]', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
