import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'

const IS_DEV = process.env.NODE_ENV === 'development'

const partidos = [
    {
        rival: 'Huracán',
        condicion: 'local',
        fecha: '2026-03-15T18:00:00.000-03:00',
        competencia: 'liga',
        estadio: 'Mario A. Kempes, Córdoba',
        estado: 'proximo',
        codigoRival: 'HUR',
    },
    {
        rival: 'Racing Club',
        condicion: 'visitante',
        fecha: '2026-03-22T21:30:00.000-03:00',
        competencia: 'liga',
        estadio: 'Cilindro de Avellaneda',
        estado: 'proximo',
        codigoRival: 'RAC',
    },
    {
        rival: 'Boca Juniors',
        condicion: 'local',
        fecha: '2026-03-30T17:00:00.000-03:00',
        competencia: 'copa',
        estadio: 'Mario A. Kempes, Córdoba',
        estado: 'proximo',
        codigoRival: 'BOC',
    },
    {
        rival: 'River Plate',
        condicion: 'visitante',
        fecha: '2026-04-04T20:00:00.000-03:00',
        competencia: 'liga',
        estadio: 'Monumental, Buenos Aires',
        estado: 'proximo',
        codigoRival: 'RIV',
    },
    {
        rival: 'Independiente',
        condicion: 'local',
        fecha: '2026-04-13T18:00:00.000-03:00',
        competencia: 'liga',
        estadio: 'Mario A. Kempes, Córdoba',
        estado: 'proximo',
        codigoRival: 'IND',
    },
]

export async function POST() {
    if (!IS_DEV) return NextResponse.json({ error: 'Solo en desarrollo' }, { status: 403 })

    try {
        const payload = await getPayloadClient()
        const creados: string[] = []

        for (const p of partidos) {
            // Evitar duplicados: buscar por rival + fecha
            const { docs } = await payload.find({
                collection: 'partidos',
                where: {
                    and: [
                        { rival: { equals: p.rival } },
                        { fecha: { equals: p.fecha } },
                    ],
                },
                limit: 1,
            })
            if (docs.length > 0) continue

            await payload.create({ collection: 'partidos', data: p as any })
            creados.push(`${p.rival} (${p.condicion})`)
        }

        return NextResponse.json({
            ok: true,
            creados,
            mensaje: `${creados.length} partidos creados`,
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
