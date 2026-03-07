// Datos mock centralizados de noticias
// Cuando se conecte Payload CMS, este archivo se reemplaza por queries al API

export interface NewsItem {
    id: number
    slug: string
    title: string
    category: string
    size: 'hero' | 'medium' | 'small'
    gradient: string
    emoji: string
    author: string
    timeAgo: string
    readTime: number
    imageUrl?: string | null
}

export const mockNews: NewsItem[] = [
    {
        id: 1,
        slug: 'talleres-golea-boca',
        title: 'Talleres golea a Boca y sueña con el liderato',
        category: 'Partido',
        size: 'hero',
        gradient: 'linear-gradient(135deg, #000820 0%, #001a50 40%, #003087 70%, #001030 100%)',
        emoji: '⚽',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 2 horas',
        readTime: 4,
    },
    {
        id: 2,
        slug: 'incorporacion-mediocampo',
        title: 'Nueva incorporación para el mediocampo albiazul',
        category: 'Plantel',
        size: 'medium',
        gradient: 'linear-gradient(135deg, #001844 0%, #003087 50%, #0044BB 100%)',
        emoji: '📋',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 5 horas',
        readTime: 3,
    },
    {
        id: 3,
        slug: 'lleno-kempes',
        title: 'El Kempes espera un lleno total este domingo',
        category: 'Estadio',
        size: 'medium',
        gradient: 'linear-gradient(135deg, #1a1000 0%, #332200 50%, #FF6B00 100%)',
        emoji: '🏟️',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 6 horas',
        readTime: 2,
    },
    {
        id: 4,
        slug: 'mercado-pases',
        title: 'Movimientos en el mercado de pases local',
        category: 'Fichajes',
        size: 'small',
        gradient: 'linear-gradient(135deg, #001030, #003087)',
        emoji: '🔄',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 8 horas',
        readTime: 3,
    },
    {
        id: 5,
        slug: 'convocados-fifa',
        title: 'Tres jugadores de Talleres convocados para la fecha FIFA',
        category: 'Selección',
        size: 'small',
        gradient: 'linear-gradient(135deg, #0a0a20, #1a1a60)',
        emoji: '🌍',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 10 horas',
        readTime: 4,
    },
    {
        id: 6,
        slug: 'sistema-tactico',
        title: 'El sistema táctico que usa el técnico esta temporada',
        category: 'Análisis',
        size: 'small',
        gradient: 'linear-gradient(135deg, #0a1a0a, #004400)',
        emoji: '📊',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 12 horas',
        readTime: 5,
    },
    {
        id: 7,
        slug: 'obras-car',
        title: 'Avanzan las obras en el Centro de Alto Rendimiento',
        category: 'Institucional',
        size: 'small',
        gradient: 'linear-gradient(135deg, #0a0a00, #2a2a00)',
        emoji: '🏗️',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 1 día',
        readTime: 3,
    },
    {
        id: 8,
        slug: 'entradas-copa',
        title: 'Venta de entradas para el partido de Copa Argentina',
        category: 'Institucional',
        size: 'small',
        gradient: 'linear-gradient(135deg, #1a0010, #440033)',
        emoji: '🎟️',
        author: 'Redacción TalleresWeb',
        timeAgo: 'Hace 1 día',
        readTime: 2,
    },
]

// Las que van en el ticker son todas las noticias (sin la hero)
export const tickerNews = mockNews.filter(n => n.size !== 'hero')

// Las que van en la grilla medianas
export const mediumNews = mockNews.filter(n => n.size === 'medium')

// Las que van en la grilla pequeñas
export const smallNews = mockNews.filter(n => n.size === 'small')
