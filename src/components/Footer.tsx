'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const sections = [
    { title: 'Secciones', color: '#FF6B00', links: [{ label: 'Inicio', href: '/' }, { label: 'Noticias', href: '/noticias' }] },
    { title: 'Institucional', color: '#FF6B00', links: [{ label: 'Historia', href: '/institucional/historia' }, { label: 'Autoridades', href: '/institucional/autoridades' }, { label: 'Estatuto', href: '/institucional/estatuto' }] },
    { title: 'Contacto', color: '#FF6B00', links: [{ label: 'Sede Social', href: '/institucional/sede-social' }, { label: 'Centro de Alto Rendimiento', href: '/institucional/car' }, { label: 'Prensa', href: '/institucional/prensa' }, { label: 'Contacto', href: '/institucional/contacto' }] },
]

export const Footer: React.FC = () => {
    const [subEmail, setSubEmail] = useState('')
    const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [subMsg, setSubMsg] = useState('')

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!subEmail || !subEmail.includes('@')) return
        setSubStatus('loading')
        try {
            const res = await fetch('/api/suscribir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: subEmail })
            })
            const data = await res.json()
            if (res.ok) {
                setSubStatus('success')
                setSubMsg(data.message || '¡Gracias por suscribirte!')
                setSubEmail('')
            } else {
                setSubStatus('error')
                setSubMsg(data.error || 'Ocurrió un error')
            }
        } catch {
            setSubStatus('error')
            setSubMsg('Error de red')
        }
    }

    return (
        <footer style={{
            background: '#030810',
            borderTop: '3px solid #FF6B00',
            paddingTop: 48,
        }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', paddingLeft: 'clamp(16px, 4vw, 36px)', paddingRight: 'clamp(16px, 4vw, 36px)' }}>
                <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[200px_1fr_1fr_1fr_260px] gap-10 pb-10">
                    {/* Brand */}
                    <div>
                        <div style={{ width: 48, height: 54, filter: 'drop-shadow(0 0 10px rgba(0,48,135,0.8))' }}>
                            <Image src="/images/escudo.png" alt="Club Atlético Talleres" width={48} height={54} />
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, marginTop: 14, marginBottom: 2, color: 'white' }}>
                            Todo Talleres
                        </h3>
                        <span style={{ fontSize: 10, color: '#FF6B00', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 10 }}>
                            Desde 1913
                        </span>
                        <p style={{ fontSize: 12, color: '#7A94B0', lineHeight: 1.7, marginBottom: 18 }}>
                            El sitio web de los hincha albiazules. Toda la actualidad del club desde 1913.
                        </p>
                        {/* Redes sociales */}
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {[{sn: 'X', href: '#'}, {sn: 'In', href: '#'}, {sn: 'Fb', href: '#'}, {sn: 'Yt', href: '#'}].map(({sn, href}) => (
                                <Link key={sn} href={href} style={{
                                    width: 34, height: 34, borderRadius: 8,
                                    background: '#1A2D45',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 12, fontWeight: 700, color: 'white',
                                    transition: 'background .2s, transform .2s',
                                }}
                                    onMouseOver={e => { e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                                    onMouseOut={e => { e.currentTarget.style.background = '#1A2D45'; e.currentTarget.style.transform = 'translateY(0)' }}
                                >
                                    {sn}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Secciones */}
                    {sections.map(section => (
                        <div key={section.title}>
                            <h4 style={{
                                fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800,
                                letterSpacing: 2, textTransform: 'uppercase',
                                color: '#FF6B00', marginBottom: 14,
                                paddingBottom: 8, borderBottom: '1px solid #1A2D45',
                            }}>
                                {section.title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                {section.links.map(link => (
                                    <li key={link.label}>
                                        <Link href={link.href} style={{ fontSize: 12, color: '#7A94B0', transition: 'color .2s, padding-left .2s', display: 'block' }}
                                            onMouseOver={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.paddingLeft = '4px' }}
                                            onMouseOut={e => { e.currentTarget.style.color = '#7A94B0'; e.currentTarget.style.paddingLeft = '0' }}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div>
                        <h4 style={{
                            fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 800,
                            letterSpacing: 2, textTransform: 'uppercase',
                            color: '#FF6B00', marginBottom: 14,
                            paddingBottom: 8, borderBottom: '1px solid #1A2D45',
                        }}>
                            Newsletter Albiazul
                        </h4>
                        <p style={{ fontSize: 12, color: '#7A94B0', marginBottom: 14, lineHeight: 1.6 }}>
                            Recibí las últimas novedades del club en tu email.
                        </p>
                        <form id="newsletter" onSubmit={handleSubscribe} style={{ display: 'flex', gap: 0 }}>
                            <input
                                type="email"
                                value={subEmail}
                                onChange={e => setSubEmail(e.target.value)}
                                disabled={subStatus === 'loading' || subStatus === 'success'}
                                placeholder="Tu dirección de email"
                                style={{
                                    flex: 1, background: '#0B1929', border: '1px solid #1A2D45',
                                    borderRight: 'none', borderRadius: '6px 0 0 6px',
                                    padding: '9px 12px', color: 'white', fontSize: 12,
                                    outline: 'none', fontFamily: 'var(--font-body)',
                                    opacity: subStatus === 'loading' ? 0.7 : 1,
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = '#FF6B00'}
                                onBlur={e => e.currentTarget.style.borderColor = '#1A2D45'}
                            />
                            <button type="submit" disabled={subStatus === 'loading' || subStatus === 'success'} style={{
                                background: subStatus === 'success' ? '#22c55e' : '#FF6B00', color: 'white', border: 'none',
                                borderRadius: '0 6px 6px 0', padding: '9px 16px',
                                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11,
                                letterSpacing: 1, textTransform: 'uppercase', cursor: subStatus === 'success' ? 'default' : 'pointer',
                                transition: 'background .2s',
                                opacity: subStatus === 'loading' ? 0.7 : 1,
                            }}
                                onMouseOver={e => { if (subStatus !== 'success') e.currentTarget.style.background = '#CC5200' }}
                                onMouseOut={e => { if (subStatus !== 'success') e.currentTarget.style.background = '#FF6B00' }}
                            >
                                {subStatus === 'loading' ? '⏳' : subStatus === 'success' ? '✔' : 'Suscribir'}
                            </button>
                        </form>
                        {subStatus !== 'idle' && (
                            <p style={{ marginTop: 8, fontSize: 11, color: subStatus === 'error' ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{subMsg}</p>
                        )}
                    </div>
                </div>

                {/* Separador explícito — siempre se ve al final del grid, nunca dentro de una columna */}
                <div style={{ height: 1, background: '#1A2D45', marginTop: 16 }} />
                <div style={{
                    padding: '24px 0',
                    display: 'flex', flexWrap: 'wrap',
                    flexDirection: 'column',
                    justifyContent: 'space-between', alignItems: 'flex-start',
                    gap: 12, fontSize: 11, color: '#7A94B0',
                }}
                    className="sm:flex-row sm:items-center"
                >
                    <p>© {new Date().getFullYear()} Todo Talleres — Sitio no oficial. Todos los derechos reservados.</p>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {['Política de Privacidad', 'Aviso Legal', 'Cookies'].map(l => (
                            <Link key={l} href="#" style={{ color: '#7A94B0', transition: 'color .2s' }}
                                onMouseOver={e => e.currentTarget.style.color = 'white'}
                                onMouseOut={e => e.currentTarget.style.color = '#7A94B0'}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


        </footer>
    )
}
