'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import type { CMSPartido } from '../lib/matchTypes'
import { formatMatchDate, formatMatchTime, COMPETENCIA_LABELS, getRivalColor } from '../lib/matchTypes'

import { zonaA, zonaB, anual, promedios } from '../data/leagueTable'

type Tab = 'A' | 'B' | 'Anual' | 'Promedios'

// Convierte el formato de leagueTable al formato interno del sidebar
function toTabRow(teams: typeof zonaA) {
    return teams.map((t, i) => ({
        pos: i + 1,
        equipo: t.nombre,
        pj: t.pj,
        pts: t.pts,
        dif: (t.dif > 0 ? '+' : '') + t.dif,
        isCAT: t.esTalleres,
    }))
}

const tabsData: Record<Tab, ReturnType<typeof toTabRow>> = {
    A: toTabRow(zonaA),
    B: toTabRow(zonaB),
    Anual: toTabRow(anual),
    Promedios: toTabRow(promedios),
}


// Fixture mock
const fixtureData = [
    { id: 1, rival: 'Huracán', condicion: 'local', fecha: 'Dom 15 Mar', hora: '18:00', competencia: 'Liga Prof.', codigo: 'HUR', color: '#FF0000', estado: 'proximo' },
    { id: 2, rival: 'Racing Club', condicion: 'visitante', fecha: 'Sáb 22 Mar', hora: '21:30', competencia: 'Liga Prof.', codigo: 'RAC', color: '#00AA00', estado: 'proximo' },
    { id: 3, rival: 'Boca Juniors', condicion: 'local', fecha: 'Dom 30 Mar', hora: '17:00', competencia: 'Copa Arg.', codigo: 'BOC', color: '#FFD700', estado: 'proximo' },
    { id: 4, rival: 'River Plate', condicion: 'visitante', fecha: 'Vie 04 Abr', hora: '20:00', competencia: 'Liga Prof.', codigo: 'RIV', color: '#CC0000', estado: 'proximo' },
    { id: 5, rival: 'Independiente', condicion: 'local', fecha: 'Dom 13 Abr', hora: '18:00', competencia: 'Liga Prof.', codigo: 'IND', color: '#FF0000', estado: 'proximo' },
    { id: 6, rival: 'Estudiantes', condicion: 'visitante', fecha: 'Sáb 19 Abr', hora: '19:00', competencia: 'Liga Prof.', codigo: 'EST', color: '#FF8800', estado: 'proximo' },
]

// Countdown con segundos
function useCountdown(targetDate: Date) {
    const calc = () => {
        const diff = targetDate.getTime() - Date.now()
        if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00' }
        const pad = (n: number) => String(n).padStart(2, '0')
        return {
            d: pad(Math.floor(diff / 86_400_000)),
            h: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
            m: pad(Math.floor((diff % 3_600_000) / 60_000)),
            s: pad(Math.floor((diff % 60_000) / 1_000)),
        }
    }
    const [t, setT] = useState(calc)
    useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [])
    return t
}

// ── Fixture mock (fallback modal cuando el CMS no tiene partidos) ──
const fixtureDataMock = [
    { id: 1, rival: 'Huracán', condicion: 'local', fecha: 'Dom 15 Mar', hora: '18:00', competencia: 'Liga Prof.', codigo: 'HUR', color: '#FF0000' },
    { id: 2, rival: 'Racing Club', condicion: 'visitante', fecha: 'Sáb 22 Mar', hora: '21:30', competencia: 'Liga Prof.', codigo: 'RAC', color: '#00AA00' },
    { id: 3, rival: 'Boca Juniors', condicion: 'local', fecha: 'Dom 30 Mar', hora: '17:00', competencia: 'Copa Arg.', codigo: 'BOC', color: '#FFD700' },
    { id: 4, rival: 'River Plate', condicion: 'visitante', fecha: 'Vie 04 Abr', hora: '20:00', competencia: 'Liga Prof.', codigo: 'RIV', color: '#CC0000' },
    { id: 5, rival: 'Independiente', condicion: 'local', fecha: 'Dom 13 Abr', hora: '18:00', competencia: 'Liga Prof.', codigo: 'IND', color: '#FF0000' },
]

