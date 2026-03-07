import type { CollectionConfig } from 'payload'

export const Partidos: CollectionConfig = {
    slug: 'partidos',
    labels: {
        singular: 'Partido',
        plural: 'Partidos',
    },
    admin: {
        useAsTitle: 'rival',
        defaultColumns: ['rival', 'condicion', 'fecha', 'competencia', 'estado'],
        description: 'Fixture y resultados del equipo',
    },
    access: { read: () => true },
    fields: [
        {
            name: 'rival',
            type: 'text',
            label: 'Equipo Rival',
            required: true,
        },
        {
            name: 'condicion',
            type: 'select',
            label: 'Condición',
            options: [
                { label: 'Local', value: 'local' },
                { label: 'Visitante', value: 'visitante' },
            ],
            defaultValue: 'local',
            required: true,
        },
        {
            name: 'fecha',
            type: 'date',
            label: 'Fecha y Hora',
            required: true,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
        },
        {
            name: 'competencia',
            type: 'select',
            label: 'Competencia',
            options: [
                { label: 'Liga Profesional', value: 'liga' },
                { label: 'Copa Argentina', value: 'copa' },
                { label: 'Copa Libertadores', value: 'libertadores' },
                { label: 'Copa Sudamericana', value: 'sudamericana' },
                { label: 'Amistoso', value: 'amistoso' },
            ],
            defaultValue: 'liga',
        },
        {
            name: 'estadio',
            type: 'text',
            label: 'Estadio',
            defaultValue: 'Mario A. Kempes, Córdoba',
        },
        {
            name: 'estado',
            type: 'select',
            label: 'Estado del partido',
            options: [
                { label: 'Próximo', value: 'proximo' },
                { label: 'En juego', value: 'en_juego' },
                { label: 'Finalizado', value: 'finalizado' },
            ],
            defaultValue: 'proximo',
        },
        {
            name: 'golesTalleres',
            type: 'number',
            label: 'Goles Talleres',
            admin: { condition: (data) => data.estado === 'finalizado' },
        },
        {
            name: 'golesRival',
            type: 'number',
            label: 'Goles Rival',
            admin: { condition: (data) => data.estado === 'finalizado' },
        },
        {
            name: 'escudoRival',
            type: 'upload',
            label: 'Escudo del rival',
            relationTo: 'media',
        },
        {
            name: 'codigoRival',
            type: 'text',
            label: 'Código corto del rival (ej: CARP, BOC)',
            maxLength: 5,
        },
        {
            name: 'colorRival',
            type: 'text',
            label: 'Color del rival (hex, ej: #FF0000)',
            admin: {
                description: 'Color principal del equipo rival para el badge. Ej: #FF0000 (rojo), #FFD700 (dorado)',
            },
        },
    ],
    timestamps: true,
}
