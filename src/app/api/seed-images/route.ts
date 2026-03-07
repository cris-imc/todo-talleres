import { NextResponse } from 'next/server'
import { getPayloadClient } from '../../../lib/payload'
import { readFileSync, statSync } from 'fs'
import { join } from 'path'

const IS_DEV = process.env.NODE_ENV === 'development'

// Asignación imagen por slug de noticia
const imageMap: Record<string, { file: string; alt: string }> = {
    'talleres-golea-4-0-huracan': { file: 'seed-partido.png', alt: 'Talleres celebra el gol ante Huracán' },
    'incorporacion-burrito-martinez': { file: 'seed-plantel.png', alt: 'El Burrito Martínez en su presentación' },
    'tres-jugadores-seleccion-argentina': { file: 'seed-plantel.png', alt: 'Jugadores de Talleres en la selección' },
    'sistema-tactico-4-3-3-temporada': { file: 'seed-partido.png', alt: 'Análisis táctico del equipo' },
    'kempes-lleno-clasico-domingo': { file: 'seed-estadio.png', alt: 'El Kempes a pleno el domingo' },
    'obras-centro-alto-rendimiento': { file: 'seed-estadio.png', alt: 'Obras del Centro de Alto Rendimiento' },
    'mercado-pases-entradas-salidas': { file: 'seed-plantel.png', alt: 'Mercado de pases del club' },
}

export async function POST() {
    if (!IS_DEV) {
        return NextResponse.json({ error: 'Solo disponible en desarrollo' }, { status: 403 })
    }

    try {
        const payload = await getPayloadClient()
        const publicDir = join(process.cwd(), 'public')
        const actualizados: string[] = []
        const errores: string[] = []

        // Cachea los IDs de media ya subidos para no duplicar
        const mediaCache: Record<string, number | string> = {}

        for (const [slug, imgInfo] of Object.entries(imageMap)) {
            try {
                // 1. Buscar la noticia por slug
                const { docs } = await payload.find({
                    collection: 'noticias',
                    where: { slug: { equals: slug } },
                    limit: 1,
                })
                if (docs.length === 0) { errores.push(`${slug}: no encontrada`); continue }
                const noticiaId = docs[0].id

                // 2. Subir la imagen a Media si no está cacheada aún
                if (!mediaCache[imgInfo.file]) {
                    const filePath = join(publicDir, imgInfo.file)
                    const fileData = readFileSync(filePath)
                    const fileSize = statSync(filePath).size

                    const media = await payload.create({
                        collection: 'media',
                        data: { alt: imgInfo.alt } as any,
                        file: {
                            data: fileData,
                            size: fileSize,
                            name: imgInfo.file,
                            mimetype: 'image/png',
                        },
                    })
                    mediaCache[imgInfo.file] = media.id
                }

                // 3. Actualizar la noticia con la imagen
                await payload.update({
                    collection: 'noticias',
                    id: noticiaId as any,
                    data: { imagen: mediaCache[imgInfo.file] } as any,
                })

                actualizados.push(slug)
            } catch (e: any) {
                errores.push(`${slug}: ${e.message}`)
            }
        }

        return NextResponse.json({
            ok: true,
            actualizados,
            errores,
            mensaje: `${actualizados.length} noticias con imagen, ${errores.length} errores`,
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
