'use server'

import { getPayloadClient } from './payload'

export async function createCommentServer(data: any) {
    try {
        const payload = await getPayloadClient()
        const doc = await payload.create({
            collection: 'comentarios',
            data: {
                noticia: Number(data.noticia),
                nombre: data.nombre,
                comentario: data.comentario,
                padre_id: data.padre_id || null,
                autor_token: data.autor_token,
            }
        })
        return doc
    } catch (e: any) {
        console.error("Error creating comment:", e)
        throw new Error(e.message || "Cannot create comment")
    }
}

export async function editCommentServer(id: string, token: string, nuevoComentario: string) {
    const payload = await getPayloadClient()
    const existing = await payload.findByID({ collection: 'comentarios', id }) as any
    if (existing.autor_token !== token) {
        throw new Error("No tienes permiso para editar este comentario")
    }

    const doc = await payload.update({
        collection: 'comentarios',
        id,
        data: {
            comentario: nuevoComentario
        }
    })
    return doc
}

export async function deleteCommentServer(id: string, token: string) {
    const payload = await getPayloadClient()
    const existing = await payload.findByID({ collection: 'comentarios', id }) as any
    if (existing.autor_token !== token) {
        throw new Error("No tienes permiso para borrar este comentario")
    }

    await payload.delete({
        collection: 'comentarios',
        id
    })
    return true
}
