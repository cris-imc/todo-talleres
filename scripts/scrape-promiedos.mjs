#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 * SCRAPER — Promiedos.com.ar → leagueTable.ts
 * ═══════════════════════════════════════════════════════════════════
 * Uso:  npm run scrape
 * ═══════════════════════════════════════════════════════════════════
 */

import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'src', 'data', 'leagueTable.ts')
const URL = 'https://www.promiedos.com.ar/league/liga-profesional/hc'

async function main() {
    console.log('🔄  Abriendo Promiedos…')
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    try {
        await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 })
        await page.waitForTimeout(6000)
        console.log('✅  Página cargada.')

        // ── Paso 1: Mapear todas las tablas con su contexto ───────────────────
        const tableInfo = await page.evaluate(() => {
            const tables = Array.from(document.querySelectorAll('table'))
            return tables.map((t, idx) => {
                // Obtener hasta 500 chars del texto de la tabla
                const text = t.innerText?.replace(/\n/g, ' ')?.substring(0, 300) || ''
                // Intentar obtener el encabezado de sección del contenedor padre
                let sectionHeader = ''
                let el = t.parentElement
                for (let depth = 0; depth < 10 && el; depth++) {
                    // Buscar hermano anterior con texto de sección
                    let prev = el.previousElementSibling
                    while (prev && !sectionHeader) {
                        const txt = prev.innerText?.toUpperCase()?.trim() || ''
                        if (/^ZONA A/.test(txt)) sectionHeader = 'ZONA A'
                        else if (/^ZONA B/.test(txt)) sectionHeader = 'ZONA B'
                        else if (/TABLA ANUAL/.test(txt)) sectionHeader = 'TABLA ANUAL'
                        else if (/PROMEDIOS/.test(txt)) sectionHeader = 'PROMEDIOS'
                        if (sectionHeader) break
                        prev = prev.previousElementSibling
                    }
                    if (sectionHeader) break
                    // También revisar el texto del propio contenedor
                    const parentTxt = (el.className || '') + (el.id || '')
                    el = el.parentElement
                }
                const rowCount = t.querySelectorAll('tr').length
                return { idx, rowCount, sectionHeader, preview: text.substring(0, 150) }
            })
        })

        // Guardar mapeo para debug
        fs.writeFileSync(
            path.join(ROOT, 'scripts', '_tables_map.json'),
            JSON.stringify(tableInfo, null, 2), 'utf-8'
        )

        console.log('📋  Tablas encontradas:')
        tableInfo.forEach(t => console.log(`   [${t.idx}] rows:${t.rowCount} section:"${t.sectionHeader}" preview:${t.preview.substring(0, 60)}`))

        // ── Paso 2: Asignar tablas por sección header o por heurística ───────
        // Si la detección por header falló, usamos posición ordinal:
        // Proyección típica de Promiedos:  tabla0=ZonaA, tabla1=ZonaB, tabla2=Promedios, tabla3=Anual
        // Pero puede variar. Usamos rowCount > 20 para detectar las de 30 equipos.

        let idxZonaA = -1, idxZonaB = -1, idxAnual = -1, idxPromedios = -1

        // Primero intentar por header detectado
        for (const t of tableInfo) {
            if (t.sectionHeader === 'ZONA A' && idxZonaA < 0) idxZonaA = t.idx
            if (t.sectionHeader === 'ZONA B' && idxZonaB < 0) idxZonaB = t.idx
            if (t.sectionHeader === 'TABLA ANUAL' && idxAnual < 0) idxAnual = t.idx
            if (t.sectionHeader === 'PROMEDIOS' && idxPromedios < 0) idxPromedios = t.idx
        }

        // Fallback: buscar por rowCount y posición
        if (idxZonaA < 0 && tableInfo.length > 0) idxZonaA = tableInfo[0].idx
        if (idxZonaB < 0 && tableInfo.length > 1) idxZonaB = tableInfo[1].idx

        // Tablas con 30 filas son anual/promedios
        const bigTables = tableInfo.filter(t => t.rowCount >= 28)
        if (bigTables.length >= 2 && idxAnual < 0) {
            // Primera tabla grande que no sea Zona A/B
            for (const t of bigTables) {
                if (t.idx !== idxZonaA && t.idx !== idxZonaB) {
                    if (idxPromedios < 0) idxPromedios = t.idx
                    else if (idxAnual < 0) idxAnual = t.idx
                }
            }
        }
        if (bigTables.length === 1 && idxAnual < 0 && idxPromedios < 0) {
            // Solo una tabla grande: puede ser anual
            const big = bigTables[0]
            if (big.preview.includes('.')) idxPromedios = big.idx
            else idxAnual = big.idx
        }

        // Si todavía no encontramos, usar índices 2 y 3
        if (idxPromedios < 0 && tableInfo.length > 2) idxPromedios = tableInfo[2].idx
        if (idxAnual < 0 && tableInfo.length > 3) idxAnual = tableInfo[3].idx

        console.log(`\n🗺  Asignaciones: ZonaA=${idxZonaA} ZonaB=${idxZonaB} Promedios=${idxPromedios} Anual=${idxAnual}`)

        // ── Paso 3: Extraer datos de cada tabla ───────────────────────────────
        const data = await page.evaluate(({ idxZonaA, idxZonaB, idxAnual, idxPromedios }) => {
            const tables = Array.from(document.querySelectorAll('table'))

            function extractRows(table, isPromedios) {
                if (!table) return []
                const rows = []
                Array.from(table.querySelectorAll('tr')).forEach(row => {
                    const cells = Array.from(row.querySelectorAll('td'))
                        .map(c => c.innerText.replace(/\n/g, ' ').trim())
                    if (cells.length < 3) return
                    const pos = parseInt(cells[0])
                    if (isNaN(pos)) return
                    const nombre = cells[1]?.replace(/\s+/g, ' ').trim()
                    if (!nombre) return

                    if (isPromedios) {
                        // cols: pos | nombre | prom_coef | pts_total | pj_total | ...
                        const coef = parseFloat(cells[2])
                        const pts = parseInt(cells[3]) || 0
                        const pj = parseInt(cells[4]) || 0
                        if (!isNaN(coef)) {
                            rows.push({ pos, nombre, pj, pts, dif: coef, esTalleres: /talleres/i.test(nombre) })
                        }
                    } else {
                        // cols: pos | nombre | pts | j | goles | +/- | G | E | P
                        const pts = parseInt(cells[2])
                        const pj = parseInt(cells[3])
                        const dif = parseInt(cells[5])
                        if (!isNaN(pts)) {
                            rows.push({ pos, nombre, pj: isNaN(pj) ? 0 : pj, pts, dif: isNaN(dif) ? 0 : dif, esTalleres: /talleres/i.test(nombre) })
                        }
                    }
                })
                return rows
            }

            return {
                zonaA: extractRows(tables[idxZonaA], false),
                zonaB: extractRows(tables[idxZonaB], false),
                anual: idxAnual >= 0 ? extractRows(tables[idxAnual], false) : [],
                promedios: idxPromedios >= 0 ? extractRows(tables[idxPromedios], true) : [],
            }
        }, { idxZonaA, idxZonaB, idxAnual, idxPromedios })

        // ── Paso 4: Fixture de Talleres (próximos partidos) ───────────────────
        const fixture = await page.evaluate(() => {
            const result = []
            const allText = document.body.innerText
            const lines = allText.split('\n').map(l => l.trim()).filter(Boolean)

            let inFecha = false
            let fechaLabel = ''
            let fechaDia = ''
            let hora = ''
            let prevLine = ''

            const FECHA_RE = /^FECHA\s+(\d+)/i
            const DIA_RE = /^(Lun|Mar|Mié|Jue|Vie|Sáb|Dom)\s+\d+\/\d+/i
            const HORA_RE = /^\d{1,2}:\d{2}$/
            const EQUIPO_RE = /^[A-ZÁÉÍÓÚÑ][a-záéíóúüñ\s.()]+/

            for (let i = 0; i < lines.length; i++) {
                const l = lines[i]
                if (FECHA_RE.test(l)) { inFecha = true; fechaLabel = l; fechaDia = ''; hora = ''; continue }
                if (!inFecha) { prevLine = l; continue }
                if (DIA_RE.test(l)) { fechaDia = l; continue }
                if (HORA_RE.test(l)) { hora = l; continue }

                // Partido: dos equipos separados por " - "
                if (l.includes(' - ') && /talleres/i.test(l)) {
                    const [local, visitante] = l.split(' - ').map(s => s.trim())
                    result.push({ fecha: `${fechaLabel} ${fechaDia}`.trim(), hora, local, visitante })
                }
                prevLine = l
            }
            return result
        })

        // Guardar JSON debug
        fs.writeFileSync(
            path.join(ROOT, 'scripts', '_promiedos_parsed.json'),
            JSON.stringify({ ...data, fixture }, null, 2), 'utf-8'
        )

        // ── Log resultados ────────────────────────────────────────────────────
        console.log(`\n📊  Zona A:     ${data.zonaA.length} equipos`)
        console.log(`📊  Zona B:     ${data.zonaB.length} equipos`)
        console.log(`📊  Anual:      ${data.anual.length} equipos`)
        console.log(`📊  Promedios:  ${data.promedios.length} equipos`)

        const catZA = data.zonaA.find(e => e.esTalleres)
        const catAn = data.anual.find(e => e.esTalleres)
        const catPr = data.promedios.find(e => e.esTalleres)
        if (catZA) console.log(`🏟  Talleres Z.A: pos ${catZA.pos} | ${catZA.pts} pts | dif ${catZA.dif}`)
        if (catAn) console.log(`🏟  Talleres Anual: pos ${catAn.pos} | ${catAn.pts} pts`)
        if (catPr) console.log(`🏟  Talleres Prom.: pos ${catPr.pos} | coef ${catPr.dif}`)

        if (fixture.length) {
            console.log('\n📅  Próximos de Talleres:')
            fixture.forEach((f, i) => console.log(`   ${i + 1}. ${f.fecha} ${f.hora}  ${f.local} vs ${f.visitante}`))
        }

        if (data.zonaA.length === 0) {
            console.error('\n❌  Zona A vacía — revisá scripts/_promiedos_parsed.json')
            process.exit(1)
        }

        // ── Generar leagueTable.ts ────────────────────────────────────────────
        const now = new Date().toLocaleDateString('es-AR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        })

        const arrayTs = (name, rows) => {
            if (!rows?.length) return `// Sin datos para ${name}\nexport const ${name}: EquipoTabla[] = []\n`
            const body = rows.map(r => {
                const flag = r.esTalleres ? ', esTalleres: true' : ''
                const nombre = r.nombre.replace(/'/g, "\\'")
                return `    { nombre: '${nombre}', pj: ${r.pj}, pts: ${r.pts}, dif: ${r.dif}${flag} },`
            }).join('\n')
            return `export const ${name}: EquipoTabla[] = [\n${body}\n]\n`
        }

        const ts = `/**
 * TABLA DE POSICIONES — Liga Profesional 2026
 * ════════════════════════════════════════════════════════════════
 * Datos actualizados automáticamente desde promiedos.com.ar
 * Última actualización: ${now}
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
${arrayTs('zonaA', data.zonaA)}
// ── ZONA B ──────────────────────────────────────────────────────
${arrayTs('zonaB', data.zonaB)}
// ── TABLA ANUAL (acumulada, ${data.anual.length} equipos) ─────────────────────
${arrayTs('anual', data.anual)}
// ── TABLA DE PROMEDIOS (coeficiente en "dif", ${data.promedios.length} equipos) ──
${arrayTs('promedios', data.promedios)}
`
        fs.writeFileSync(OUTPUT, ts, 'utf-8')
        console.log(`\n📝  Escrito: ${OUTPUT}`)
        console.log('🏁  ¡Listo! Reiniciá el dev server si estaba corriendo.')
    } finally {
        await browser.close()
    }
}

main().catch(err => {
    console.error('❌  Error:', err.message)
    process.exit(1)
})