// ── Modal genérico (Portal → se renderiza fuera del sidebar) ──
const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return null

    return createPortal(
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(4, 10, 24, 0.75)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                background: 'linear-gradient(180deg, #0A1628 0%, #060E1A 100%)',
                border: '1px solid rgba(255,107,0,0.15)',
                borderTop: '3px solid #FF6B00',
                borderRadius: 14,
                width: '100%', maxWidth: 580, maxHeight: '85vh',
                overflowY: 'auto',
                boxShadow: '0 0 40px rgba(255,107,0,0.08), 0 24px 60px rgba(0,0,0,0.6)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#1A2D45 transparent',
            }}>
                {/* Header sticky */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 22px',
                    borderBottom: '1px solid rgba(255,107,0,0.1)',
                    position: 'sticky', top: 0,
                    background: 'linear-gradient(180deg, #0A1628 0%, #0A1628 90%, transparent 100%)',
                    zIndex: 1,
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 900,
                        textTransform: 'uppercase', letterSpacing: 1.5, color: 'white',
                    }}>{title}</h2>
                    <button onClick={onClose} style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6, cursor: 'pointer', color: '#7A94B0',
                        fontSize: 16, width: 32, height: 32,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all .2s',
                    }}
                        onMouseOver={e => { e.currentTarget.style.color = '#FF6B00'; e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.background = 'rgba(255,107,0,0.1)' }}
                        onMouseOut={e => { e.currentTarget.style.color = '#7A94B0'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    >✕</button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    )
}

