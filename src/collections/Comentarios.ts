import type { CollectionConfig } from 'payload'

export const Comentarios: CollectionConfig = {
    slug: 'comentarios',
    admin: {
        useAsTitle: 'nombre',
        description: 'Comentarios de los usuarios en las noticias.',
    },
    access: {
        read: () => true,
        create: () => true, // Permitir comentarios no autenticados
        update: ({ req }) => !!req.user, // Solo admins
        delete: ({ req }) => !!req.user, // Solo admins
    },
    fields: [
        {
            name: 'noticia',
            type: 'relationship',
            relationTo: 'noticias',
            required: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'nombre',
            type: 'text',
            required: true,
        },
        {
            name: 'comentario',
            type: 'textarea',
            required: true,
        },
        {
            name: 'padre_id',
            label: 'Respuesta al ID de comentario (Opcional)',
            type: 'text',
            admin: {
                description: 'Si es null, es un comentario principal.',
            },
        },
        {
            name: 'aprobado',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                position: 'sidebar',
                description: 'Desmarcar para ocultar el comentario.',
            },
        },
        {
            name: 'autor_token',
            type: 'text',
            admin: {
                position: 'sidebar',
                description: 'Token interno del dispositivo del usuario (para edición/borrado).',
            },
        },
    ],
}
