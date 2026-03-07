import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Centro de Alto Rendimiento — Club Atlético Talleres de Córdoba',
    description: 'El CARD Amadeo Nuccetelli, uno de los complejos deportivos más modernos del fútbol argentino.',
}

const instalaciones = [
    { icon: '⚽', titulo: '6 Canchas de Césped Natural', desc: 'Seis campos de juego con césped natural que cumplen estándares CONMEBOL, equipados con sistemas eléctricos, de riego y drenaje de última generación.' },
    { icon: '🏟️', titulo: '3 Canchas de Alto Rendimiento', desc: 'Tres campos adicionales de alto rendimiento con césped natural específicamente diseñados para el primer equipo y reserva.' },
    { icon: '🏃', titulo: '2 Canchas Sintéticas', desc: 'Dos canchas de césped sintético para entrenamiento en condiciones climáticas adversas, disponibles para todas las categorías de inferiores.' },
    { icon: '🏋️', titulo: 'Gimnasios Profesionales', desc: 'Instalaciones de musculación y trabajo físico con equipamiento de vanguardia para el plantel profesional e inferiores.' },
    { icon: '🏥', titulo: 'Consultorio Médico Integral', desc: 'Área médica interdisciplinaria con servicios de medicina deportiva, odontología, nutrición y psicología deportiva. Único en su tipo en el fútbol argentino.' },
    { icon: '🛁', titulo: 'Vestuarios para Inferiores', desc: 'Nuevos vestuarios específicamente construidos para las divisiones juveniles, con todas las comodidades modernas.' },
    { icon: '🏢', titulo: 'Edificio Javier Pastore', desc: 'Edificio administrativo y de hospedaje completamente renovado, que incluye habitaciones para jugadores de inferiores del interior del país.' },
    { icon: '🌳', titulo: 'Áreas Verdes y Laguna', desc: 'Extensas áreas forestadas y una laguna artificial que otorgan al predio un ambiente ideal para la concentración y el rendimiento deportivo.' },
]

export default function CARPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Centro de Alto Rendimiento"
                subtitle="CARD Amadeo Nuccetelli — Polo Deportivo Kempes, Córdoba"
                breadcrumb="Centro de Alto Rendimiento"
            >
                {/* Hero card */}
                <div style={{
                    background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    borderTop: '3px solid #FF6B00',
                    borderRadius: 14,
                    padding: '28px 32px',
                    marginBottom: 36,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                        <div style={{ width: 60, height: 60, borderRadius: 12, background: 'rgba(0,48,135,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏟️</div>
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: 0.5 }}>CARD Amadeo Nuccetelli</h2>
                            <p style={{ fontSize: 13, color: '#FF6B00', fontWeight: 600 }}>Polo Deportivo Kempes · Córdoba Capital</p>
                        </div>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: '#C8D8EC' }}>
                        El <strong style={{ color: 'white' }}>Centro de Alto Rendimiento Deportivo Amadeo Nuccetelli</strong> es uno de los complejos
                        deportivos más modernos y completos del fútbol argentino. Utilizado por el primer equipo, el plantel reserva
                        y todas las divisiones juveniles de Talleres, el CARD es una muestra del ambicioso proyecto institucional
                        impulsado desde 2017.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: '#C8D8EC', marginTop: 12 }}>
                        El predio incorpora una característica <strong style={{ color: '#FF6B00' }}>única en el fútbol argentino</strong>: servicios de
                        odontología, nutrición y psicología deportiva para todos los atletas del club, garantizando una formación
                        integral más allá de lo futbolístico.
                    </p>
                </div>

                {/* Estadísticas */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 36 }}>
                    {[
                        { num: '11', label: 'Canchas de Fútbol' },
                        { num: '+20ha', label: 'Superficie total' },
                        { num: '100+', label: 'Profesionales de salud' },
                        { num: '2017', label: 'Año de refundación' },
                    ].map(stat => (
                        <div key={stat.label} style={{
                            background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 10,
                            padding: '16px 12px', textAlign: 'center',
                        }}>
                            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: '#FF6B00', lineHeight: 1 }}>{stat.num}</p>
                            <p style={{ fontSize: 11, color: '#7A94B0', marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: 'var(--font-display)', fontWeight: 700 }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Instalaciones */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                    Instalaciones
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                    {instalaciones.map(s => (
                        <div key={s.titulo} style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 10, padding: '20px' }}>
                            <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 0.5, marginBottom: 8 }}>{s.titulo}</h4>
                            <p style={{ fontSize: 13, color: '#7A94B0', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Estadio Nuevo */}
                <div style={{
                    marginTop: 36, background: 'rgba(0,48,135,0.15)', border: '1px solid rgba(0,68,187,0.3)',
                    borderLeft: '4px solid #0044BB', borderRadius: 10, padding: '20px 24px',
                }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 0.8, marginBottom: 8 }}>🏗️ Proyecto Estadio Propio</h3>
                    <p style={{ fontSize: 14, color: '#C8D8EC', lineHeight: 1.7 }}>
                        Talleres proyecta la construcción de su propio estadio con capacidad para más de 30.000 espectadores,
                        con inicio de obras previsto para 2026. El proyecto cuenta con el apoyo de un sponsor de naming y
                        forma parte del plan de infraestructura a largo plazo de la institución.
                    </p>
                </div>
            </InstitucionalLayout>
            <Footer />
        </>
    )
}
