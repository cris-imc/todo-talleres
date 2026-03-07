import type { CollectionConfig } from 'payload'

export const Suscriptores: CollectionConfig = {
    slug: 'suscriptores',
    labels: {
        singular: 'Suscriptor',
        plural: 'Suscriptores',
    },
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'createdAt'],
        description: 'Emails de hinchas suscritos al Newsletter para recibir nuevas noticias.',
    },
    access: {
        read: () => true, // Opcional, dependiendo si querés hacerlo publico o solo admin
        create: () => true, // Necesario para que el front end pueda suscribir (aunque mejor usar Local API)
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            label: 'Correo Electrónico',
            required: true,
            unique: true,
        },
        {
            name: 'origen',
            type: 'text',
            label: 'Origen de la suscripción',
            defaultValue: 'web',
            admin: {
                readOnly: true,
            }
        }
    ],
    timestamps: true,
}
