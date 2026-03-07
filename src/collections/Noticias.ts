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
    hooks: {
        afterChange: [
            async ({ doc, operation, req }) => {
                if (operation === 'create') {
                    // Solo intentar si hay API Key de Brevo
                    if (process.env.BREVO_API_KEY) {
                        try {
                            const payload = req.payload
                            const suscriptores = await payload.find({
                                collection: 'suscriptores',
                                limit: 1000, // Ajustar según volumen futuro
                            })

                            if (suscriptores.totalDocs > 0) {
                                const bccList = suscriptores.docs.map(s => ({ email: s.email }))

                                await fetch('https://api.brevo.com/v3/smtp/email', {
                                    method: 'POST',
                                    headers: {
                                        'api-key': process.env.BREVO_API_KEY,
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        sender: { name: 'Talleres Web', email: 'no-reply@tu-dominio.com' }, // Configurar en Brevo
                                        bcc: bccList,
                                        subject: `Nueva Noticia: ${doc.titulo}`,
                                        htmlContent: `
                                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                                <h1 style="color: #003087;">Club Atlético Talleres</h1>
                                                <h2 style="color: #FF6B00;">${doc.titulo}</h2>
                                                <p>${doc.resumen || ''}</p>
                                                <a href="https://tu-dominio.com/noticias/${doc.slug}" style="display: inline-block; padding: 10px 20px; background: #FF6B00; color: white; text-decoration: none; border-radius: 4px;">Leer completo</a>
                                                <br><br>
                                                <hr>
                                                <p style="font-size: 11px; color: #666;">Estás recibiendo este correo porque te suscribiste en Talleres Web.</p>
                                            </div>
                                        `
                                    })
                                })
                                console.log(`[Newsletter] Noticia enviada a ${bccList.length} suscriptores via Brevo.`)
                            }
                        } catch (err) {
                            console.error('[Newsletter] Error enviando email a Brevo:', err)
                        }
                    } else {
                        console.log(`[Newsletter] Suscriptores listos, pero BREVO_API_KEY no está configurada.`)
                    }
                }
                return doc
            }
        ]
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
