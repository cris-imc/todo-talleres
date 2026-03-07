import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Contacto — Club Atlético Talleres de Córdoba',
    description: 'Comunicate con el Club Atlético Talleres. Sede social, atención al socio y canales digitales.',
}

export default function ContactoPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Contacto"
                subtitle="Canales de atención, ubicación y vías de comunicación oficial"
                breadcrumb="Contacto"
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>

                    {/* Sede Social */}
                    <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, padding: '24px' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 24 }}>🏛️</span> Sede Social
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Dirección</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Rosario de Santa Fe 15, Córdoba</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Teléfono</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>(0351) 428-2716</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Horarios</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Lun a Vie: 10:00 a 18:00 hs<br />Sábados: 09:00 a 13:00 hs</p>
                            </div>
                        </div>
                    </div>

                    {/* Paseo del Jockey / Tienda */}
                    <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, padding: '24px' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 24 }}>🛒</span> Atención al Socio y Tienda
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Paseo del Jockey (Sede Sur)</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Elías Yofre 1050, Córdoba</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Teléfono / WhatsApp</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>(0351) 571-5300<br />+54 9 351 329-4793 (Tienda)</p>
                            </div>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>Emails</p>
                                <p style={{ fontSize: 14, fontWeight: 600, color: '#7AB3FF' }}>socios@clubtalleres.com.ar<br />tienda@clubtalleres.com.ar</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Formulario de Contacto (UI) */}
                <div style={{
                    background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    borderTop: '3px solid #FF6B00',
                    borderRadius: 14,
                    padding: '32px',
                }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 8 }}>Escribinos</h2>
                    <p style={{ fontSize: 14, color: '#C8D8EC', marginBottom: 24 }}>Completá el formulario y nos pondremos en contacto a la brevedad.</p>

                    <form style={{ display: 'grid', gap: 16 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Nombre Completo</label>
                                <input type="text" placeholder="Ej: Juan Pérez" style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Correo Electrónico</label>
                                <input type="email" placeholder="juan@ejemplo.com" style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Teléfono (Opcional)</label>
                                <input type="tel" placeholder="+54 9 351..." style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Motivo / Departamento</label>
                                <select style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none', appearance: 'none' }}>
                                    <option>Atención al Socio</option>
                                    <option>Tienda Oficial</option>
                                    <option>Prensa</option>
                                    <option>Relaciones Institucionales</option>
                                    <option>Otro</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 6 }}>Mensaje</label>
                            <textarea rows={5} placeholder="Escribí tu consulta..." style={{ width: '100%', background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none', resize: 'vertical' }}></textarea>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                            <button type="button" style={{
                                background: '#FF6B00', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8,
                                fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                                cursor: 'pointer', transition: 'background .2s'
                            }}>
                                Enviar Mensaje
                            </button>
                        </div>
                    </form>
                </div>

            </InstitucionalLayout>
            <Footer />
        </>
    )
}
