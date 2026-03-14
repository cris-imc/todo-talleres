/**
 * Funciones para obtener noticias y partidos desde Payload CMS.
 * Todas son async, solo se llaman desde Server Components.
 */

import { getPayloadClient } from './payload'
import { mockNews, tickerNews as mockTicker } from '../data/mockNews'
import type { NewsItem } from '../data/mockNews'

// Convierte URL relativa de Payload (/api/media/...) a URL absoluta
function toAbsoluteUrl(url: string | undefined | null): string | null {
    if (!url) return null
    if (url.startsWith('http')) return url
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    return `${base}${url}`
}

// ─── Tipos derivados de Payload ───────────────────────────────────────────────
export interface CMSNoticia {
    id: string | number
    titulo: string
    slug: string
    categoria: string
    tamaño: 'hero' | 'medium' | 'small'
    destacada?: boolean
    resumen?: string
    autor?: string
    tiempoLectura?: number
    imagen?: { url: string; alt?: string } | null
    createdAt: string
}

// Convierte una noticia del CMS al formato interno NewsItem (con fallbacks)
function cmsToNewsItem(n: CMSNoticia, index: number): NewsItem & { imageUrl: string | null } {
    const gradients = [
        'linear-gradient(135deg, #001844 0%, #003087 50%, #0044BB 100%)',
        'linear-gradient(135deg, #1a1000 0%, #332200 50%, #FF6B00 100%)',
        'linear-gradient(135deg, #001030, #003087)',
        'linear-gradient(135deg, #0a0a20, #1a1a60)',
        'linear-gradient(135deg, #0a1a0a, #004400)',
    ]
    const emojis: Record<string, string> = {
        Partido: '⚽', Plantel: '📋', Fichajes: '🔄', Selección: '🌍',
        Estadio: '🏟️', Análisis: '📊', Institucional: '🏛️',
    }
    const elapsed = () => {
        const ms = Date.now() - new Date(n.createdAt).getTime()
        const h = Math.floor(ms / 3_600_000)
        const d = Math.floor(ms / 86_400_000)
        if (d > 0) return `Hace ${d} ${d === 1 ? 'día' : 'días'}`
        if (h > 0) return `Hace ${h} h`
        return 'Hace unos minutos'
    }

    return {
        id: typeof n.id === 'number' ? n.id : index,
        slug: n.slug,
        title: n.titulo,
        category: n.categoria,
        size: n.tamaño ?? 'small',
        gradient: gradients[index % gradients.length],
        emoji: emojis[n.categoria] ?? '📰',
        author: n.autor ?? 'Redacción Todo Talleres',
        timeAgo: elapsed(),
        readTime: n.tiempoLectura ?? 4,
        imageUrl: toAbsoluteUrl(n.imagen?.url),
    } as NewsItem & { imageUrl: string | null }
}

// ─── Funciones públicas ───────────────────────────────────────────────────────

/**
 * Devuelve todas las noticias del CMS (por defecto límite 8 para home y modales).
 * Si la DB está vacía, devuelve los datos mock como fallback.
 */
export async function getNews(limit = 8): Promise<(NewsItem & { imageUrl: string | null })[]> {
    try {
        const payload = await getPayloadClient()
        const { docs } = await payload.find({
            collection: 'noticias',
            limit,
            sort: '-createdAt',
            depth: 1,
        })
        if (docs.length === 0) return mockNews.map((n, i) => ({ ...n, imageUrl: null }))
        return (docs as unknown as CMSNoticia[]).map(cmsToNewsItem)
    } catch (e) {
        console.error('[getNews] Fallback a mock data:', e)
        return mockNews.map((n, i) => ({ ...n, imageUrl: null }))
    }
}

/**
 * Devuelve las noticias de forma paginada para la vista principal de archivo.
 */
export async function getPaginatedNews(page = 1, limit = 12) {
    try {
        const payload = await getPayloadClient()
        const res = await payload.find({
            collection: 'noticias',
            limit,
            page,
            sort: '-createdAt',
            depth: 1,
        })
        if (res.docs.length === 0) {
            return { docs: mockNews.map((n, i) => ({ ...n, imageUrl: null })), page: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false }
        }
        return {
            docs: (res.docs as unknown as CMSNoticia[]).map(cmsToNewsItem),
            page: res.page ?? 1,
            totalPages: res.totalPages ?? 1,
            hasNextPage: res.hasNextPage,
            hasPrevPage: res.hasPrevPage
        }
    } catch (e) {
        console.error('[getPaginatedNews] Fallback a mock data:', e)
        return { docs: mockNews.map((n, i) => ({ ...n, imageUrl: null })), page: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false }
    }
}

/**
 * Devuelve la noticia destacada para el Hero.
 * Prioriza noticias con destacada=true, si no, la más reciente.
 */
