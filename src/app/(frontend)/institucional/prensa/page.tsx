import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Prensa — Club Atlético Talleres de Córdoba',
    description: 'Información para medios, acreditaciones y contacto de prensa del Club Atlético Talleres.',
}

export default function PrensaPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout title="Prensa" subtitle="Información para medios de comunicación y periodistas acreditados" breadcrumb="Prensa">

                <div style={{ background: 'linear-gradient(135deg,#001030,#0A1628)', border: '1px solid rgba(255,107,0,0.2)', borderTop: '3px solid #FF6B00', borderRadius: 14, padding: '28px 32px', marginBottom: 36 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 20 }}>📰 Departamento de Prensa</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { icon: '📧', label: 'Email', value: 'prensa@clubtalleres.com.ar' },
                            { icon: '📞', label: 'Teléfono', value: '(0351) 571-5300' },
                            { icon: '📍', label: 'Ubicación', value: 'Paseo del Jockey — Elías Yofre 1050' },
                            { icon: '🕐', label: 'Horario', value: 'Lunes a Viernes 9:00–17:00 hs' },
                        ].map(item => (
                            <div key={item.label} style={{ display: 'flex', gap: 12 }}>
                                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                                <div>
                                    <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 2 }}>{item.label}</p>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                    Acreditaciones 2026
                </h2>

                <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, padding: '24px', marginBottom: 36 }}>
                    <p style={{ fontSize: 15, color: '#C8D8EC', lineHeight: 1.8, marginBottom: 20 }}>
                        Para acreditarse en partidos del Club Atlético Talleres en el <strong style={{ color: 'white' }}>Estadio Mario Alberto Kempes</strong>, enviar con 48 hs de anticipación:
                    </p>
                    {['Nota oficial del medio en papel membretado (medio, periodista, DNI)', 'Copia de DNI del periodista y fotógrafo/camarógrafo', 'Credencial de prensa vigente o constancia del medio', 'Tipo de cobertura: gráfica, fotográfica o audiovisual'].map((req, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B00', marginTop: 7, flexShrink: 0 }} />
                            <p style={{ fontSize: 14, color: '#C8D8EC', lineHeight: 1.6 }}>{req}</p>
                        </div>
                    ))}
                    <a href="mailto:prensa@clubtalleres.com.ar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FF6B00', color: 'white', padding: '11px 22px', borderRadius: 8, marginTop: 16, fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', textDecoration: 'none' }}>
                        📧 Solicitar Acreditación
                    </a>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#003087', display: 'inline-block', borderRadius: 2 }} />
                    Redes Oficiales
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {[
                        { red: 'X / Twitter', handle: '@CATalleresOK', color: '#1DA1F2' },
                        { red: 'Instagram', handle: '@clubtalleres', color: '#E1306C' },
                        { red: 'Facebook', handle: '/clubtalleres', color: '#1877F2' },
                        { red: 'YouTube', handle: 'Talleres Oficial', color: '#FF0000' },
                    ].map(r => (
                        <div key={r.red} style={{ border: `1px solid ${r.color}33`, background: `${r.color}11`, borderRadius: 8, padding: '10px 16px' }}>
                            <p style={{ fontSize: 10, color: '#7A94B0', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{r.red}</p>
                            <p style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{r.handle}</p>
                        </div>
                    ))}
                </div>
            </InstitucionalLayout>
            <Footer />
        </>
    )
}
