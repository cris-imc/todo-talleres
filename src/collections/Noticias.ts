import type { CollectionConfig } from 'payload'

export const Noticias: CollectionConfig = {
    slug: 'noticias',
    labels: {
        singular: 'Noticia',
        plural: 'Noticias',
    },
    admin: {
        useAsTitle: 'titulo',
        defaultColumns: ['titulo', 'categoria', 'autor', 'destacada', 'updatedAt'],
        description: 'Artículos y noticias del Club Atlético Talleres de Córdoba',
    },
    access: {
        // Lectura pública, escritura solo admin
        read: () => true,
    },
    fields: [
        {
            name: 'titulo',
            type: 'text',
            label: 'Título',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug (URL)',
            required: true,
            admin: {
                description: 'URL amigable: ej. "talleres-golea-a-boca". Se genera automáticamente.',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.titulo) {
                            return data.titulo
                                .toLowerCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .replace(/[^a-z0-9\s-]/g, '')
                                .trim()
                                .replace(/\s+/g, '-')
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'categoria',
            type: 'select',
            label: 'Categoría',
            required: true,
            options: [
                { label: 'Partido', value: 'Partido' },
                { label: 'Plantel', value: 'Plantel' },
                { label: 'Fichajes', value: 'Fichajes' },
                { label: 'Selección', value: 'Selección' },
                { label: 'Estadio', value: 'Estadio' },
                { label: 'Análisis', value: 'Análisis' },
                { label: 'Institucional', value: 'Institucional' },
            ],
            defaultValue: 'Partido',
        },
        {
            name: 'destacada',
            type: 'checkbox',
            label: 'Nota Destacada (aparece en el Hero)',
            defaultValue: false,
        },
        {
            name: 'tamaño',
            type: 'select',
            label: 'Tamaño en la grilla',
            options: [
                { label: 'Hero (principal)', value: 'hero' },
                { label: 'Mediana (x2 cols)', value: 'medium' },
                { label: 'Pequeña', value: 'small' },
            ],
            defaultValue: 'small',
        },
        {
            name: 'resumen',
            type: 'textarea',
            label: 'Resumen / Bajada',
            admin: {
                description: 'Texto corto que aparece en las tarjetas de noticias',
            },
        },
        {
            name: 'contenido',
            type: 'richText',
            label: 'Contenido completo',
        },
        {
            name: 'imagen',
            type: 'upload',
            label: 'Imagen de portada',
            relationTo: 'media',
        },
        {
            name: 'autor',
            type: 'text',
            label: 'Autor',
            defaultValue: 'Redacción TalleresWeb',
        },
        {
            name: 'tiempoLectura',
            type: 'number',
            label: 'Tiempo de lectura (minutos)',
            defaultValue: 4,
        },
        {
            name: 'etiquetas',
            type: 'array',
            label: 'Etiquetas',
            fields: [
                { name: 'etiqueta', type: 'text', label: 'Etiqueta' },
            ],
        },
    ],
    timestamps: true,
}
