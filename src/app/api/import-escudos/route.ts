import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'

/**
 * POST /api/import-escudos
 * Recibe: { escudos: [{ rival, mediaUrl }], apiKey }
 * Descarga cada imagen, la sube a media y vincula al partido.
 * Solo funciona en desarrollo.
 */
export async function POST(req: Request) {
    if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Solo en desarrollo' }, { status: 403 })
    }

    const { escudos, apiKey } = await req.json()
    if (apiKey !== (process.env.SCRAPE_SECRET ?? 'talleres2026')) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const payload = await getPayloadClient()
    const creados: string[] = []
    const errores: string[] = []

    for (const { rival, mediaUrl } of (escudos ?? [])) {
        try {
            // Descargar imagen
            const imgRes = await fetch(mediaUrl)
            if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status} descargando imagen`)

            const buffer = Buffer.from(await imgRes.arrayBuffer())
            const mimeType = imgRes.headers.get('content-type') || 'image/png'
            const ext = mimeType.includes('svg') ? 'svg' : mimeType.includes('jpeg') || mimeType.includes('jpg') ? 'jpg' : 'png'
            const filename = `escudo_${rival.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`

            // Subir a media via Payload local
            const mediaDoc = await payload.create({
                collection: 'media',
                data: { alt: `Escudo ${rival}` },
                file: {
                    data: buffer,
                    mimetype: mimeType,
                    name: filename,
                    size: buffer.length,
                },
            })
            const mediaId = mediaDoc.id

            // Buscar todos los partidos con ese rival y actualizar
            const { docs } = await payload.find({
                collection: 'partidos',
                where: { rival: { equals: rival } },
                limit: 50,
            })

            for (const partido of docs) {
                if (partido.escudoRival) continue  // ya tiene
                await payload.update({
                    collection: 'partidos',
                    id: partido.id,
                    data: { escudoRival: mediaId } as any,
                })
            }

            creados.push(`${rival} (mediaId: ${mediaId}, ${docs.length} partidos actualizados)`)
        } catch (err: any) {
            errores.push(`${rival}: ${err.message}`)
        }
    }

    return NextResponse.json({
        ok: true,
        creados,
        errores,
        mensaje: `${creados.length} escudos importados, ${errores.length} errores`,
    })
}
