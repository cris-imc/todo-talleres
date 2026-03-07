#!/usr/bin/env node
/**
 * ══════════════════════════════════════════════════════════════════
 * ESCUDOS — Descarga logos de rivales usando la API interna de Payload
 * ══════════════════════════════════════════════════════════════════
 * Uso:  npm run escudos
 *
 *  1. Busca cada rival en TheSportsDB
 *  2. Envía la URL del logo a /api/import-escudos
 *  3. La ruta interna descarga, sube a media y vincula al partido
 * ══════════════════════════════════════════════════════════════════
 */

import https from 'https'

const CMS_URL = 'http://localhost:3000'
const SCRAPE_KEY = 'talleres2026'

// ── Mapa de nombres para TheSportsDB ────────────────────────────────────────
const TEAM_NAME_MAP = {
    'Instituto': 'Instituto Cordoba',
    'Belgrano': 'Belgrano',
    'Independiente': 'Independiente',
    'Boca Jrs.': 'Boca Juniors',
    'Defensa': 'Defensa y Justicia',
    'Defensa y Justicia': 'Defensa y Justicia',
    'River': 'River Plate',
    'Racing': 'Racing Club',
    'San Lorenzo': 'San Lorenzo',
    'Huracán': 'Huracan',
    'Platense': 'Platense',
    'Lanús': 'Lanus',
    'Estudiantes': 'Estudiantes de La Plata',
    "Newell's": "Newells Old Boys",
    'Central': 'Rosario Central',
    'Rosario Central': 'Rosario Central',
    'Vélez': 'Velez Sarsfield',
    'Gimnasia (M)': 'Gimnasia Mendoza',
    'Central Córdoba': 'Central Cordoba',
    'Riestra': 'Deportivo Riestra',
    'Unión': 'Union Santa Fe',
    'Sarmiento': 'Sarmiento Junin',
    'Banfield': 'Banfield',
    'Aldosivi': 'Aldosivi',
    'Barracas': 'Barracas Central',
    'Tigre': 'Tigre',
    'Argentinos': 'Argentinos Juniors',
    'Ind. Rivadavia': 'Independiente Rivadavia',
    'Gimnasia': 'Gimnasia La Plata',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'TalleresWeb/1.0' } }, res => {
            let d = ''
            res.on('data', c => d += c)
            res.on('end', () => {
                try { resolve(JSON.parse(d)) }
                catch (e) { reject(new Error('JSON: ' + d.substring(0, 80))) }
            })
        }).on('error', reject)
    })
}

async function buscarLogo(rival) {
    const nombre = TEAM_NAME_MAP[rival] || rival
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(nombre)}`
    try {
        const data = await fetchJson(url)
        const teams = data?.teams
        if (!teams?.length) { console.warn(`   ⚠  Sin resultado: "${nombre}"`); return null }
        const team = teams.find(t => t.strCountry === 'Argentina') || teams[0]
        const badge = team.strBadge || team.strTeamBadge
        if (!badge) { console.warn(`   ⚠  Sin badge: ${team.strTeam}`); return null }
        console.log(`   🔍  ${team.strTeam}`)
        return badge + '/preview'
    } catch (e) {
        console.warn(`   ⚠  API error: ${e.message}`)
        return null
    }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('🖼   Descargando escudos → Payload CMS')
    console.log('═══════════════════════════════════════')

    // 1. Leer partidos sin escudo
    const res = await fetch(`${CMS_URL}/api/partidos?limit=100&depth=0`)
    if (!res.ok) throw new Error(`GET partidos: ${res.status}`)
    const { docs: partidos } = await res.json()
    console.log(`\n📋  ${partidos.length} partidos en el CMS`)

    // Rivales únicos sin escudo
    const sinEscudo = [...new Set(
        partidos
            .filter(p => !p.escudoRival)
            .map(p => p.rival)
    )]
    console.log(`🎯  ${sinEscudo.length} rivales sin escudo: ${sinEscudo.join(', ')}\n`)

    if (!sinEscudo.length) {
        console.log('✅  Todos los partidos ya tienen escudo!')
        return
    }

    // 2. Buscar logos
    const escudos = []
    for (const rival of sinEscudo) {
        console.log(`🔎  ${rival}`)
        const mediaUrl = await buscarLogo(rival)
        if (mediaUrl) {
            escudos.push({ rival, mediaUrl })
            console.log(`   ✅  URL encontrada`)
        }
        await new Promise(r => setTimeout(r, 500))
    }

    if (!escudos.length) {
        console.log('\n❌  No se encontró ningún logo.')
        return
    }

    console.log(`\n☁️   Enviando ${escudos.length} logos al CMS…`)

    // 3. Enviar a la ruta interna (procesa de a 3 para no saturar)
    const chunkSize = 3
    for (let i = 0; i < escudos.length; i += chunkSize) {
        const chunk = escudos.slice(i, i + chunkSize)
        const importRes = await fetch(`${CMS_URL}/api/import-escudos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ escudos: chunk, apiKey: SCRAPE_KEY }),
        })
        const json = await importRes.json()
        console.log(`   Batch ${Math.floor(i / chunkSize) + 1}: ${json.mensaje}`)
        if (json.errores?.length) json.errores.forEach(e => console.warn(`   ❌  ${e}`))
        if (json.creados?.length) json.creados.forEach(c => console.log(`   ✅  ${c}`))
    }

    console.log('\n🏁  ¡Listo!')
}

main().catch(err => {
    console.error('❌  Error:', err.message)
    process.exit(1)
})
