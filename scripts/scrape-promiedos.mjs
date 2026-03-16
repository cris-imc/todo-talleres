#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 * SCRAPER — Promiedos.com.ar → leagueTable.ts + partidos en CMS
 * ═══════════════════════════════════════════════════════════════════
 * Uso:  npm run scrape
 *
 *  1. Extrae las 4 tablas de posiciones → src/data/leagueTable.ts
 *  2. Extrae los próximos partidos de Talleres
 *     → los envía a http://localhost:3000/api/sync-partidos
 *     → la API los inserta en Payload CMS (colección "partidos")
 * ═══════════════════════════════════════════════════════════════════
 */

import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const OUTPUT_TS = path.join(ROOT, 'src', 'data', 'leagueTable.ts')
const OUTPUT_JSON = path.join(ROOT, 'src', 'data', 'leagueTable.json')

const TABLA_URL = 'https://www.promiedos.com.ar/league/liga-profesional/hc'
const FIXTURE_URL = 'https://www.promiedos.com.ar/team/talleres-cordoba/jche'
const SYNC_API = 'http://localhost:3000/api/sync-partidos'
const SCRAPE_KEY = 'talleres2026'   // debe coincidir con SCRAPE_SECRET en .env (o el default)

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function mapTables(page) {
    return page.evaluate(() => {
        const tables = Array.from(document.querySelectorAll('table'))
        return tables.map((t, idx) => {
            let sectionHeader = ''
            let el = t.parentElement
            for (let depth = 0; depth < 10 && el; depth++) {
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
                el = el.parentElement
            }
            return {
                idx, rowCount: t.querySelectorAll('tr').length, sectionHeader,
                preview: (t.innerText || '').replace(/\n/g, ' ').substring(0, 120)
            }
        })
    })
}

// ─── 1. Tablas de posiciones ─────────────────────────────────────────────────

async function scrapeTablas(browser) {
    console.log('\n📊  Extrayendo tablas de posiciones…')
    const page = await browser.newPage()
    await page.goto(TABLA_URL, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.waitForTimeout(6000)

    const tableInfo = await mapTables(page)
    fs.writeFileSync(path.join(ROOT, 'scripts', '_tables_map.json'), JSON.stringify(tableInfo, null, 2), 'utf-8')

    let idxZonaA = -1, idxZonaB = -1, idxAnual = -1, idxPromedios = -1
    for (const t of tableInfo) {
        if (t.sectionHeader === 'ZONA A' && idxZonaA < 0) idxZonaA = t.idx
        if (t.sectionHeader === 'ZONA B' && idxZonaB < 0) idxZonaB = t.idx
        if (t.sectionHeader === 'TABLA ANUAL' && idxAnual < 0) idxAnual = t.idx
        if (t.sectionHeader === 'PROMEDIOS' && idxPromedios < 0) idxPromedios = t.idx
    }
    if (idxZonaA < 0 && tableInfo.length > 0) idxZonaA = tableInfo[0].idx
    if (idxZonaB < 0 && tableInfo.length > 1) idxZonaB = tableInfo[1].idx
    const bigTables = tableInfo.filter(t => t.rowCount >= 28)
    for (const t of bigTables) {
        if (t.idx !== idxZonaA && t.idx !== idxZonaB) {
            if (idxPromedios < 0) idxPromedios = t.idx
            else if (idxAnual < 0) idxAnual = t.idx
        }
    }
    if (idxPromedios < 0 && tableInfo.length > 2) idxPromedios = tableInfo[2].idx
    if (idxAnual < 0 && tableInfo.length > 3) idxAnual = tableInfo[3].idx

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
                const nombreRaw = cells[1]?.replace(/\s+/g, ' ').trim()
                if (!nombreRaw) return
                // Limpiar marcador en vivo (ej: "Talleres 0-0" -> "Talleres")
                const nombre = nombreRaw.replace(/\s+\d+-\d+.*$/, '')
                if (isPromedios) {
                    const coef = parseFloat(cells[2])
                    const pts = parseInt(cells[3]) || 0
                    const pj = parseInt(cells[4]) || 0
                    if (!isNaN(coef)) rows.push({ pos, nombre, pj, pts, dif: coef, esTalleres: /talleres/i.test(nombre) })
                } else {
                    const pts = parseInt(cells[2])
                    const pj = parseInt(cells[3])
                    const dif = parseInt(cells[5])
                    if (!isNaN(pts)) rows.push({ pos, nombre, pj: isNaN(pj) ? 0 : pj, pts, dif: isNaN(dif) ? 0 : dif, esTalleres: /talleres/i.test(nombre) })
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

    await page.close()

    console.log(`   Zona A: ${data.zonaA.length} | Zona B: ${data.zonaB.length} | Anual: ${data.anual.length} | Promedios: ${data.promedios.length}`)
    const catZA = data.zonaA.find(e => e.esTalleres)
    if (catZA) console.log(`   🏟  Talleres Z.A: pos ${catZA.pos} | ${catZA.pts} pts | dif ${catZA.dif}`)

    return data
}

// ─── 2. Próximos partidos de Talleres ────────────────────────────────────────

async function scrapeFixture(browser) {
    console.log('\n📅  Extrayendo próximos partidos de Talleres…')
    const page = await browser.newPage()
    await page.goto(FIXTURE_URL, { waitUntil: 'networkidle', timeout: 30_000 })
    await page.waitForTimeout(5000)

    // Hacer clic en "VER MÁS" si existe para cargar todos los partidos
    try {
        const verMas = await page.$('text=VER MÁS')
        if (verMas) {
            await verMas.click()
            await page.waitForTimeout(2000)
            console.log('   ✅  Clic en "VER MÁS" — partidos expandidos')
        }
    } catch { }

    // Extraer tabla de PRÓXIMOS PARTIDOS
    const partidos = await page.evaluate(() => {
        const result = []

        // Buscar el bloque que contiene "PRÓXIMOS PARTIDOS"
        const allSections = Array.from(document.querySelectorAll('h2, h3, h4, [class*="title"], [class*="header"], div'))
        let proximosTable = null

        for (const el of allSections) {
            const txt = el.innerText?.toUpperCase()?.trim() || ''
            if (txt.includes('PRÓXIMOS PARTIDOS') || txt.includes('PROXIMOS PARTIDOS')) {
                // Buscar la tabla dentro del mismo contenedor o siguiente
                let container = el.parentElement
                for (let d = 0; d < 5 && container; d++) {
                    const table = container.querySelector('table')
                    if (table) { proximosTable = table; break }
                    container = container.parentElement
                }
                if (!proximosTable) {
                    let next = el.nextElementSibling
                    while (next && !proximosTable) {
                        if (next.tagName === 'TABLE') proximosTable = next
                        else proximosTable = next.querySelector('table')
                        next = next.nextElementSibling
                    }
                }
                if (proximosTable) break
            }
        }

        // Si no la encontramos por header, usar la primera tabla con columna "Hora"
        if (!proximosTable) {
            for (const table of document.querySelectorAll('table')) {
                const header = table.querySelector('tr')?.innerText?.toUpperCase() || ''
                if (header.includes('HORA') || header.includes('L/V')) {
                    proximosTable = table
                    break
                }
            }
        }

        if (!proximosTable) return []

        const rows = Array.from(proximosTable.querySelectorAll('tr'))
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td'))
                .map(c => c.innerText.replace(/\n/g, ' ').trim())
                .filter(c => c.length > 0)

            // Formato esperado: Día | L/V | vs Equipo | Hora
            // Ej: "12/03" | "L" | "Instituto" | "19:15"
            if (cells.length < 3) return
            const dia = cells[0]  // "12/03"
            if (!/^\d{1,2}\/\d{2}$/.test(dia)) return  // saltar headers o filas raras

            const condicionRaw = cells[1]?.toUpperCase()  // "L" o "V"
            const condicion = condicionRaw === 'L' ? 'local' : 'visitante'

            const rival = cells[2]?.replace(/\s+/g, ' ').trim()
            const hora = cells[cells.length - 1]  // última celda suele ser la hora

            if (rival && /\d{1,2}:\d{2}/.test(hora)) {
                result.push({ dia, condicion, rival, hora })
            }
        })

        return result
    })

    await page.close()

    console.log(`   ✅  ${partidos.length} próximos partidos encontrados`)
    partidos.forEach((p, i) => console.log(`   ${i + 1}. ${p.dia} ${p.hora}  [${p.condicion.toUpperCase()[0]}] vs ${p.rival}`))

    return partidos
}

