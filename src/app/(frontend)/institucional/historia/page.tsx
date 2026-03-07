import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Historia — Club Atlético Talleres de Córdoba',
    description: 'Conocé la rica historia del Club Atlético Talleres de Córdoba, fundado el 12 de octubre de 1913.',
}

const hitos = [
    { año: '1913', titulo: 'Fundación', desc: 'El 12 de octubre de 1913, Tomás Lawson y un grupo de obreros de los Talleres del Ferrocarril Central Córdoba fundaron el club bajo el nombre de "Atlético Talleres Central Córdoba", en el barrio Jardín.' },
    { año: '1917', titulo: 'Nuevo nombre', desc: 'La institución adopta el nombre definitivo de "Club Atlético Talleres". En el mismo año, Talleres se reintegra a la Liga Cordobesa de Fútbol tras una breve desafiliación.' },
    { año: '1940s', titulo: 'Primeros títulos', desc: 'El club consolida su presencia en el fútbol cordobés, ganando campeonatos regionales y ampliando su base de socios en los barrios Jardín y Alto Alberdi.' },
    { año: '1974–1978', titulo: 'Época Dorada', desc: 'Talleres vive su momento más glorioso en el fútbol argentino, con participaciones destacadas en los torneos Nacionales y Metropolitanos de AFA. El equipo se posiciona entre los mejores del país.' },
    { año: '1999', titulo: 'Copa CONMEBOL', desc: 'Talleres conquista la Copa CONMEBOL, convirtiéndose en el primer —y único— club indirectamente afiliado a la AFA en ganar una copa internacional. Un hito histórico para el fútbol cordobés.' },
    { año: '2001–2002', titulo: 'Copa Mercosur y Libertadores', desc: 'Resultado de su éxito continental, Talleres clasifica a la Copa Mercosur 2001 y debuta en la Copa Libertadores 2002, siendo el primer club cordobés en disputar un campeonato internacional de CONMEBOL.' },
    { año: '2017', titulo: 'Nueva era: Andrés Fassi', desc: 'Andrés Fassi asume la presidencia e inicia una profunda transformación institucional, deportiva e infraestructural del club. Comienzan las remodelaciones de la sede social y del CARD Amadeo Nuccetelli.' },
    { año: '2019–2024', titulo: 'Regresos a la Libertadores', desc: 'Talleres disputa la Copa Libertadores en 2019, 2022 y 2024, consolidándose como referente del fútbol argentino y uno de los clubes más sólidos institucionalmente del interior del país.' },
    { año: '2025', titulo: 'Fassi reelecto', desc: 'El 19 de octubre de 2025, Andrés Fassi es reelecto presidente con más del 80% de los votos. Su mandato se extiende hasta 2029. El club proyecta la construcción de un estadio propio con capacity para más de 30.000 espectadores.' },
]

export default function HistoriaPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Historia"
                subtitle="Desde 1913, una pasión que une a Córdoba"
                breadcrumb="Historia"
            >
                {/* Intro */}
                <div style={{
                    background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                    border: '1px solid #1A2D45',
                    borderLeft: '4px solid #FF6B00',
                    borderRadius: 12,
                    padding: '24px 28px',
                    marginBottom: 40,
                }}>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: '#C8D8EC' }}>
                        El <strong style={{ color: 'white' }}>Club Atlético Talleres</strong> nació en el corazón ferroviario de Córdoba, forjado
                        por las manos de los obreros que trabajaban en los Talleres del Ferrocarril Central Córdoba.
                        Más de <strong style={{ color: '#FF6B00' }}>110 años de historia</strong> avalan su trayectoria como uno
                        de los clubes más importantes del interior argentino, con una Copa Internacional, múltiples participaciones
                        en torneos de CONMEBOL y una base social de más de 150.000 socios.
                    </p>
                </div>

                {/* Timeline */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 20, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                    Línea de Tiempo
                </h2>

                <div style={{ position: 'relative', paddingLeft: 32 }}>
                    {/* Línea vertical */}
                    <div style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 2, background: 'linear-gradient(to bottom, #FF6B00, #003087, transparent)' }} />

                    {hitos.map((h, i) => (
                        <div key={i} style={{ position: 'relative', marginBottom: 32 }}>
                            {/* Dot */}
                            <div style={{
                                position: 'absolute', left: -32, top: 4,
                                width: 14, height: 14, borderRadius: '50%',
                                background: i === 0 ? '#FF6B00' : '#003087',
                                border: '2px solid ' + (i === 0 ? '#FF6B00' : '#1A2D45'),
                                boxShadow: i === 0 ? '0 0 10px rgba(255,107,0,0.5)' : 'none',
                            }} />

                            <div style={{
                                background: '#080F1D',
                                border: '1px solid #1A2D45',
                                borderRadius: 10,
                                padding: '16px 20px',
                                transition: 'border-color .2s',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <span style={{
                                        fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 900,
                                        letterSpacing: 1.5, color: '#FF6B00',
                                        background: 'rgba(255,107,0,0.1)', padding: '2px 10px', borderRadius: 4,
                                    }}>{h.año}</span>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 0.8 }}>{h.titulo}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: '#C8D8EC', lineHeight: 1.7 }}>{h.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Colores y símbolos */}
                <div style={{ marginTop: 48 }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 3, height: 20, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                        Identidad del Club
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        {[
                            { label: 'Fundación', value: '12 de octubre de 1913', icon: '📅' },
                            { label: 'Fundador', value: 'Tomás Lawson', icon: '🏅' },
                            { label: 'Apodo', value: 'La T, La Albiazul, La Matadora', icon: '⚡' },
                            { label: 'Colores', value: 'Azul y Blanco', icon: '🔵' },
                            { label: 'Estadio', value: 'Mario A. Kempes (57.000 esp.)', icon: '🏟️' },
                            { label: 'Copa internacional', value: 'Copa CONMEBOL 1999', icon: '🏆' },
                        ].map(item => (
                            <div key={item.label} style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 10, padding: '16px 20px' }}>
                                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                                <p style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#7A94B0', marginBottom: 4 }}>{item.label}</p>
                                <p style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </InstitucionalLayout>
            <Footer />
        </>
    )
}
