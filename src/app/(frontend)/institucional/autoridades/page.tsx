import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Autoridades — Club Atlético Talleres de Córdoba',
    description: 'Comisión Directiva del Club Atlético Talleres de Córdoba. Período 2025–2029.',
}

const comision = [
    { cargo: 'Presidente', nombre: 'Andrés Miguel Fassi' },
    { cargo: 'Vicepresidente 1°', nombre: 'Gerardo Andrés Moyano Cires' },
    { cargo: 'Vicepresidente 2°', nombre: 'Guillermo José Carena' },
    { cargo: 'Secretario General', nombre: 'Juan Bautista Fassi' },
    { cargo: 'Prosecretario', nombre: 'A designar' },
    { cargo: 'Tesorero', nombre: 'Gustavo Alberto Pazzaglia' },
    { cargo: 'Protesorero', nombre: 'A designar' },
    { cargo: 'Vocal Titular 1°', nombre: 'Fabio Andrés Mana' },
    { cargo: 'Vocal Titular 2°', nombre: 'Sergio Gustavo Montini' },
    { cargo: 'Vocal Titular 3°', nombre: 'Alejandro Marcelo Perié' },
    { cargo: 'Vocal Titular 4°', nombre: 'Néstor Gastón Salas' },
    { cargo: 'Vocal Titular 5°', nombre: 'Jorge Luis Aballay' },
    { cargo: 'Vocal Suplente 1°', nombre: 'Daniel Osvaldo Pereyra' },
    { cargo: 'Vocal Suplente 2°', nombre: 'Santiago Acosta' },
]

const comisionFiscalizadora = [
    { cargo: 'Titular 1°', nombre: 'Horacio Fabio Cingolani' },
    { cargo: 'Titular 2°', nombre: 'Ricardo José Amitrano' },
    { cargo: 'Titular 3°', nombre: 'César Augusto Roldán' },
    { cargo: 'Suplente', nombre: 'Adrián Alejandro Oviedo' },
]

export default function AutoridadesPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Autoridades"
                subtitle="Comisión Directiva período 2025–2029, reelecta el 19 de octubre de 2025"
                breadcrumb="Autoridades"
            >
                {/* Presidente destacado */}
                <div style={{
                    background: 'linear-gradient(135deg, #001030 0%, #0A1628 100%)',
                    border: '1px solid rgba(255,107,0,0.3)',
                    borderTop: '3px solid #FF6B00',
                    borderRadius: 14,
                    padding: '28px 32px',
                    marginBottom: 36,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #003087, #0044BB)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 32, flexShrink: 0,
                        boxShadow: '0 0 24px rgba(0,48,135,0.5)',
                    }}>🧑‍💼</div>
                    <div>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#FF6B00', marginBottom: 4 }}>Presidente</p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: 0.5 }}>Andrés Miguel Fassi</h2>
                        <p style={{ fontSize: 13, color: '#7A94B0', marginTop: 4 }}>Reelecto el 19 de octubre de 2025 con más del 80% de los votos · Mandato hasta 2029</p>
                    </div>
                </div>

                {/* Comisión Directiva */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                    Comisión Directiva
                </h2>

                <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
                    {comision.map((m, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '13px 20px',
                            borderBottom: i < comision.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                        }}>
                            <span style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: '#7A94B0', minWidth: 200 }}>{m.cargo}</span>
                            <span style={{ fontSize: 15, fontWeight: 600, color: m.nombre.includes('designar') ? '#1A2D45' : 'white' }}>{m.nombre}</span>
                        </div>
                    ))}
                </div>

                {/* Comisión Fiscalizadora */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#003087', display: 'inline-block', borderRadius: 2 }} />
                    Comisión Fiscalizadora
                </h2>

                <div style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, overflow: 'hidden' }}>
                    {comisionFiscalizadora.map((m, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '13px 20px',
                            borderBottom: i < comisionFiscalizadora.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                        }}>
                            <span style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: '#7A94B0', minWidth: 200 }}>{m.cargo}</span>
                            <span style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{m.nombre}</span>
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: 20, fontSize: 12, color: '#2A4060', fontStyle: 'italic' }}>
                    * Información actualizada al período 2025–2029. Para información oficial, consulte clubtalleres.com.ar
                </p>
            </InstitucionalLayout>
            <Footer />
        </>
    )
}
