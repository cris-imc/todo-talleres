'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { label: 'Historia', href: '/institucional/historia', icon: '📖' },
    { label: 'Autoridades', href: '/institucional/autoridades', icon: '👥' },
    { label: 'Estatuto', href: '/institucional/estatuto', icon: '📋' },
    { label: 'Sede Social', href: '/institucional/sede-social', icon: '🏛️' },
    { label: 'Centro de Alto Rendimiento', href: '/institucional/car', icon: '🏟️' },
    { label: 'Prensa', href: '/institucional/prensa', icon: '📰' },
    { label: 'Contacto', href: '/institucional/contacto', icon: '📬' },
]

interface InstitucionalLayoutProps {
    children: React.ReactNode
    title: string
    subtitle?: string
    breadcrumb?: string
}

export const InstitucionalLayout: React.FC<InstitucionalLayoutProps> = ({
    children,
    title,
    subtitle,
    breadcrumb,
}) => {
    const pathname = usePathname()

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px 60px' }} className="sm:p-[40px_24px_80px]">

            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 12, color: '#7A94B0' }}>
                <Link href="/" style={{ color: '#7A94B0', transition: 'color .2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = '#FF6B00')}
                    onMouseOut={e => (e.currentTarget.style.color = '#7A94B0')}>
                    Inicio
                </Link>
                <span style={{ color: '#1A2D45' }}>›</span>
                <Link href="/institucional/historia" style={{ color: '#7A94B0', transition: 'color .2s' }}
                    onMouseOver={e => (e.currentTarget.style.color = '#FF6B00')}
                    onMouseOut={e => (e.currentTarget.style.color = '#7A94B0')}>
                    Institucional
                </Link>
                {breadcrumb && (
                    <>
                        <span style={{ color: '#1A2D45' }}>›</span>
                        <span style={{ color: '#FF6B00', fontWeight: 600 }}>{breadcrumb}</span>
                    </>
                )}
            </nav>

            <div className="inst-layout" style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>

                {/* Sidebar de navegación */}
                <aside className="inst-sidebar" style={{
                    width: 240, flexShrink: 0,
                    position: 'sticky', top: 150,
                    alignSelf: 'flex-start',
                }}>
                    {/* Logo + título sección */}
                    <div style={{
                        background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                        border: '1px solid #1A2D45',
                        borderTop: '3px solid #FF6B00',
                        borderRadius: 12,
                        padding: '20px 16px',
                        marginBottom: 16,
                        textAlign: 'center',
                    }}>
                        <div style={{ width: 56, height: 63, margin: '0 auto 12px', filter: 'drop-shadow(0 0 12px rgba(0,48,135,0.6))' }}>
                            <Image src="/images/escudo.png" alt="Talleres" width={56} height={63} />
                        </div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: '#FF6B00' }}>
                            Institucional
                        </p>
                        <p style={{ fontSize: 10, color: '#7A94B0', marginTop: 4 }}>Club Atlético Talleres</p>
                    </div>

                    {/* Nav links */}
                    <nav style={{
                        background: '#080F1D',
                        border: '1px solid #1A2D45',
                        borderRadius: 12,
                        overflow: 'hidden',
                    }}>
                        {NAV_ITEMS.map((item, i) => {
                            const active = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '11px 16px',
                                        fontSize: 13, fontWeight: active ? 700 : 400,
                                        color: active ? '#fff' : '#C8D8EC',
                                        background: active ? 'rgba(255,107,0,0.08)' : 'transparent',
                                        borderLeft: active ? '3px solid #FF6B00' : '3px solid transparent',
                                        borderBottom: i < NAV_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                        transition: 'all .2s',
                                    }}
                                    onMouseOver={e => {
                                        if (!active) {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                            e.currentTarget.style.color = '#fff'
                                        }
                                    }}
                                    onMouseOut={e => {
                                        if (!active) {
                                            e.currentTarget.style.background = 'transparent'
                                            e.currentTarget.style.color = '#C8D8EC'
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                                    <span style={{ fontFamily: 'var(--font-display)', letterSpacing: 0.5, textTransform: 'uppercase', fontSize: 11 }}>{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </aside>

                {/* Contenido principal */}
                <main style={{ flex: 1, minWidth: 0 }}>
                    {/* Page header */}
                    <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #1A2D45' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <div style={{ width: 4, height: 28, background: '#FF6B00', borderRadius: 2, flexShrink: 0 }} />
                            <h1 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 32, fontWeight: 900, letterSpacing: 1,
                                textTransform: 'uppercase', color: 'white', lineHeight: 1,
                            }}>
                                {title}
                            </h1>
                        </div>
                        {subtitle && (
                            <p style={{ fontSize: 15, color: '#7A94B0', marginLeft: 16, lineHeight: 1.6 }}>{subtitle}</p>
                        )}
                    </div>

                    {children}
                </main>
            </div>

            {/* Responsive */}
            <style>{`
        @media (max-width: 768px) {
          .inst-layout { flex-direction: column !important; }
          .inst-sidebar { position: relative !important; top: 0 !important; width: 100% !important; }
        }
      `}</style>
        </div>
    )
}
