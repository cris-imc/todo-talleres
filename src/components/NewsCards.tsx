'use client'
// Componentes interactivos (hover effects) para la página de noticias
import React from 'react'
import Link from 'next/link'
import type { NewsItem } from '../data/mockNews'

type Article = NewsItem & { imageUrl?: string | null }

const categoryColor: Record<string, string> = {
    Partido: '#FF6B00', Plantel: '#3B82F6', Fichajes: '#10B981',
    Selección: '#8B5CF6', Estadio: '#F59E0B', Análisis: '#06B6D4',
    Institucional: '#64748B',
}
const gradients = [
    'linear-gradient(135deg, #001844, #003087, #0044BB)',
    'linear-gradient(135deg, #1a1000, #332200, #FF6B00)',
    'linear-gradient(135deg, #001030, #003087)',
    'linear-gradient(135deg, #0a0a20, #1a1a60)',
    'linear-gradient(135deg, #0a1a0a, #004400)',
]

// ── Noticia grande (hero de la página /noticias) ──
export const HeroCard: React.FC<{ article: Article }> = ({ article }) => (
    <Link href={`/noticias/${article.slug}`}
        style={{ display: 'block', marginBottom: 24, borderRadius: 14, overflow: 'hidden', position: 'relative', height: 'clamp(220px, 45vw, 420px)', cursor: 'pointer' }}>
        <div style={{ position: 'absolute', inset: 0, background: article.imageUrl ? undefined : (article.gradient ?? gradients[0]) }}>
            {article.imageUrl && <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,8,32,0.95) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,8,32,0.9) 0%, transparent 50%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(16px, 4vw, 36px)' }}>
            <span style={{
                display: 'inline-block', marginBottom: 12, fontFamily: 'var(--font-display)',
                fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                padding: '4px 12px', borderRadius: 4,
                background: categoryColor[article.category] ?? '#FF6B00', color: 'white', width: 'fit-content',
            }}>
                {article.category}
            </span>
            <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                textTransform: 'uppercase', lineHeight: 1.05,
                color: 'white', marginBottom: 12, maxWidth: 600,
            }}>
                {article.title}
            </h2>
            <p style={{ fontSize: 12, color: '#C8D8EC' }}>
                <span style={{ color: '#FF6B00', fontWeight: 700 }}>{article.author}</span>
                <span style={{ margin: '0 6px', color: '#1A2D45' }}>•</span>
                {article.timeAgo}
                <span style={{ margin: '0 6px', color: '#1A2D45' }}>•</span>
                {article.readTime} min
            </p>
        </div>
    </Link>
)

// ── Tarjeta de artículo en la grilla ──
export const ArticleCard: React.FC<{ article: Article; index: number }> = ({ article, index }) => {
    const [hovered, setHovered] = React.useState(false)
    const catColor = categoryColor[article.category] ?? '#FF6B00'
    const bg = article.imageUrl ? undefined : (article.gradient ?? gradients[index % gradients.length])

    return (
        <Link href={`/noticias/${article.slug}`}
            style={{
                display: 'block', borderRadius: 12, overflow: 'hidden',
                border: `1px solid ${hovered ? '#FF6B00' : '#1A2D45'}`,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.5)' : 'none',
                transition: 'border-color .25s, transform .25s, box-shadow .25s',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ height: 180, background: bg, position: 'relative', overflow: 'hidden' }}>
                {article.imageUrl && (
                    <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                )}
                {!article.imageUrl && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, opacity: 0.12 }}>
                        {article.emoji}
                    </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,25,41,0.95) 0%, transparent 60%)' }} />
                <span style={{
                    position: 'absolute', top: 10, left: 12,
                    fontFamily: 'var(--font-display)', fontSize: 8, fontWeight: 700,
                    letterSpacing: 1.5, textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 3,
                    background: catColor, color: 'white',
                }}>
                    {article.category}
                </span>
            </div>
            <div style={{ padding: '14px 16px 18px', background: '#0B1929' }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 14, textTransform: 'uppercase', lineHeight: 1.25,
                    color: 'white', marginBottom: 10,
                }}>
                    {article.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#7A94B0' }}>
                    <span>{article.author}</span>
                    <span>{article.readTime} min · {article.timeAgo}</span>
                </div>
            </div>
        </Link>
    )
}
