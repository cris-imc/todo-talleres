'use client'
import React, { useState } from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export default function ContactoPage() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [motivo, setMotivo] = useState('Publicidad')
    const [mensaje, setMensaje] = useState('')
    
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const res = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, telefono, motivo, mensaje })
            })
            
            if (res.ok) {
                setStatus('success')
                setNombre(''); setEmail(''); setTelefono(''); setMotivo('Publicidad'); setMensaje('');
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Contacto"
                subtitle="Dejanos tu consulta, duda o propuesta para que Todo Talleres siga creciendo."
                breadcrumb="Contacto"
            >
                {/* 1. Formulario de Contacto al tope */}
                <div style={{
                    background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    borderTop: '3px solid #FF6B00',
                    borderRadius: 14,
                    padding: '32px',
                    marginBottom: 40,
                }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 8 }}>Escribinos un mensaje</h2>
                    <p style={{ fontSize: 14, color: '#C8D8EC', marginBottom: 24 }}>Completá el formulario con tus inquietudes referidas al sitio web y nos contactaremos a la brevedad.</p>

                    {status === 'success' ? (
                        <div style={{ padding: 20, background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: 8, color: '#22c55e', textAlign: 'center', fontWeight: 'bold' }}>
                            ¡Mensaje enviado con éxito! Te responderemos pronto.
                            <br/><button onClick={() => setStatus('idle')} style={{ background: 'transparent', border: 'none', color: 'white', textDecoration: 'underline', marginTop: 10, cursor: 'pointer' }}>Enviar otro</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Nombre Completo</label>
                                    <input required type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Juan Pérez" style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Correo Electrónico</label>
                                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@ejemplo.com" style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Teléfono (Opcional)</label>
                                    <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+54 9 351..." style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Motivo</label>
                                    <select required value={motivo} onChange={e => setMotivo(e.target.value)} style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none', appearance: 'none' }}>
                                        <option value="Publicidad">Publicidad / Pauta</option>
                                        <option value="Sugerencias">Sugerencias para la web</option>
                                        <option value="Colaboración">Colaboración / Redacción</option>
                                        <option value="Otro">Otro Motivo</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Mensaje</label>
                                <textarea required value={mensaje} onChange={e => setMensaje(e.target.value)} rows={5} placeholder="Escribí tu consulta..." style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none', resize: 'vertical' }}></textarea>
                            </div>

                            {status === 'error' && <p style={{ color: '#ef4444', fontSize: 14 }}>Hubo un error al enviar el mensaje. Intentá de nuevo más tarde.</p>}

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                                <button type="submit" disabled={status === 'loading'} style={{
                                    background: '#FF6B00', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8,
                                    fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                                    cursor: status === 'loading' ? 'wait' : 'pointer', transition: 'background .2s', opacity: status === 'loading' ? 0.7 : 1
                                }}>
                                    {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* 2. Información del Club (abajo y aclarando no oficial) */}
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#C8D8EC', textTransform: 'uppercase', marginBottom: 20 }}>
                    <span style={{ color: '#FF6B00' }}>Atención:</span> Información referencial del Club
                </h3>
                <p style={{ fontSize: 14, color: '#7A94B0', marginBottom: 24 }}>Todo Talleres no es un canal de atención oficial del club. A continuación te brindamos publicamente los medios oficiales de la Institución por si necesitás comunicarte directamente con ellos.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                    <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, padding: '24px', opacity: 0.8 }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 24 }}>🏛️</span> Sede Social del CAT
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Dirección</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Rosario de Santa Fe 15, Córdoba</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Teléfono Oficial</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>(0351) 428-2716</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, padding: '24px', opacity: 0.8 }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 24 }}>🛒</span> Paseo del Jockey
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Sede Sur</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Elías Yofre 1050, Córdoba</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Emails del club</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: '#7AB3FF' }}>socios@clubtalleres.com.ar</p>
                            </div>
                        </div>
                    </div>
                </div>

            </InstitucionalLayout>
            <Footer />
        </>
    )
}
