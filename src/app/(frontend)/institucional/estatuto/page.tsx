import React from 'react'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { InstitucionalLayout } from '../../../../components/InstitucionalLayout'

export const metadata = {
    title: 'Estatuto — Club Atlético Talleres de Córdoba',
    description: 'Estatuto oficial del Club Atlético Talleres de Córdoba, actualizado en julio de 2025.',
}

const capitulos = [
    {
        titulo: 'Cap. I — Denominación, Domicilio y Objeto',
        articulos: [
            { num: 'Art. 1°', texto: 'La institución se denomina "Club Atlético Talleres", con domicilio legal en la ciudad de Córdoba, provincia de Córdoba, República Argentina.' },
            { num: 'Art. 2°', texto: 'El Club tiene por objeto promover, fomentar y desenvolver el deporte amateur y profesional en todas sus manifestaciones, la cultura, la recreación y la integración social de sus asociados y la comunidad.' },
            { num: 'Art. 3°', texto: 'La institución no persigue fines de lucro y su patrimonio y recursos serán destinados exclusivamente al cumplimiento de sus objetivos estatutarios.' },
        ]
    },
    {
        titulo: 'Cap. II — De los Socios',
        articulos: [
            { num: 'Art. 10°', texto: 'Podrán ser socios todas las personas físicas que lo soliciten y sean aceptadas por la Comisión Directiva, previo cumplimiento de los requisitos establecidos en el presente estatuto.' },
            { num: 'Art. 12°', texto: 'Las categorías de socios son: Activo, Vitalicio, Juvenil, Infantil, Cadete, Familiar, Honorario y Adherente. Cada categoría tiene derechos y obligaciones específicos.' },
            { num: 'Art. 15°', texto: 'Los socios activos mayores de 18 años con más de 6 meses de antigüedad y al corriente de sus cuotas tienen derecho a voto en las Asambleas.' },
        ]
    },
    {
        titulo: 'Cap. III — Gobierno y Administración',
        articulos: [
            { num: 'Art. 20°', texto: 'El gobierno de la institución está a cargo de: La Asamblea General de Socios, la Comisión Directiva y la Comisión Revisora de Cuentas.' },
            { num: 'Art. 25°', texto: 'La Comisión Directiva estará integrada por un Presidente, dos Vicepresidentes, un Secretario General, un Prosecretario, un Tesorero, un Protesorero y cinco Vocales Titulares y dos Suplentes.' },
            { num: 'Art. 28°', texto: 'El mandato de los miembros de la Comisión Directiva es de cuatro (4) años, con posibilidad de reelección. (Modificación aprobada en julio de 2025 por la Inspección de Personas Jurídicas de Córdoba).' },
        ]
    },
    {
        titulo: 'Cap. IV — Del Patrimonio',
        articulos: [
            { num: 'Art. 40°', texto: 'El patrimonio social se compone de los bienes inmuebles, muebles, derechos y acciones que posea o adquiera la institución; las cuotas sociales; las recaudaciones por espectáculos; las donaciones, legados y subsidios; y todo otro ingreso lícito.' },
            { num: 'Art. 42°', texto: 'El ejercicio económico cierra el 31 de diciembre de cada año. La Memoria, Inventario, Balance General y Estado de Resultados deberán ser presentados a la Asamblea dentro de los 120 días del cierre del ejercicio.' },
        ]
    },
]

export default function EstatutoPage() {
    return (
        <>
            <Header />
            <InstitucionalLayout
                title="Estatuto"
                subtitle="Documento fundacional que rige la vida institucional del club. Última actualización: julio de 2025."
                breadcrumb="Estatuto"
            >
                {/* Banner actualización */}
                <div style={{
                    background: 'rgba(255,107,0,0.08)',
                    border: '1px solid rgba(255,107,0,0.25)',
                    borderLeft: '4px solid #FF6B00',
                    borderRadius: 10,
                    padding: '16px 20px',
                    marginBottom: 32,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                }}>
                    <span style={{ fontSize: 24 }}>📋</span>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 3 }}>Estatuto actualizado — Julio 2025</p>
                        <p style={{ fontSize: 13, color: '#C8D8EC' }}>
                            La Inspección General de Personas Jurídicas de Córdoba aprobó las modificaciones que incluyen la posibilidad de reelección del presidente y la flexibilización de requisitos para candidatos.
                        </p>
                    </div>
                </div>

                {/* Descarga */}
                <a
                    href="https://www.clubtalleres.com.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: '#003087', color: 'white',
                        padding: '12px 24px', borderRadius: 8,
                        fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700,
                        letterSpacing: 1, textTransform: 'uppercase',
                        marginBottom: 40, transition: 'background .2s',
                        textDecoration: 'none',
                    }}
                >
                    <span>⬇️</span> Descargar Estatuto Completo (PDF)
                </a>

                {/* Resumen por capítulos */}
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.2, color: 'white', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 3, height: 18, background: '#FF6B00', display: 'inline-block', borderRadius: 2 }} />
                    Resumen de Artículos Principales
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {capitulos.map((cap, ci) => (
                        <div key={ci} style={{ background: '#080F1D', border: '1px solid #1A2D45', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ background: 'rgba(0,48,135,0.3)', padding: '12px 20px', borderBottom: '1px solid #1A2D45' }}>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, letterSpacing: 0.8, color: '#7AB3FF', textTransform: 'uppercase' }}>{cap.titulo}</h3>
                            </div>
                            {cap.articulos.map((art, ai) => (
                                <div key={ai} style={{ padding: '14px 20px', borderBottom: ai < cap.articulos.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                    <span style={{ display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 900, letterSpacing: 1.5, color: '#FF6B00', background: 'rgba(255,107,0,0.1)', padding: '2px 8px', borderRadius: 4, marginBottom: 6 }}>{art.num}</span>
                                    <p style={{ fontSize: 14, color: '#C8D8EC', lineHeight: 1.7 }}>{art.texto}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: 24, fontSize: 12, color: '#2A4060', fontStyle: 'italic' }}>
                    * Este es un resumen informativo. Para el texto completo y oficial, descargue el documento PDF desde el sitio oficial del club.
                </p>
            </InstitucionalLayout>
            <Footer />
        </>
    )
}
