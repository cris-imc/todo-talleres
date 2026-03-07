/**
 * TABLA DE POSICIONES — Liga Profesional 2026
 * ════════════════════════════════════════════════════════════════
 * Datos actualizados automáticamente desde promiedos.com.ar
 * Última actualización: sábado, 7 de marzo de 2026, 05:15 a. m.
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
    { nombre: 'Vélez', pj: 8, pts: 18, dif: 5 },
    { nombre: 'Estudiantes', pj: 8, pts: 15, dif: 4 },
    { nombre: 'Unión', pj: 8, pts: 14, dif: 6 },
    { nombre: 'Independiente', pj: 8, pts: 13, dif: 4 },
    { nombre: 'Platense', pj: 8, pts: 13, dif: 2 },
    { nombre: 'Boca Jrs.', pj: 8, pts: 12, dif: 4 },
    { nombre: 'Defensa', pj: 8, pts: 12, dif: 2 },
    { nombre: 'San Lorenzo', pj: 8, pts: 12, dif: 2 },
    { nombre: 'Talleres', pj: 8, pts: 11, dif: -1, esTalleres: true },
    { nombre: 'Lanús', pj: 7, pts: 9, dif: -3 },
    { nombre: 'Instituto', pj: 8, pts: 8, dif: -1 },
    { nombre: 'Central Córdoba', pj: 8, pts: 8, dif: -3 },
    { nombre: 'Gimnasia (M)', pj: 8, pts: 8, dif: -5 },
    { nombre: 'Riestra', pj: 8, pts: 5, dif: -3 },
    { nombre: 'Newell\'s', pj: 8, pts: 2, dif: -11 },
]

// ── ZONA B ──────────────────────────────────────────────────────
export const zonaB: EquipoTabla[] = [
    { nombre: 'Ind. Rivadavia', pj: 8, pts: 17, dif: 4 },
    { nombre: 'Tigre', pj: 8, pts: 15, dif: 7 },
    { nombre: 'Belgrano', pj: 8, pts: 15, dif: 3 },
    { nombre: 'Central', pj: 8, pts: 14, dif: 4 },
    { nombre: 'Huracán', pj: 8, pts: 12, dif: 1 },
    { nombre: 'Racing', pj: 8, pts: 11, dif: 2 },
    { nombre: 'River', pj: 8, pts: 11, dif: 0 },
    { nombre: 'Gimnasia', pj: 8, pts: 11, dif: -1 },
    { nombre: 'Banfield', pj: 8, pts: 10, dif: 0 },
    { nombre: 'Argentinos', pj: 6, pts: 9, dif: 1 },
    { nombre: 'Barracas', pj: 8, pts: 9, dif: -1 },
    { nombre: 'Sarmiento', pj: 8, pts: 9, dif: -3 },
    { nombre: 'Atl. Tucumán', pj: 8, pts: 5, dif: -4 },
    { nombre: 'Estudiantes RC', pj: 8, pts: 4, dif: -9 },
    { nombre: 'Aldosivi', pj: 7, pts: 3, dif: -6 },
]

// ── TABLA ANUAL (acumulada, 30 equipos) ─────────────────────
export const anual: EquipoTabla[] = [
    { nombre: 'Vélez', pj: 8, pts: 18, dif: 5 },
    { nombre: 'Ind. Rivadavia', pj: 8, pts: 17, dif: 4 },
    { nombre: 'Tigre', pj: 8, pts: 15, dif: 7 },
    { nombre: 'Estudiantes', pj: 8, pts: 15, dif: 4 },
    { nombre: 'Belgrano', pj: 8, pts: 15, dif: 3 },
    { nombre: 'Unión', pj: 8, pts: 14, dif: 6 },
    { nombre: 'Central', pj: 8, pts: 14, dif: 4 },
    { nombre: 'Independiente', pj: 8, pts: 13, dif: 4 },
    { nombre: 'Platense', pj: 8, pts: 13, dif: 2 },
    { nombre: 'Boca Jrs.', pj: 8, pts: 12, dif: 4 },
    { nombre: 'San Lorenzo', pj: 8, pts: 12, dif: 2 },
    { nombre: 'Defensa', pj: 8, pts: 12, dif: 2 },
    { nombre: 'Huracán', pj: 8, pts: 12, dif: 1 },
    { nombre: 'Racing', pj: 8, pts: 11, dif: 2 },
    { nombre: 'River', pj: 8, pts: 11, dif: 0 },
    { nombre: 'Gimnasia', pj: 8, pts: 11, dif: -1 },
    { nombre: 'Talleres', pj: 8, pts: 11, dif: -1, esTalleres: true },
    { nombre: 'Banfield', pj: 8, pts: 10, dif: 0 },
    { nombre: 'Argentinos', pj: 6, pts: 9, dif: 1 },
    { nombre: 'Barracas', pj: 8, pts: 9, dif: -1 },
    { nombre: 'Lanús', pj: 7, pts: 9, dif: -3 },
    { nombre: 'Sarmiento', pj: 8, pts: 9, dif: -3 },
    { nombre: 'Instituto', pj: 8, pts: 8, dif: -1 },
    { nombre: 'Central Córdoba', pj: 8, pts: 8, dif: -3 },
    { nombre: 'Gimnasia (M)', pj: 8, pts: 8, dif: -5 },
    { nombre: 'Riestra', pj: 8, pts: 5, dif: -3 },
    { nombre: 'Atl. Tucumán', pj: 8, pts: 5, dif: -4 },
    { nombre: 'Estudiantes RC', pj: 8, pts: 4, dif: -9 },
    { nombre: 'Aldosivi', pj: 7, pts: 3, dif: -6 },
    { nombre: 'Newell\'s', pj: 8, pts: 2, dif: -11 },
]

// ── TABLA DE PROMEDIOS (coeficiente en "dif", 30 equipos) ──
export const promedios: EquipoTabla[] = [
    { nombre: 'Boca Jrs.', pj: 81, pts: 141, dif: 1.741 },
    { nombre: 'Vélez', pj: 81, pts: 134, dif: 1.654 },
    { nombre: 'Racing', pj: 81, pts: 134, dif: 1.654 },
    { nombre: 'River', pj: 81, pts: 134, dif: 1.654 },
    { nombre: 'Central', pj: 81, pts: 127, dif: 1.568 },
    { nombre: 'Argentinos', pj: 79, pts: 122, dif: 1.544 },
    { nombre: 'Independiente', pj: 81, pts: 123, dif: 1.519 },
    { nombre: 'Huracán', pj: 81, pts: 121, dif: 1.494 },
    { nombre: 'Estudiantes', pj: 81, pts: 120, dif: 1.481 },
    { nombre: 'Lanús', pj: 80, pts: 118, dif: 1.475 },
    { nombre: 'Talleres', pj: 81, pts: 117, dif: 1.444, esTalleres: true },
    { nombre: 'Unión', pj: 81, pts: 113, dif: 1.395 },
    { nombre: 'San Lorenzo', pj: 81, pts: 108, dif: 1.333 },
    { nombre: 'Defensa', pj: 81, pts: 108, dif: 1.333 },
    { nombre: 'Barracas', pj: 81, pts: 107, dif: 1.321 },
    { nombre: 'Ind. Rivadavia', pj: 81, pts: 106, dif: 1.309 },
    { nombre: 'Platense', pj: 81, pts: 105, dif: 1.296 },
    { nombre: 'Riestra', pj: 81, pts: 105, dif: 1.296 },
    { nombre: 'Tigre', pj: 81, pts: 103, dif: 1.272 },
    { nombre: 'Belgrano', pj: 81, pts: 101, dif: 1.247 },
    { nombre: 'Gimnasia', pj: 81, pts: 97, dif: 1.198 },
    { nombre: 'Instituto', pj: 81, pts: 95, dif: 1.173 },
    { nombre: 'Central Córdoba', pj: 81, pts: 92, dif: 1.136 },
    { nombre: 'Atl. Tucumán', pj: 81, pts: 89, dif: 1.099 },
    { nombre: 'Banfield', pj: 81, pts: 86, dif: 1.062 },
    { nombre: 'Newell\'s', pj: 81, pts: 84, dif: 1.037 },
    { nombre: 'Gimnasia (M)', pj: 8, pts: 8, dif: 1 },
    { nombre: 'Sarmiento', pj: 81, pts: 79, dif: 0.975 },
    { nombre: 'Aldosivi', pj: 39, pts: 36, dif: 0.923 },
    { nombre: 'Estudiantes RC', pj: 8, pts: 4, dif: 0.5 },
]