export async function getFeaturedNews(): Promise<(NewsItem & { imageUrl: string | null }) | null> {
    try {
        const payload = await getPayloadClient()

        // Primero busca destacadas
        const { docs: destacadas } = await payload.find({
            collection: 'noticias',
            where: { destacada: { equals: true } },
            limit: 1,
            sort: '-createdAt',
        })
        if (destacadas.length > 0) return cmsToNewsItem(destacadas[0] as unknown as CMSNoticia, 0)

        // Si no hay destacada, la más reciente
        const { docs } = await payload.find({
            collection: 'noticias',
            limit: 1,
            sort: '-createdAt',
        })
        if (docs.length > 0) return cmsToNewsItem(docs[0] as unknown as CMSNoticia, 0)

        return null
    } catch (e) {
        console.error('[getFeaturedNews] Fallback a mock:', e)
        return null
    }
}

/**
 * Obtiene una noticia específica por su slug.
 * Retorna null si no existe.
 */
export async function getNewsBySlug(slug: string): Promise<CMSNoticia & { contenido?: unknown } | null> {
    try {
        const payload = await getPayloadClient()
        const { docs } = await payload.find({
            collection: 'noticias',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,   // incluye imagen anidada
        })
        if (docs.length === 0) return null
        return docs[0] as unknown as CMSNoticia & { contenido?: unknown }
    } catch (e) {
        console.error('[getNewsBySlug] Error:', e)
        return null
    }
}

/**
 * Obtiene noticias relacionadas (misma categoría, excluye la actual).
 */
export async function getRelatedNews(
    category: string,
    excludeSlug: string,
    limit = 3
): Promise<(NewsItem & { imageUrl: string | null })[]> {
    try {
        const payload = await getPayloadClient()
        const { docs } = await payload.find({
            collection: 'noticias',
            where: {
                and: [
                    { categoria: { equals: category } },
                    { slug: { not_equals: excludeSlug } },
                ],
            },
            limit,
            sort: '-createdAt',
            depth: 1,
        })
        return (docs as unknown as CMSNoticia[]).map(cmsToNewsItem)
    } catch {
        return []
    }
}

/**
 * Genera los paths estáticos para ISR (Next.js generateStaticParams).
 */
export async function getAllSlugs(): Promise<string[]> {
    try {
        const payload = await getPayloadClient()
        const { docs } = await payload.find({ collection: 'noticias', limit: 100, depth: 0 })
        return (docs as unknown as CMSNoticia[]).map(n => n.slug)
    } catch {
        return []
    }
}
export async function getTickerNews(): Promise<string[]> {
    try {
        const payload = await getPayloadClient()
        const { docs } = await payload.find({
            collection: 'noticias',
            limit: 8,
            sort: '-createdAt',
        })
        if (docs.length === 0) return mockTicker.map(n => n.title)
        return (docs as unknown as CMSNoticia[]).map(n => n.titulo)
    } catch {
        return mockTicker.map(n => n.title)
    }
}

// ─── Re-exports desde matchTypes (seguro para client components) ─────────────
export type { CMSPartido } from './matchTypes'
export { formatMatchDate, formatMatchTime, COMPETENCIA_LABELS } from './matchTypes'
import type { CMSPartido } from './matchTypes'

// Partido fallback hardcodeado (en caso de que el CMS esté vacío)
const FALLBACK_MATCH: CMSPartido = {
    id: 0,
    rival: 'Huracán',
    condicion: 'local',
    fecha: '2026-03-15T18:00:00.000-03:00',
    competencia: 'liga',
    estadio: 'Mario A. Kempes, Córdoba',
    estado: 'proximo',
    codigoRival: 'HUR',
}

/**
 * Devuelve el próximo partido del CMS buscando por fecha futura.
 * — Incluye la ventana de 2 horas mientras el partido puede estar en juego.
 * — No depende del campo "estado" (que puede no actualizarse en la DB).
 */
export async function getNextMatch(): Promise<CMSPartido> {
    try {
        const payload = await getPayloadClient()
        // Ventana: desde 2 horas antes de ahora para incluir partidos en juego
        const desde = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        const { docs } = await payload.find({
            collection: 'partidos',
            where: { fecha: { greater_than: desde } },
            sort: 'fecha',      // el más cercano primero
            limit: 1,
            depth: 1,           // incluye escudoRival si existe
        })
        if (docs.length === 0) return FALLBACK_MATCH
        return docs[0] as unknown as CMSPartido
    } catch (e) {
        console.error('[getNextMatch] Fallback:', e)
        return FALLBACK_MATCH
    }
}

/**
 * Devuelve todos los partidos futuros para el modal de Fixture.
 * También busca por fecha futura para no depender del campo estado.
 */
export async function getFullFixture(): Promise<CMSPartido[]> {
    try {
        const payload = await getPayloadClient()
        const desde = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        const { docs } = await payload.find({
            collection: 'partidos',
            where: { fecha: { greater_than: desde } },
            sort: 'fecha',
            limit: 20,
            depth: 1,
        })
        if (docs.length === 0) return [FALLBACK_MATCH]
        return docs as unknown as CMSPartido[]
    } catch {
        return [FALLBACK_MATCH]
    }
}
