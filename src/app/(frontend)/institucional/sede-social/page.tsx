import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Sede Social — Club Atlético Talleres de Córdoba',
    description: 'Sede social del Club Atlético Talleres ubicada en Rosario de Santa Fe 15, Córdoba.',
}

const servicios = [
    { icon: '🎫', titulo: 'Abonos de Fútbol', desc: 'Renovación y compra de abonos para partidos de local en el Estadio Mario Alberto Kempes.' },
    { icon: '📋', titulo: 'Nuevas Membresías', desc: 'Tramitación de alta de socios nuevos, actualización de datos y categorías sociales.' },
    { icon: '🤝', titulo: 'Atención a Filiales', desc: 'Soporte y asistencia oficial a las filiales nacionales e internacionales del club.' },
    { icon: '👕', titulo: 'Tienda Oficial', desc: 'Venta de indumentaria y merchandising oficial de Club Atlético Talleres.' },
    { icon: '💳', titulo: 'Tarjeta Talleres BBVA', desc: 'Solicitud y gestión de la Tarjeta de Crédito Talleres BBVA para socios.' },
    { icon: '🏆', titulo: 'Copa CONMEBOL 1999', desc: 'En la sede se exhibe el trofeo original de la Copa CONMEBOL, el único título internacional del club.' },
]

export default function SedeSocialPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Sede Social"
                subtitle="El corazón institucional del club, en el centro de Córdoba desde 1913"
                breadcrumb="Sede Social"
            >
                {/* Info principal */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36,
                }}>
                    {[
                        { icon: '📍', label: 'Dirección', value: 'Rosario de Santa Fe 15, Córdoba, Argentina' },
                        { icon: '📞', label: 'Teléfono', value: '(0351) 428-2716' },
                        { icon: '🕐', label: 'Horario L–V', value: '10:00 a 18:00 hs' },
                        { icon: '🕐', label: 'Horario Sáb', value: '09:00 a 13:00 hs' },
                    ].map(item => (
                        <div key={item.label} style={{
                            background: '#080F1D', border: '1px solid #1A2D45',
                            borderRadius: 10, padding: '18px 20px',
                            display: 'flex', alignItems: 'flex-start', gap: 14,
                        }}>
                            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                            <div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 4 }}>{item.label}</p>
                                <p style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Descripción */}
                <div style={{
                    background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                    border: '1px solid #1A2D45', borderLeft: '4px solid #FF6B00',
                    borderRadius: 12, padding: '24px 28px', marginBottom: 36,
                }}>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: '#C8D8EC' }}>
                        Ubicada en pleno centro de la ciudad de Córdoba, junto a la <strong style={{ color: 'white' }}>Plaza San Martín, el Cabildo y la Catedral</strong>,
                        la sede social de Talleres es una referencia ineludible del patrimonio urbanístico cordobés.
                        Desde la gestión de Andrés Fassi a partir de 2017, la sede fue completamente remodelada para preservar
                        su valor patrimonial y mejorar la experiencia de atención a los socios.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: '#C8D8EC', marginTop: 12 }}>
                        Además, en sus instalaciones se exhibe el <strong style={{ color: '#FF6B00' }}>trofeo original de la Copa CONMEBOL 1999</strong>,
                        el único título internacional conquistado por el club en su historia.
                    </p>
                </div>

                {/* Como llegar */}
                <div style={{
                    background: '#080F1D', border: '1px solid #1A2D45',
                    borderRadius: 12, padding: '20px 24px', marginBottom: 36,
                }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 1, marginBottom: 16 }}>🗺️ Cómo Llegar</h3>
                    <p style={{ fontSize: 14, color: '#C8D8EC', lineHeight: 1.7, marginBottom: 12 }}>
                        La sede se encuentra a metros de la <strong style={{ color: 'white' }}>Plaza San Martín</strong>, en pleno microcentro de Córdoba.
                        Acceso por peatonal Obispo Trejo, a una cuadra de la Catedral.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Trole 1, 2, 3', 'Bus 30, 50, 51', 'Metro TUP — Parada Centro'].map(t => (
                            <span key={t} style={{ background: '#003087', color: '#7AB3FF', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>🚌 {t}</span>
                        ))}
                    </div>
                </div>

                {/* Servicios */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                    Servicios al Socio
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                    {servicios.map(s => (
                        <div key={s.titulo} style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 10, padding: '18px 20px' }}>
                            <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 0.5, marginBottom: 6 }}>{s.titulo}</h4>
                            <p style={{ fontSize: 13, color: '#7A94B0', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* WhatsApp */}
                <div style={{
                    marginTop: 32, background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)',
                    borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
                }}>
                    <span style={{ fontSize: 32 }}>💬</span>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 3 }}>Atención por WhatsApp — Tienda</p>
                        <p style={{ fontSize: 13, color: '#C8D8EC' }}>Para consultas de indumentaria y merchandising: <strong style={{ color: '#22c55e' }}>351 329-4793</strong></p>
                    </div>
                </div>
            </InstitucionalLayout>
            <Footer />
        </>
    )
}
