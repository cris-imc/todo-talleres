'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { tickerNews as mockTicker } from '../data/mockNews'
import type { NewsItem } from '../data/mockNews'

interface HeaderProps {
    tickerNews?: (NewsItem & { imageUrl?: string | null })[]
}

export const Header: React.FC<HeaderProps> = ({ tickerNews }) => {
    // Intentamos usar las noticias del CMS sin la hero
    // Si después del filtro no queda nada, usamos TODAS las del CMS
    // Si el CMS no tiene nada, usamos el mock
    const cmsItems = tickerNews && tickerNews.length > 0 ? tickerNews : null
    const filtered = cmsItems ? cmsItems.filter(n => n.size !== 'hero') : null
    const items = filtered && filtered.length > 0 ? filtered
        : cmsItems && cmsItems.length > 0 ? cmsItems
            : mockTicker

    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    // Fecha dinámica
    const formatDate = () => {
        const now = new Date()
        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        return `${dias[now.getDay()]} ${now.getDate()} ${meses[now.getMonth()]}`
    }
    const formatTime = () => {
        const now = new Date()
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    }
    const [currentDate, setCurrentDate] = useState('')
    const [currentTime, setCurrentTime] = useState('')
    useEffect(() => {
        setCurrentDate(formatDate())
        setCurrentTime(formatTime())
        const id = setInterval(() => {
            setCurrentDate(formatDate())
            setCurrentTime(formatTime())
        }, 1000)
        return () => clearInterval(id)
    }, [])

    const handleNoticiasClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault()
            const el = document.getElementById('ultimas-noticias')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setMobileOpen(false)
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>

                {/* ── Topbar ── */}
                <div style={{
                    background: '#03080F',
                    borderBottom: '1px solid #0D2040',
                    height: 34,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    fontSize: 11,
                    color: '#7A94B0',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>📅 {currentDate}</span>
                        <span style={{ color: '#1A2D45' }}>|</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, color: '#FF6B00', fontSize: 12 }}>🕐 {currentTime}</span>
                        <span style={{ color: '#1A2D45' }}>|</span>
                        <span>Córdoba, Argentina</span>
                    </span>
                    <div style={{ display: 'flex', gap: 18 }}>
                        {['X/Twitter', 'Instagram', 'YouTube', 'Facebook'].map(sn => (
                            <Link key={sn} href="#" style={{ color: '#7A94B0', fontSize: 11, transition: 'color .2s' }}
                                onMouseOver={e => (e.currentTarget.style.color = '#FF6B00')}
                                onMouseOut={e => (e.currentTarget.style.color = '#7A94B0')}>
                                {sn}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Navbar ── */}
                <nav style={{
                    background: 'rgba(0,16,48,0.97)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '2px solid #003087',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    height: 68,
                    boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.8)' : '0 4px 24px rgba(0,0,0,0.6)',
                    position: 'relative',
                }}>
                    {/* Borde naranja izquierdo */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: '#FF6B00' }} />

                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 14, marginLeft: 8, cursor: 'pointer' }}>
                        <div style={{ width: 48, height: 54, filter: 'drop-shadow(0 0 10px rgba(0,48,135,0.8))', animation: 'shieldFloat 5s ease-in-out infinite', flexShrink: 0 }}>
                            <Image src="/images/escudo.png" alt="Escudo Club Atlético Talleres" width={48} height={54} priority />
                        </div>
                        <div>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1, color: '#fff', display: 'block' }}>
                                Talleres
                            </span>
                            <span style={{ fontSize: 10, color: '#FF6B00', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 500, display: 'block', marginTop: 2 }}>
                                Desde 1913
                            </span>
                        </div>
                    </Link>

                    {/* Nav links — desktop */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {([
                            { label: 'Inicio', href: '/' },
                            { label: 'Noticias', href: pathname === '/' ? '#ultimas-noticias' : '/noticias' },
                        ] as const).map(({ label, href }) => {
                            const isActive = pathname === '/' ? label === 'Inicio' : pathname.startsWith('/noticias') && label === 'Noticias'
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    onClick={label === 'Noticias' ? handleNoticiasClick : undefined}
                                    style={{
                                        display: 'flex', alignItems: 'center',
                                        height: 68, padding: '0 16px',
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 13, fontWeight: 700,
                                        letterSpacing: 1.2, textTransform: 'uppercase',
                                        color: isActive ? '#fff' : '#C8D8EC',
                                        borderBottom: isActive ? '3px solid #FF6B00' : '3px solid transparent',
                                        background: isActive ? 'rgba(255,107,0,0.06)' : 'transparent',
                                        transition: 'color .2s, border-color .2s, background .2s',
                                    }}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Botón Suscribirse */}
                    <button style={{
                        background: '#FF6B00',
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 12,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        padding: '9px 20px',
                        borderRadius: 6,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background .2s, transform .2s',
                    }}
                        onMouseOver={e => { e.currentTarget.style.background = '#CC5200'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                        onMouseOut={e => { e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        Suscribirse
                    </button>

                    {/* Hamburger mobile */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ display: 'none', color: 'white', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
                        className="mobile-menu-btn"
                        aria-label="Abrir menú"
                    >
                        <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </nav>

                {/* ── Ticker ── */}
                <div style={{ height: 32, background: '#FF6B00', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{
                        background: '#CC5200',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 11,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        padding: '0 16px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        zIndex: 2,
                        color: 'white',
                    }}>
                        ⚡ ÚLTIMAS
                    </div>
                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap', animation: 'tickerScroll 40s linear infinite', paddingRight: 60, color: 'white' }}>
                            {[...items, ...items].map((item, idx) => (
                                <span key={idx} style={{ fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }} aria-hidden={idx >= items.length}>
                                    <span style={{ opacity: 0.5 }}>{item.emoji}</span>
                                    <span style={{ opacity: 0.55, fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                                        {item.category}
                                    </span>
                                    <Link href={`/noticias/${item.slug}`} style={{ color: 'white' }}>{item.title}</Link>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Espaciador: topbar(34) + navbar(68) + ticker(32) = 134px */}
            <div style={{ height: 134 }} aria-hidden="true" />

            <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
        </>
    )
}