// ── Modal tabla completa ──
const FullTableModal: React.FC<{ tab: Tab; onClose: () => void }> = ({ tab, onClose }) => {
    const rows = tabsData[tab]
    const label = tab === 'A' ? 'Zona A' : tab === 'B' ? 'Zona B' : tab
    return (
        <Modal title={`📊 Tabla de Posiciones — ${label}`} onClose={onClose}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#060E1A' }}>
                        {['#', 'Equipo', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'PTS', tab === 'Promedios' ? 'PROM' : 'DIF'].map(h => (
                            <th key={h} style={{ fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#FF6B00', padding: '8px 10px', textAlign: 'left' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.pos} style={{ background: row.isCAT ? 'rgba(0,48,135,0.3)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: row.isCAT ? '3px solid #FF6B00' : '3px solid transparent' }}>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#7A94B0', fontWeight: 600, width: 28 }}>{row.pos}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, fontWeight: row.isCAT ? 700 : 400, color: row.isCAT ? '#fff' : '#C8D8EC', whiteSpace: 'nowrap' }}>{row.equipo}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#C8D8EC' }}>{row.pj}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#C8D8EC' }}>{Math.floor(row.pts / 3)}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#C8D8EC' }}>{row.pts % 3}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#C8D8EC' }}>{row.pj - Math.floor(row.pts / 3) - (row.pts % 3)}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#C8D8EC' }}>{Math.floor(row.pts * 1.2)}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#C8D8EC' }}>{Math.max(0, Math.floor(row.pts * 1.2) - parseInt(row.dif))}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, color: '#fff', fontWeight: 700 }}>{row.pts}</td>
                            <td style={{ padding: '9px 10px', fontSize: 12, fontWeight: 600, color: row.dif.startsWith('+') ? '#22c55e' : row.dif.startsWith('-') ? '#ef4444' : '#C8D8EC' }}>{row.dif}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ padding: 14, textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: '#2A4060' }}>Datos actualizados — Liga Profesional 2026</p>
            </div>
        </Modal>
    )
}

// ── Modal fixture completo (lee del CMS o del mock) ──
const FixtureModal: React.FC<{ onClose: () => void; fixture: CMSPartido[] }> = ({ onClose, fixture }) => {
    const rows = fixture.length > 1 ? fixture : fixtureDataMock
    return (
        <Modal title="🗓 Fixture Completo — Talleres 2026" onClose={onClose}>
            <div style={{ padding: '8px 0' }}>
                {rows.map((p, i) => {
                    // Soporte para objetos CMS y mock
                    const isCMS = 'competencia' in p && typeof (p as any).fecha === 'string' && (p as any).fecha.includes('T')
                    const fechaStr = isCMS ? formatMatchDate((p as CMSPartido).fecha) : (p as any).fecha
                    const horaStr = isCMS ? formatMatchTime((p as CMSPartido).fecha) : (p as any).hora
                    const compLabel = isCMS ? (COMPETENCIA_LABELS[(p as CMSPartido).competencia] ?? (p as CMSPartido).competencia) : (p as any).competencia
                    const codigo = (p as CMSPartido).codigoRival ?? (p as any).codigo ?? '??'
                    const cond = p.condicion
                    const color = (p as any).color ?? '#1A2D45'
                    return (
                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                            <div style={{ minWidth: 80, textAlign: 'center' }}>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'white' }}>{fechaStr}</p>
                                <p style={{ fontSize: 10, color: '#7A94B0', marginTop: 2 }}>{horaStr} hs</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: cond === 'local' ? 'flex-end' : 'flex-start' }}>
                                {cond === 'local' && <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'white' }}>CAT</span>}
                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: cond === 'local' ? '#001030' : color, border: `2px solid ${cond === 'local' ? '#003087' : color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
                                    {cond === 'local' ? <Image src="/images/escudo.png" alt="CAT" width={24} height={24} /> : <span style={{ fontSize: 8, fontWeight: 900, color: 'white' }}>{codigo}</span>}
                                </div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 900, color: '#FF6B00', flexShrink: 0 }}>VS</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: cond === 'visitante' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: cond === 'visitante' ? '#001030' : color, border: `2px solid ${cond === 'visitante' ? '#003087' : color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 2 }}>
                                    {cond === 'visitante' ? <Image src="/images/escudo.png" alt="CAT" width={24} height={24} /> : <span style={{ fontSize: 8, fontWeight: 900, color: 'white' }}>{codigo}</span>}
                                </div>
                                {cond === 'visitante' && <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'white' }}>CAT</span>}
                                {cond === 'local' && <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#C8D8EC' }}>{p.rival}</span>}
                            </div>
                            <div style={{ minWidth: 80, textAlign: 'right' }}>
                                <span style={{ display: 'inline-block', fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3, background: cond === 'local' ? '#003087' : '#1A2D45', color: cond === 'local' ? '#7AB3FF' : '#7A94B0' }}>
                                    {cond === 'local' ? 'Local' : 'Visitante'}
                                </span>
                                <p style={{ fontSize: 9, color: '#2A4060', marginTop: 3 }}>{compLabel}</p>
                            </div>
                        </div>
                    )
                })}
                <div style={{ padding: 14, textAlign: 'center' }}>
                    <p style={{ fontSize: 10, color: '#2A4060' }}>Fixture actualizado — Temporada 2026</p>
                </div>
            </div>
        </Modal>
    )
}

// ── Sidebar principal ──
interface SidebarProps {
    nextMatch?: CMSPartido | null
    fixture?: CMSPartido[]
}

