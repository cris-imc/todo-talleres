/**
 * TABLA DE POSICIONES — Liga Profesional 2026
 * ════════════════════════════════════════════════════════════════
 * Datos actualizados automáticamente desde promiedos.com.ar
 * Última actualización: sábado, 14 de marzo de 2026, 03:53 a. m.
 * Script: npm run scrape
 * ════════════════════════════════════════════════════════════════
 */

export interface EquipoTabla {
    nombre: string
    pj: number   // Partidos jugados
    pts: number  // Puntos
    dif: number  // Diferencia de goles (o coeficiente en promedios)
    esTalleres?: boolean  // Siempre visible en la versión compacta del sidebar
}

// ── ZONA A ──────────────────────────────────────────────────────
export const zonaA: EquipoTabla[] = [
    { nombre: 'Vélez', pj: 9, pts: 19, dif: 5 },
    { nombre: 'Unión', pj: 9, pts: 15, dif: 6 },
    { nombre: 'Estudiantes', pj: 9, pts: 15, dif: 3 },
    { nombre: 'Independiente', pj: 9, pts: 14, dif: 4 },
    { nombre: 'Platense', pj: 9, pts: 14, dif: 2 },
    { nombre: 'Talleres', pj: 9, pts: 14, dif: 1, esTalleres: true },
    { nombre: 'Boca Jrs.', pj: 9, pts: 13, dif: 4 },
    { nombre: 'Defensa', pj: 9, pts: 13, dif: 2 },
    { nombre: 'San Lorenzo', pj: 9, pts: 13, dif: 2 },
    { nombre: 'Lanús', pj: 8, pts: 12, dif: -2 },
    { nombre: 'Central Córdoba', pj: 9, pts: 9, dif: -3 },
    { nombre: 'Gimnasia (M)', pj: 9, pts: 9, dif: -5 },
    { nombre: 'Instituto', pj: 9, pts: 8, dif: -3 },
    { nombre: 'Riestra', pj: 9, pts: 6, dif: -3 },
    { nombre: 'Newell\'s', pj: 9, pts: 3, dif: -11 },
]

// ── ZONA B ──────────────────────────────────────────────────────
export const zonaB: EquipoTabla[] = [
    { nombre: 'Belgrano', pj: 9, pts: 18, dif: 4 },
    { nombre: 'Ind. Rivadavia', pj: 9, pts: 17, dif: 3 },
    { nombre: 'Tigre', pj: 9, pts: 16, dif: 7 },
    { nombre: 'Central', pj: 9, pts: 15, dif: 4 },
    { nombre: 'River', pj: 9, pts: 14, dif: 1 },
    { nombre: 'Gimnasia', pj: 9, pts: 14, dif: 0 },
    { nombre: 'Racing', pj: 9, pts: 12, dif: 2 },
    { nombre: 'Huracán', pj: 9, pts: 12, dif: 0 },
    { nombre: 'Barracas', pj: 9, pts: 12, dif: 0 },
    { nombre: 'Argentinos', pj: 7, pts: 10, dif: 1 },
    { nombre: 'Banfield', pj: 9, pts: 10, dif: -1 },
    { nombre: 'Sarmiento', pj: 9, pts: 10, dif: -3 },
    { nombre: 'Atl. Tucumán', pj: 9, pts: 6, dif: -4 },
    { nombre: 'Aldosivi', pj: 8, pts: 4, dif: -6 },
    { nombre: 'Estudiantes RC', pj: 9, pts: 4, dif: -10 },
]

