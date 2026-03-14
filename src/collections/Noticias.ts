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
                if (operation !== 'create') return doc

                const apiKey = process.env.BREVO_API_KEY
                const senderEmail = process.env.BREVO_SENDER_EMAIL
                const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

                console.log('[Newsletter] Hook disparado — nueva noticia:', doc.titulo)
                console.log('[Newsletter] BREVO_API_KEY configurada:', !!apiKey)
                console.log('[Newsletter] BREVO_SENDER_EMAIL configurada:', !!senderEmail, '—', senderEmail)

                if (!apiKey) {
                    console.warn('[Newsletter] ⚠ BREVO_API_KEY no está configurada en .env — newsletter omitido.')
                    return doc
                }
                if (!senderEmail) {
                    console.warn('[Newsletter] ⚠ BREVO_SENDER_EMAIL no está configurada en .env — newsletter omitido.')
                    return doc
                }

                try {
                    const payload = req.payload
                    const suscriptores = await payload.find({
                        collection: 'suscriptores',
                        limit: 1000,
                    })

                    console.log(`[Newsletter] Suscriptores encontrados: ${suscriptores.totalDocs}`)

                    if (suscriptores.totalDocs === 0) {
                        console.log('[Newsletter] No hay suscriptores, newsletter omitido.')
                        return doc
                    }

                    // Brevo: to requiere al menos 1 destinatario;
                    // enviamos a todos via to[] (hasta 50 por llamada en plan gratuito)
                    const toList = suscriptores.docs.map(s => ({ email: s.email as string }))

                    const emailBody = {
                        sender: { name: 'Todo Talleres', email: senderEmail },
                        to: toList,
                        subject: `📰 Nueva nota: ${doc.titulo}`,
                        htmlContent: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #06101E; color: #fff; padding: 32px; border-radius: 8px;">
                                <div style="text-align: center; margin-bottom: 24px;">
                                    <h1 style="color: #FF6B00; font-size: 28px; margin: 0;">⬢ TALLERES</h1>
                                    <p style="color: #7A94B0; font-size: 13px; margin: 4px 0 0;">Club Atlético Talleres · Desde 1913</p>
                                </div>
                                <div style="background: #0B1929; padding: 24px; border-radius: 6px; border-left: 4px solid #FF6B00;">
                                    <p style="color: #FF6B00; font-size: 12px; font-weight: bold; text-transform: uppercase; margin: 0 0 8px;">Nueva Noticia</p>
                                    <h2 style="color: #fff; font-size: 22px; margin: 0 0 12px; line-height: 1.3;">${doc.titulo}</h2>
                                    ${doc.resumen ? `<p style="color: #C8D8EC; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">${doc.resumen}</p>` : ''}
                                    <a href="${siteUrl}/noticias/${doc.slug}"
                                       style="display: inline-block; padding: 12px 24px; background: #FF6B00; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">
                                        Leer nota completa →
                                    </a>
                                </div>
                                <p style="color: #1A2D45; font-size: 11px; text-align: center; margin-top: 24px;">
                                    Estás recibiendo este correo porque te suscribiste en Todo Talleres.
                                </p>
                            </div>
                        `,
                    }

                    console.log('[Newsletter] Enviando a Brevo...')
                    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
                        method: 'POST',
                        headers: {
                            'api-key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(emailBody),
                    })

                    const responseText = await res.text()
                    if (!res.ok) {
                        console.error(`[Newsletter] ❌ Error de Brevo (${res.status}):`, responseText)
                    } else {
                        console.log(`[Newsletter] ✅ Newsletter enviado a ${toList.length} suscriptores. Respuesta:`, responseText)
                    }
                } catch (err) {
                    console.error('[Newsletter] ❌ Excepción al enviar newsletter:', err)
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
            defaultValue: 'Redacción Todo Talleres',
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
