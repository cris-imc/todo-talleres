'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { AdSlot } from './AdSlot'
import { mockNews } from '../data/mockNews'
import type { NewsItem } from '../data/mockNews'

type NewsItemEx = NewsItem & { imageUrl?: string | null }

interface NewsGridProps {
    news?: NewsItemEx[]
}

const categories = ['Todas', 'Partido', 'Fichajes', 'Selección', 'Análisis', 'Institucional', 'Plantel', 'Estadio']

const gradients = [
    'linear-gradient(135deg, #001844 0%, #003087 50%, #0044BB 100%)',
    'linear-gradient(135deg, #1a1000 0%, #332200 50%, #FF6B00 100%)',
    'linear-gradient(135deg, #001030, #003087)',
    'linear-gradient(135deg, #0a0a20, #1a1a60)',
    'linear-gradient(135deg, #0a1a0a, #004400)',
    'linear-gradient(135deg, #1a0010, #440033)',
]

export const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
    const [activeCategory, setActiveCategory] = useState('Todas')
    const [currentPage, setCurrentPage] = useState(1)

    // Noticias para la grilla: excluimos solo la hero para no duplicarla.
    // Mostramos todos los artículos del CMS sin discriminar por size.
    // Si el CMS está vacío → fallback a los mock.
    const allNews: NewsItemEx[] = useMemo(() => {
        if (!news || news.length === 0) return mockNews.filter(n => n.size !== 'hero').map(n => ({ ...n, imageUrl: null }))
        const nonHero = news.filter(n => n.size !== 'hero')
        return nonHero.length > 0 ? nonHero : mockNews.filter(n => n.size !== 'hero').map(n => ({ ...n, imageUrl: null }))
    }, [news])

    const filteredCards = activeCategory === 'Todas'
        ? allNews
        : allNews.filter(n => n.category === activeCategory)

    const ITEMS_PER_PAGE = 6
    const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE)
    const paginatedCards = filteredCards.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    const noResults = filteredCards.length === 0

    const cardBg = (card: NewsItemEx, i: number) =>
        card.imageUrl ? undefined : card.gradient ?? gradients[i % gradients.length]

    return (
        <div className="news-grid-inner">

            {/* ── Filtros ── */}
            <div style={{
                display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16,
                marginBottom: 20, borderBottom: '1px solid #1A2D45', scrollbarWidth: 'none',
            }}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} style={{
                        flexShrink: 0,
                        fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                        letterSpacing: 1, textTransform: 'uppercase',
                        padding: '6px 14px', borderRadius: 99,
                        border: `1px solid ${activeCategory === cat ? '#FF6B00' : '#1A2D45'}`,
                        background: activeCategory === cat ? '#FF6B00' : 'transparent',
                        color: activeCategory === cat ? 'white' : '#7A94B0',
                        cursor: 'pointer', transition: 'all .2s',
                    }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sin resultados */}
            {noResults && (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#2A4060' }}>
                    <span style={{ fontSize: 40 }}>📂</span>
                    <p style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Sin noticias en esta categoría
                    </p>
                </div>
            )}

            {/* ── Banner AdSense ── */}
            <AdSlot name="Home - Middle" type="banner" />

            {/* ── Grilla unificada de tarjetas ── */}
            {filteredCards.length > 0 && (
                <div className="grid gap-[14px] mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {paginatedCards.map((card, i) => (
                        <article key={card.id} style={{
                            position: 'relative', borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                            background: '#0B1929', border: '1px solid #1A2D45',
                            transition: 'transform .3s, box-shadow .3s, border-color .3s',
                        }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.55)'
                                e.currentTarget.style.borderColor = '#FF6B00'
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.borderColor = '#1A2D45'
                            }}
                        >
                            {/* Imagen — aspecto más compacto para que imagen y texto sean equilibrados */}
                            <div className="relative flex items-center justify-center overflow-hidden"
                                style={{ background: cardBg(card, i), aspectRatio: '16/8' }}
                            >
                                {/* Emoji siempre visible como fallback de fondo */}
                                <span style={{ fontSize: 48, opacity: 0.2, position: 'relative', zIndex: 0 }}>{card.emoji}</span>
                                {card.imageUrl && (
                                    <NextImage
                                        src={card.imageUrl}
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                                        style={{ objectFit: 'cover', zIndex: 1 }}
                                    />
                                )}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,25,41,0.95) 0%, transparent 55%)', zIndex: 2 }} />
                            </div>

                            <div style={{ padding: '12px 14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#FF6B00' }}>
                                        {card.category}
                                    </span>
                                    <span style={{ fontSize: 9, color: '#2A4060' }}>• {card.timeAgo}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, color: 'white' }}>
                                    {card.title}
                                </h3>
                            </div>
                            <Link href={`/noticias/${card.slug}`} style={{ position: 'absolute', inset: 0 }} aria-label={card.title} />
                        </article>
                    ))}
                </div>
            )}

            {/* ── Paginación cliente ── */}
            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 40 }}>
                    {currentPage > 1 ? (
                        <button onClick={() => { setCurrentPage(p => p - 1); document.getElementById('ultimas-noticias')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ padding: '10px 20px', background: '#1A2D45', borderRadius: 8, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', transition: 'background .2s', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: 1 }}>
                            ← Anteriores
                        </button>
                    ) : <span style={{ padding: '10px 20px', background: 'transparent', color: 'transparent', userSelect: 'none' }}>← Anteriores</span>}
                    
                    <span style={{ color: '#7A94B0', fontSize: 13, fontWeight: 700 }}>{currentPage} de {totalPages}</span>

                    {currentPage < totalPages ? (
                        <button onClick={() => { setCurrentPage(p => p + 1); document.getElementById('ultimas-noticias')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ padding: '10px 20px', background: '#1A2D45', borderRadius: 8, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', transition: 'background .2s', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: 1 }}>
                            Siguientes →
                        </button>
                    ) : <span style={{ padding: '10px 20px', background: 'transparent', color: 'transparent', userSelect: 'none' }}>Siguientes →</span>}
                </div>
            )}
        </div>
    )
}
