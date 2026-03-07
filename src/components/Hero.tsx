'use client'

import React from 'react'
import Link from 'next/link'
import type { NewsItem } from '../data/mockNews'

interface HeroProps {
    featured?: (NewsItem & { imageUrl?: string | null }) | null
}

/**
 * Parsea el título para marcar en naranja las secciones entre *asteriscos*.
 * Ejemplo: "*FASSI* confirma el inicio" → "FASSI" en naranja, resto en blanco.
 * Si no hay asteriscos, resalta la primera palabra (comportamiento anterior).
 */
function renderTitle(title: string): React.ReactNode {
    // Detectar si hay tokens *...*
    const hasMark = /\*[^*]+\*/.test(title)

    if (hasMark) {
        // Dividir por los tokens *...*
        const parts = title.split(/(\*[^*]+\*)/)
        return parts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                // Texto entre asteriscos → naranja
                return (
                    <em key={i} style={{ color: '#FF6B00', fontStyle: 'normal' }}>
                        {part.slice(1, -1)}{' '}
                    </em>
                )
            }
            return <span key={i}>{part}</span>
        })
    }

    // Fallback: primera palabra en naranja
    const words = title.split(' ')
    return words.map((word, i) =>
        i === 0
            ? <em key={i} style={{ color: '#FF6B00', fontStyle: 'normal' }}>{word}{' '}</em>
            : <span key={i}>{word}{' '}</span>
    )
}

// Noticia de fallback si el CMS está vacío
const DEFAULT: NewsItem & { imageUrl: null } = {
    id: 0, slug: 'inicio', imageUrl: null,
    title: 'Bienvenidos al sitio oficial de Talleres',
    category: 'Institucional', size: 'hero',
    gradient: '', emoji: '⭐',
    author: 'Redacción TalleresWeb',
    timeAgo: 'Hoy', readTime: 1,
}

export const Hero: React.FC<HeroProps> = ({ featured }) => {
    const news = featured ?? DEFAULT

    return (
        <article style={{ position: 'relative', height: 520, overflow: 'hidden', cursor: 'pointer' }}>

            {/* ── Fondo: imagen real o gradiente ── */}
            {news.imageUrl ? (
                <img
                    src={news.imageUrl}
                    alt={news.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #000820 0%, #001a50 40%, #003087 70%, #001030 100%)',
                }} />
            )}

            {/* ── Patrón hexagonal decorativo ── */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.035,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15z' fill='none' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '28px 49px',
            }} />

            {/* ── Gradientes de oscurecimiento ── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(0,8,32,0.97) 0%, rgba(0,8,32,0.75) 55%, rgba(0,48,135,0.1) 100%)',
            }} />
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,8,32,0.98) 0%, transparent 55%)',
            }} />

            {/* ── SVG decorativo: silueta de estadio ── */}
            <svg style={{ position: 'absolute', right: 0, bottom: 0, height: '100%', width: 'auto', opacity: 0.07 }}
                viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="200" cy="260" rx="180" ry="90" stroke="white" strokeWidth="6" />
                <ellipse cx="200" cy="260" rx="130" ry="60" stroke="white" strokeWidth="3" />
                <line x1="70" y1="260" x2="20" y2="60" stroke="white" strokeWidth="4" />
                <line x1="330" y1="260" x2="380" y2="60" stroke="white" strokeWidth="4" />
                <line x1="20" y1="60" x2="380" y2="60" stroke="white" strokeWidth="4" />
                <line x1="120" y1="200" x2="80" y2="60" stroke="white" strokeWidth="2" />
                <line x1="280" y1="200" x2="320" y2="60" stroke="white" strokeWidth="2" />
                <line x1="160" y1="200" x2="140" y2="60" stroke="white" strokeWidth="1.5" />
                <line x1="240" y1="200" x2="260" y2="60" stroke="white" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="200" y2="60" stroke="white" strokeWidth="1.5" />
            </svg>

            {/* ── Watermark CAT ── */}
            <div style={{
                position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 200,
                letterSpacing: -10, color: 'rgba(255,107,0,0.04)',
                userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
            }}>
                CAT
            </div>

            {/* ── Contenido ── */}
            <div className="max-md:px-5 max-md:pb-8" style={{
                position: 'relative', zIndex: 2, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                padding: '0 36px 40px', maxWidth: 700,
            }}>
                {/* Badges */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <span style={{
                        fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
                        letterSpacing: 1.5, textTransform: 'uppercase',
                        padding: '4px 12px', borderRadius: 4,
                        background: '#FF6B00', color: 'white',
                    }}>
                        ⭐ Destacado
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
                        letterSpacing: 1.5, textTransform: 'uppercase',
                        padding: '4px 12px', borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.2)', color: '#C8D8EC',
                    }}>
                        {news.category}
                    </span>
                </div>

                {/* ── Título — naranja con *asteriscos* o primera palabra por defecto ── */}
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                    fontWeight: 900, lineHeight: 0.95,
                    textTransform: 'uppercase', letterSpacing: 0.5,
                    marginBottom: 18, color: 'white',
                    textShadow: '0 2px 20px rgba(0,0,0,0.7)',
                }}>
                    {renderTitle(news.title)}
                </h2>

                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#C8D8EC', fontSize: 12, marginBottom: 24 }}>
                    <span style={{ color: '#FF6B00', fontWeight: 700 }}>{news.author}</span>
                    <span style={{ color: '#1A2D45', margin: '0 4px' }}>•</span>
                    <span>{news.timeAgo}</span>
                    <span style={{ color: '#1A2D45', margin: '0 4px' }}>•</span>
                    <span>{news.readTime} min de lectura</span>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/noticias/${news.slug}`} className="justify-center" style={{
                        display: 'inline-flex', alignItems: 'center',
                        background: '#FF6B00', color: 'white',
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                        letterSpacing: 1.2, textTransform: 'uppercase',
                        padding: '12px 24px', borderRadius: 6,
                        transition: 'background .2s, transform .2s',
                        boxShadow: '0 4px 20px rgba(255,107,0,0.4)',
                    }}
                        onMouseOver={e => { e.currentTarget.style.background = '#CC5200'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseOut={e => { e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        Leer Nota Completa →
                    </Link>
                    <Link href="/noticias" className="justify-center" style={{
                        display: 'inline-flex', alignItems: 'center',
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12,
                        letterSpacing: 1.2, textTransform: 'uppercase',
                        padding: '12px 24px', borderRadius: 6,
                        transition: 'background .2s, border-color .2s',
                    }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.15)'; e.currentTarget.style.borderColor = '#FF6B00' }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                    >
                        Ver más noticias
                    </Link>
                </div>
            </div>
        </article>
    )
}
