'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { AdSlot } from './AdSlot'
import { mediumNews as mockMedium, smallNews as mockSmall } from '../data/mockNews'
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

    // Noticias para la grilla: excluimos la hero del CMS
    // Si después de excluirla no queda nada → fallback a los mock
    const allNews: NewsItemEx[] = useMemo(() => {
        if (!news || news.length === 0) return [...mockMedium, ...mockSmall]
        const nonHero = news.filter(n => n.size !== 'hero')
        return nonHero.length > 0 ? nonHero : [...mockMedium, ...mockSmall]
    }, [news])

    const mediumCards = allNews.filter(n => n.size === 'medium')
    const smallCards = allNews.filter(n => n.size === 'small')

    const filtered = (arr: NewsItemEx[]) =>
        activeCategory === 'Todas' ? arr : arr.filter(n => n.category === activeCategory)

    const filteredMedium = filtered(mediumCards)
    const filteredSmall = filtered(smallCards)
    const noResults = filteredMedium.length === 0 && filteredSmall.length === 0

    const cardBg = (card: NewsItemEx, i: number) =>
        card.imageUrl ? undefined : card.gradient ?? gradients[i % gradients.length]

    return (
        <div style={{ padding: '24px 28px 32px' }}>

            {/* ── Filtros ── */}
            <div style={{
                display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16,
                marginBottom: 20, borderBottom: '1px solid #1A2D45', scrollbarWidth: 'none',
            }}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{
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

            {/* ── Tarjetas medianas ── */}
            {filteredMedium.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: filteredMedium.length === 1 ? '1fr' : '1fr 1fr',
                    gap: 14, marginBottom: 14,
                }}>
                    {filteredMedium.map((card, i) => (
                        <article key={card.id} style={{
                            position: 'relative', height: 180, borderRadius: 10,
                            overflow: 'hidden', cursor: 'pointer',
                            background: cardBg(card, i),
                            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                            transition: 'transform .3s, box-shadow .3s',
                        }}
                            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.6)' }}
                            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)' }}
                        >
                            {/* Imagen real si existe */}
                            {card.imageUrl && (
                                <img src={card.imageUrl} alt={card.title}
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                            )}
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, transparent 65%)' }} />
                            <div style={{ position: 'absolute', right: 16, top: 12, fontSize: 64, opacity: 0.08, userSelect: 'none' }}>{card.emoji}</div>
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 16px', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#FF6B00' }}>
                                        {card.category}
                                    </span>
                                    <span style={{ fontSize: 9, color: '#7A94B0' }}>{card.timeAgo}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.15, color: 'white' }}>
                                    {card.title}
                                </h3>
                            </div>
                            <Link href={`/noticias/${card.slug}`} style={{ position: 'absolute', inset: 0 }} aria-label={card.title} />
                        </article>
                    ))}
                </div>
            )}

            {/* ── Banner AdSense ── */}
            <AdSlot name="Home - Middle" type="banner" />

            {/* ── Tarjetas pequeñas ── */}
            {filteredSmall.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 14, marginTop: 24,
                }}>
                    {filteredSmall.map((card, i) => (
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
                            <div style={{ height: 140, background: cardBg(card, i), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {card.imageUrl
                                    ? <img src={card.imageUrl} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                                    : <span style={{ fontSize: 48, opacity: 0.2 }}>{card.emoji}</span>
                                }
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,25,41,0.9) 0%, transparent 60%)' }} />
                            </div>
                            <div style={{ padding: '12px 14px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0' }}>
                                        {card.category}
                                    </span>
                                    <span style={{ fontSize: 9, color: '#2A4060' }}>• {card.timeAgo}</span>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.25, color: 'white' }}>
                                    {card.title}
                                </h3>
                            </div>
                            <Link href={`/noticias/${card.slug}`} style={{ position: 'absolute', inset: 0 }} aria-label={card.title} />
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