// ── TABLA ANUAL (acumulada, 30 equipos) ─────────────────────
export const anual: EquipoTabla[] = [
    { nombre: 'Vélez', pj: 9, pts: 19, dif: 5 },
    { nombre: 'Belgrano', pj: 9, pts: 18, dif: 4 },
    { nombre: 'Ind. Rivadavia', pj: 9, pts: 17, dif: 3 },
    { nombre: 'Tigre', pj: 9, pts: 16, dif: 7 },
    { nombre: 'Unión', pj: 9, pts: 15, dif: 6 },
    { nombre: 'Central', pj: 9, pts: 15, dif: 4 },
    { nombre: 'Estudiantes', pj: 9, pts: 15, dif: 3 },
    { nombre: 'Independiente', pj: 9, pts: 14, dif: 4 },
    { nombre: 'Platense', pj: 9, pts: 14, dif: 2 },
    { nombre: 'Talleres', pj: 9, pts: 14, dif: 1, esTalleres: true },
    { nombre: 'River', pj: 9, pts: 14, dif: 1 },
    { nombre: 'Gimnasia', pj: 9, pts: 14, dif: 0 },
    { nombre: 'Boca Jrs.', pj: 9, pts: 13, dif: 4 },
    { nombre: 'San Lorenzo', pj: 9, pts: 13, dif: 2 },
    { nombre: 'Defensa', pj: 9, pts: 13, dif: 2 },
    { nombre: 'Racing', pj: 9, pts: 12, dif: 2 },
    { nombre: 'Huracán', pj: 9, pts: 12, dif: 0 },
    { nombre: 'Barracas', pj: 9, pts: 12, dif: 0 },
    { nombre: 'Lanús', pj: 8, pts: 12, dif: -2 },
    { nombre: 'Argentinos', pj: 7, pts: 10, dif: 1 },
    { nombre: 'Banfield', pj: 9, pts: 10, dif: -1 },
    { nombre: 'Sarmiento', pj: 9, pts: 10, dif: -3 },
    { nombre: 'Central Córdoba', pj: 9, pts: 9, dif: -3 },
    { nombre: 'Gimnasia (M)', pj: 9, pts: 9, dif: -5 },
    { nombre: 'Instituto', pj: 9, pts: 8, dif: -3 },
    { nombre: 'Riestra', pj: 9, pts: 6, dif: -3 },
    { nombre: 'Atl. Tucumán', pj: 9, pts: 6, dif: -4 },
    { nombre: 'Aldosivi', pj: 8, pts: 4, dif: -6 },
    { nombre: 'Estudiantes RC', pj: 9, pts: 4, dif: -10 },
    { nombre: 'Newell\'s', pj: 9, pts: 3, dif: -11 },
]

// ── TABLA DE PROMEDIOS (coeficiente en "dif", 30 equipos) ──
export const promedios: EquipoTabla[] = [
    { nombre: 'Boca Jrs.', pj: 82, pts: 142, dif: 1.732 },
    { nombre: 'River', pj: 82, pts: 137, dif: 1.671 },
    { nombre: 'Vélez', pj: 82, pts: 135, dif: 1.646 },
    { nombre: 'Racing', pj: 82, pts: 135, dif: 1.646 },
    { nombre: 'Central', pj: 82, pts: 128, dif: 1.561 },
    { nombre: 'Argentinos', pj: 80, pts: 123, dif: 1.538 },
    { nombre: 'Independiente', pj: 82, pts: 124, dif: 1.512 },
    { nombre: 'Lanús', pj: 81, pts: 121, dif: 1.494 },
    { nombre: 'Huracán', pj: 82, pts: 121, dif: 1.476 },
    { nombre: 'Estudiantes', pj: 82, pts: 120, dif: 1.463 },
    { nombre: 'Talleres', pj: 82, pts: 120, dif: 1.463, esTalleres: true },
    { nombre: 'Unión', pj: 82, pts: 114, dif: 1.39 },
    { nombre: 'Barracas', pj: 82, pts: 110, dif: 1.341 },
    { nombre: 'San Lorenzo', pj: 82, pts: 109, dif: 1.329 },
    { nombre: 'Defensa', pj: 82, pts: 109, dif: 1.329 },
    { nombre: 'Ind. Rivadavia', pj: 82, pts: 106, dif: 1.293 },
    { nombre: 'Platense', pj: 82, pts: 106, dif: 1.293 },
    { nombre: 'Riestra', pj: 82, pts: 106, dif: 1.293 },
    { nombre: 'Belgrano', pj: 82, pts: 104, dif: 1.268 },
    { nombre: 'Tigre', pj: 82, pts: 104, dif: 1.268 },
    { nombre: 'Gimnasia', pj: 82, pts: 100, dif: 1.22 },
    { nombre: 'Instituto', pj: 82, pts: 95, dif: 1.159 },
    { nombre: 'Central Córdoba', pj: 82, pts: 93, dif: 1.134 },
    { nombre: 'Atl. Tucumán', pj: 82, pts: 90, dif: 1.098 },
    { nombre: 'Banfield', pj: 82, pts: 86, dif: 1.049 },
    { nombre: 'Newell\'s', pj: 82, pts: 85, dif: 1.037 },
    { nombre: 'Gimnasia (M)', pj: 9, pts: 9, dif: 1 },
    { nombre: 'Sarmiento', pj: 82, pts: 80, dif: 0.976 },
    { nombre: 'Aldosivi', pj: 40, pts: 37, dif: 0.925 },
    { nombre: 'Estudiantes RC', pj: 9, pts: 4, dif: 0.444 },
]