// ─── 3. Enviar partidos al CMS ────────────────────────────────────────────────

async function syncPartidosCMS(partidos) {
    if (!partidos.length) { console.log('\n⚠️   Sin partidos que sincronizar.'); return }

    console.log(`\n🔁  Sincronizando ${partidos.length} partidos con el CMS…`)

    let res
    try {
        res = await fetch(SYNC_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ partidos, apiKey: SCRAPE_KEY }),
        })
    } catch (err) {
        console.warn(`\n⚠️   No se pudo conectar al CMS (¿dev server corriendo?): ${err.message}`)
        console.warn('   Los partidos se guardaron en scripts/_fixture_scraped.json para importar manualmente.')
        fs.writeFileSync(path.join(ROOT, 'scripts', '_fixture_scraped.json'), JSON.stringify(partidos, null, 2), 'utf-8')
        return
    }

    const json = await res.json()
    if (json.ok) {
        console.log(`   ✅  ${json.mensaje}`)
        if (json.creados.length) json.creados.forEach(p => console.log(`      + ${p}`))
        if (json.omitidos.length) console.log(`   ⚪  Omitidos (ya existen): ${json.omitidos.join(', ')}`)
    } else {
        console.error(`   ❌  Error del CMS: ${json.error}`)
    }
}

// ─── 4. Generar leagueTable.ts ────────────────────────────────────────────────

function generateLeagueTable(data) {
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
    fs.writeFileSync(OUTPUT_TS, ts, 'utf-8')
    console.log(`\n📝  leagueTable.ts actualizado: ${OUTPUT_TS}`)

    // ── GUARDAR EN JSON para el cliente ──
    try {
        fs.writeFileSync(OUTPUT_JSON, JSON.stringify(data, null, 2), 'utf-8')
        console.log(`📝  leagueTable.json actualizado: ${OUTPUT_JSON}`)
    } catch (e) {
        console.error('Error guardando JSON', e)
    }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🚀  Scraper Promiedos → TalleresWeb')
    console.log('════════════════════════════════════')

    const browser = await chromium.launch({ headless: true })

    try {
        // Tablas de posiciones
        const tablas = await scrapeTablas(browser)
        if (tablas.zonaA.length === 0) {
            console.error('❌  Zona A vacía. Abortando.')
            process.exit(1)
        }
        generateLeagueTable(tablas)

        // Próximos partidos → CMS
        const partidos = await scrapeFixture(browser)
        await syncPartidosCMS(partidos)

    } finally {
        await browser.close()
    }

    console.log('\n🏁  ¡Scraping completo!')
}

main().catch(err => {
    console.error('❌  Error fatal:', err.message)
    process.exit(1)
})
