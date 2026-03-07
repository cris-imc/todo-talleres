/**
 * Tipos y utilidades compartidas entre Server y Client components.
 * NO importar Payload, fs, ni nada de Node.js desde acá.
 */

// ── Tipo de Partido del CMS ──────────────────────────────────────────────────
export interface CMSPartido {
    id: string | number
    rival: string
    condicion: 'local' | 'visitante'
    fecha: string          // ISO date string
    competencia: 'liga' | 'copa' | 'libertadores' | 'sudamericana' | 'amistoso'
    estadio?: string
    estado: 'proximo' | 'en_juego' | 'finalizado'
    golesTalleres?: number
    golesRival?: number
    codigoRival?: string
    colorRival?: string
    escudoRival?: { url: string } | null
}

// ── Colores por defecto para equipos argentinos ──────────────────────────────
// Si el admin no pone color manualmente, usamos este mapa.
const TEAM_COLORS: Record<string, string> = {
    'Huracán': '#FF0000',
    'Racing Club': '#7CB5E0',
    'Boca Juniors': '#003DA5',
    'River Plate': '#CC0000',
    'Independiente': '#FF0000',
    'San Lorenzo': '#1A237E',
    'Vélez': '#005BAC',
    'Belgrano': '#2196F3',
    'Lanús': '#8B0000',
    'Platense': '#6D4C41',
    'Defensa': '#2E7D32',
    'Tigre': '#005BAC',
    'Estudiantes': '#CC0000',
    "Newell's": '#FF0000',
    'Rosario C.': '#FFEB3B',
    'Colón': '#FF0000',
    'Arsenal': '#1565C0',
    'Banfield': '#388E3C',
    'Godoy Cruz': '#004D40',
    'Atlético TUC.': '#2196F3',
    'Unión SF': '#CC0000',
    'Central C.': '#FFEB3B',
    'Sarmiento': '#1B5E20',
}

/**
 * Devuelve el color del rival.
 * Prioridad: colorRival del CMS > mapa hardcodeado > gris por defecto
 */
export function getRivalColor(match: CMSPartido): string {
    if (match.colorRival) return match.colorRival
    return TEAM_COLORS[match.rival] ?? '#4A5568'
}

// ── Labels de competencia ────────────────────────────────────────────────────
export const COMPETENCIA_LABELS: Record<string, string> = {
    liga: 'Liga Profesional',
    copa: 'Copa Argentina',
    libertadores: 'Copa Libertadores',
    sudamericana: 'Copa Sudamericana',
    amistoso: 'Amistoso',
}

// ── Formateo de fechas ───────────────────────────────────────────────────────

/** Formatea un ISO date string a "Dom 15 Mar" */
export function formatMatchDate(isoDate: string): string {
    const d = new Date(isoDate)
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`
}

/** Formatea hora a "18:00" */
export function formatMatchTime(isoDate: string): string {
    const d = new Date(isoDate)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
