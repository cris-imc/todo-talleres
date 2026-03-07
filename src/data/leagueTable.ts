/**
 * TABLA DE POSICIONES
 * ════════════════════════════════════════════════════════════════
 * Editá este archivo para actualizar las posiciones en el sidebar.
 * Cuando conectemos una API oficial de fútbol, este archivo
 * será reemplazado por datos automáticos.
 * ════════════════════════════════════════════════════════════════
 */

export interface EquipoTabla {
    nombre: string
    pj: number   // Partidos jugados
    pts: number  // Puntos
    dif: number  // Diferencia de goles
    esTalleres?: boolean  // Siempre visible en la versión compacta del sidebar
}

// ── ZONA A ──────────────────────────────────────────────────────
export const zonaA: EquipoTabla[] = [
    { nombre: 'River Plate', pj: 12, pts: 26, dif: +14 },
    { nombre: 'Talleres', pj: 12, pts: 24, dif: +10, esTalleres: true },
    { nombre: 'Boca Juniors', pj: 12, pts: 21, dif: +5 },
    { nombre: 'Independiente', pj: 12, pts: 19, dif: +3 },
    { nombre: 'Racing Club', pj: 12, pts: 17, dif: +1 },
    { nombre: 'San Lorenzo', pj: 12, pts: 15, dif: -2 },
    { nombre: 'Huracán', pj: 12, pts: 14, dif: -3 },
    { nombre: 'Vélez', pj: 12, pts: 12, dif: -5 },
    { nombre: 'Rosario C.', pj: 12, pts: 10, dif: -8 },
    { nombre: 'Estudiantes', pj: 12, pts: 9, dif: -15 },
]

// ── ZONA B ──────────────────────────────────────────────────────
export const zonaB: EquipoTabla[] = [
    { nombre: 'Atlético TUC.', pj: 12, pts: 24, dif: +9 },
    { nombre: 'Belgrano', pj: 12, pts: 22, dif: +6 },
    { nombre: 'Lanús', pj: 12, pts: 20, dif: +4 },
    { nombre: 'Platense', pj: 12, pts: 18, dif: +2 },
    { nombre: 'Defensa', pj: 12, pts: 16, dif: 0 },
    { nombre: 'Tigre', pj: 12, pts: 14, dif: -1 },
    { nombre: 'Unión SF', pj: 12, pts: 12, dif: -4 },
    { nombre: 'Newells', pj: 12, pts: 11, dif: -6 },
    { nombre: 'Central C.', pj: 12, pts: 9, dif: -10 },
    { nombre: 'Arsenal', pj: 12, pts: 7, dif: -14 },
]

// ── TABLA ANUAL (acumulada) ─────────────────────────────────────
export const anual: EquipoTabla[] = [
    { nombre: 'River Plate', pj: 28, pts: 58, dif: +32 },
    { nombre: 'Talleres', pj: 28, pts: 54, dif: +22, esTalleres: true },
    { nombre: 'Racing Club', pj: 28, pts: 50, dif: +18 },
    { nombre: 'Boca Juniors', pj: 28, pts: 47, dif: +12 },
    { nombre: 'Independiente', pj: 28, pts: 44, dif: +9 },
    { nombre: 'Belgrano', pj: 28, pts: 41, dif: +5 },
    { nombre: 'San Lorenzo', pj: 28, pts: 38, dif: -2 },
    { nombre: 'Huracán', pj: 28, pts: 35, dif: -5 },
    { nombre: 'Lanús', pj: 28, pts: 33, dif: -7 },
    { nombre: 'Defensa', pj: 28, pts: 30, dif: -12 },
]

// ── TABLA DE PROMEDIOS ─────────────────────────────────────────
export const promedios: EquipoTabla[] = [
    { nombre: 'River Plate', pj: 114, pts: 185, dif: 1.62 },
    { nombre: 'Talleres', pj: 114, pts: 178, dif: 1.56, esTalleres: true },
    { nombre: 'Racing Club', pj: 114, pts: 172, dif: 1.51 },
    { nombre: 'Boca Juniors', pj: 114, pts: 168, dif: 1.47 },
    { nombre: 'Independiente', pj: 114, pts: 161, dif: 1.41 },
    { nombre: 'Belgrano', pj: 114, pts: 155, dif: 1.36 },
    { nombre: 'San Lorenzo', pj: 114, pts: 149, dif: 1.31 },
    { nombre: 'Huracán', pj: 114, pts: 143, dif: 1.25 },
    { nombre: 'Lanús', pj: 114, pts: 137, dif: 1.20 },
    { nombre: 'Defensa', pj: 114, pts: 130, dif: 1.14 },
]