export const Sidebar: React.FC<SidebarProps> = ({ nextMatch, fixture = [] }) => {
    const [activeTab, setActiveTab] = useState<Tab>('A')
    const [showTable, setShowTable] = useState(false)
    const [showFixture, setShowFixture] = useState(false)

    // Datos del próximo partido — del CMS o fallback
    const match = nextMatch ?? {
        rival: 'Huracán', condicion: 'local' as const,
        fecha: '2026-03-15T18:00:00.000-03:00',
        competencia: 'liga' as const,
        estadio: 'Mario A. Kempes, Córdoba',
        codigoRival: 'HUR', estado: 'proximo' as const, id: 0,
    }
    const matchDate = new Date(match.fecha)
    const matchFechaStr = formatMatchDate(match.fecha)
    const matchHoraStr = formatMatchTime(match.fecha)
    const competenciaLabel = COMPETENCIA_LABELS[match.competencia] ?? match.competencia
    const rivalColor = getRivalColor(match)
    const rivalEscudoUrl = match.escudoRival?.url ?? null
    const rivalCode = match.codigoRival ?? match.rival.substring(0, 3).toUpperCase()
    const countdown = useCountdown(matchDate)
    const rows = tabsData[activeTab]

    // Filas compactas: máx 6, pero siempre incluye Talleres
    const catRow = rows.find(r => r.isCAT)
    const topRows = rows.filter(r => !r.isCAT).slice(0, 5)
    const compactRows = catRow && !topRows.find(r => r.isCAT)
        ? [...topRows.slice(0, 4), catRow].sort((a, b) => a.pos - b.pos)
        : topRows.slice(0, 6)

    const tabStyle = (active: boolean): React.CSSProperties => ({
        flex: 1, padding: '7px 2px',
        fontFamily: 'var(--font-display)', fontSize: 9, fontWeight: 700,
        letterSpacing: 0.8, textTransform: 'uppercase', cursor: 'pointer',
        border: 'none',
        borderBottom: active ? '2px solid #FF6B00' : '2px solid transparent',
        background: active ? 'rgba(255,107,0,0.08)' : 'transparent',
        color: active ? '#ffffff' : '#7A94B0', transition: 'all .2s',
    })

    return (
        <>
            {showTable && <FullTableModal tab={activeTab} onClose={() => setShowTable(false)} />}
            {showFixture && <FixtureModal onClose={() => setShowFixture(false)} fixture={fixture} />}

            <aside style={{
                background: '#080F1D',
                borderLeft: '1px solid #1A2D45',
                width: '100%',
                minHeight: '100%',
            }}>

                {/* ─── Tabla de Posiciones ─── */}
                <div style={{ borderBottom: '1px solid #1A2D45' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#001030', borderLeft: '3px solid #FF6B00' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: 'white' }}>📊 Posiciones</h3>
                        <button onClick={() => setShowTable(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF6B00', fontSize: 10, padding: 0, fontFamily: 'var(--font-body)', transition: 'opacity .2s' }}
                            onMouseOver={e => e.currentTarget.style.opacity = '0.7'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                            Ver Completas →
                        </button>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid #1A2D45' }}>
                        {(['A', 'B', 'Anual', 'Promedios'] as Tab[]).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(activeTab === tab)}>
                                {tab === 'A' || tab === 'B' ? `Z.${tab}` : tab === 'Anual' ? 'Anual' : 'Prom.'}
                            </button>
                        ))}
                    </div>

                    {/* Tabla compacta */}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#060E1A' }}>
                                {['#', 'Equipo', 'PJ', 'PTS', activeTab === 'Promedios' ? 'PROM' : 'DIF'].map(h => (
                                    <th key={h} style={{ fontFamily: 'var(--font-display)', fontSize: 8, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: '#FF6B00', padding: '6px 7px', textAlign: 'left' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {compactRows.map(row => (
                                <tr key={row.pos} style={{ background: row.isCAT ? 'rgba(0,48,135,0.3)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: row.isCAT ? '3px solid #FF6B00' : '3px solid transparent' }}>
                                    <td style={{ padding: '6px 7px', fontSize: 10, color: '#7A94B0', fontWeight: 600, width: 20 }}>{row.pos}</td>
                                    <td style={{ padding: '6px 7px', fontSize: 10, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: row.isCAT ? 700 : 400, color: row.isCAT ? '#fff' : '#C8D8EC' }}>{row.equipo}</td>
                                    <td style={{ padding: '6px 7px', fontSize: 10, color: '#C8D8EC' }}>{row.pj}</td>
                                    <td style={{ padding: '6px 7px', fontSize: 10, color: '#fff', fontWeight: 700 }}>{row.pts}</td>
                                    <td style={{ padding: '6px 7px', fontSize: 10, fontWeight: 600, color: row.dif.startsWith('+') ? '#22c55e' : row.dif.startsWith('-') ? '#ef4444' : '#C8D8EC' }}>{row.dif}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button onClick={() => setShowTable(true)} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '8px', fontSize: 10, color: '#FF6B00', borderTop: '1px solid #1A2D45', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'background .2s' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,107,0,0.06)'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
                        Ver tabla completa →
                    </button>
                </div>

                {/* ─── Próximo Partido ─── */}
                <div style={{ padding: '14px 12px', background: 'linear-gradient(to bottom, #050D1A, #081525)' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#FF6B00', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        🗓 Próximo Partido
                        <span style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #FF6B00, transparent)' }} />
                    </h3>

                    {/* Competencia */}
                    <p style={{ textAlign: 'center', fontSize: 9, color: '#7A94B0', fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
                        {competenciaLabel} 2026
                    </p>

                    {/* Equipos */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                        {/* Local */}
                        {match.condicion === 'local' ? (
                            <div style={{ textAlign: 'center', flex: 1 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#001030', border: '2px solid #003087', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 3 }}>
                                    <Image src="/images/escudo.png" alt="Talleres" width={30} height={30} />
                                </div>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'white' }}>CAT</p>
                                <p style={{ fontSize: 8, color: '#7A94B0', marginTop: 1 }}>Local</p>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', flex: 1 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: rivalColor, border: `2px solid ${rivalColor}`, margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: rivalEscudoUrl ? 3 : 0 }}>
                                    {rivalEscudoUrl
                                        ? <img src={rivalEscudoUrl} alt={match.rival} style={{ width: 30, height: 30, objectFit: 'contain' }} />
                                        : <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 900, color: 'white' }}>{rivalCode}</span>
                                    }
                                </div>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'white' }}>{rivalCode}</p>
                                <p style={{ fontSize: 8, color: '#7A94B0', marginTop: 1 }}>{match.rival}</p>
                            </div>
                        )}

                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: '#FF6B00', flexShrink: 0 }}>VS</div>

                        {/* Visitante */}
                        {match.condicion === 'visitante' ? (
                            <div style={{ textAlign: 'center', flex: 1 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#001030', border: '2px solid #003087', margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 3 }}>
                                    <Image src="/images/escudo.png" alt="Talleres" width={30} height={30} />
                                </div>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'white' }}>CAT</p>
                                <p style={{ fontSize: 8, color: '#7A94B0', marginTop: 1 }}>Visitante</p>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', flex: 1 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: rivalColor, border: `2px solid ${rivalColor}`, margin: '0 auto 5px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: rivalEscudoUrl ? 3 : 0 }}>
                                    {rivalEscudoUrl
                                        ? <img src={rivalEscudoUrl} alt={match.rival} style={{ width: 30, height: 30, objectFit: 'contain' }} />
                                        : <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 900, color: 'white' }}>{rivalCode}</span>
                                    }
                                </div>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'white' }}>{rivalCode}</p>
                                <p style={{ fontSize: 8, color: '#7A94B0', marginTop: 1 }}>{match.rival}</p>
                            </div>
                        )}
                    </div>

                    <p style={{ textAlign: 'center', marginTop: 8, color: '#7A94B0', fontSize: 9 }}>
                        {matchFechaStr} · {matchHoraStr} hs · {match.estadio ?? 'Mario A. Kempes, Córdoba'}
                    </p>

                    {/* Countdown */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
                        {[{ val: countdown.d, label: 'Días' }, { val: countdown.h, label: 'Hrs' }, { val: countdown.m, label: 'Min' }, { val: countdown.s, label: 'Seg' }].map(({ val, label }) => (
                            <div key={label} style={{ textAlign: 'center' }}>
                                <span style={{ display: 'block', background: '#001030', border: '1px solid #003087', borderRadius: 3, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 900, color: '#FF6B00', padding: '3px 6px', minWidth: 28 }}>{val}</span>
                                <span style={{ display: 'block', fontSize: 7, color: '#7A94B0', textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 }}>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Botón Fixture — abre modal */}
                    <button onClick={() => setShowFixture(true)} style={{
                        display: 'block', width: '100%', marginTop: 12,
                        background: '#003087', color: 'white', border: 'none', padding: '9px',
                        borderRadius: 6, fontSize: 11, fontFamily: 'var(--font-display)',
                        fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'background .2s',
                    }}
                        onMouseOver={e => e.currentTarget.style.background = '#0044BB'}
                        onMouseOut={e => e.currentTarget.style.background = '#003087'}
                    >
                        Ver Fixture Completo →
                    </button>
                </div>

            </aside>
        </>
    )
}
