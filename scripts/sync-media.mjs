#!/usr/bin/env node
/**
 * ══════════════════════════════════════════════════════════════════
 * SYNC-MEDIA — Sincroniza archivos del directorio /media con Payload
 * ══════════════════════════════════════════════════════════════════
 * Uso: node scripts/sync-media.mjs
 *
 * Lee todos los archivos de /media y los registra en la colección
 * "media" de Payload vía la API REST, si no están ya registrados.
 * ══════════════════════════════════════════════════════════════════
 */

import { readdir, readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MEDIA_DIR = path.resolve(__dirname, '..', 'media')
const CMS_URL = 'http://localhost:3000'

// Mapeo de extensión → MIME type
const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

// Descripción amigable por nombre de archivo
function altFromFilename(filename) {
  const base = path.basename(filename, path.extname(filename))
  const map = {
    'ins': 'Instituto Córdoba',
    'bel': 'Belgrano',
    'boca': 'Boca Juniors',
    'casla': 'San Lorenzo',
    'cen': 'Rosario Central',
    'defe': 'Defensa y Justicia',
    'edlp': 'Estudiantes de La Plata',
    'estmza': 'Estudiantes de Mendoza',
    'ind': 'Independiente',
    'lan': 'Lanús',
    'nob': "Newell's Old Boys",
    'plat': 'Platense',
    'riestra': 'Deportivo Riestra',
    'santi': 'Santiago del Estero',
    'vel': 'Vélez Sarsfield',
    'seed-estadio': 'Estadio Mario A. Kempes',
    'seed-partido': 'Partido de Talleres',
    'seed-plantel': 'Plantel de Talleres',
    'image': 'Imagen general',
    'image-1': 'Imagen general 2',
  }
  return map[base] || base.replace(/-/g, ' ').replace(/_/g, ' ')
}

async function getExistingFilenames() {
  try {
    const res = await fetch(`${CMS_URL}/api/media?limit=200&depth=0`)
    if (!res.ok) {
      console.error('❌ No se pudo obtener la lista de media del CMS:', res.status)
      return new Set()
    }
    const { docs } = await res.json()
    return new Set(docs.map(d => d.filename))
  } catch (e) {
    console.error('❌ Error al consultar /api/media:', e.message)
    return new Set()
  }
}

async function uploadFile(filePath, filename) {
  const ext = path.extname(filename).toLowerCase()
  const mimeType = MIME[ext]
  if (!mimeType) {
    console.log(`  ⏭  Saltando ${filename} — tipo no soportado`)
    return false
  }

  const content = await readFile(filePath)
  const alt = altFromFilename(filename)

  // Construir multipart/form-data manualmente
  const boundary = `----FormBoundary${Date.now()}`
  const CRLF = '\r\n'

  const parts = []

  // Parte: file
  const fileHeader = [
    `--${boundary}`,
    `Content-Disposition: form-data; name="file"; filename="${filename}"`,
    `Content-Type: ${mimeType}`,
    '',
    '',
  ].join(CRLF)
  parts.push(Buffer.from(fileHeader))
  parts.push(content)
  parts.push(Buffer.from(CRLF))

  // Parte: alt (opcional)
  const altPart = [
    `--${boundary}`,
    `Content-Disposition: form-data; name="alt"`,
    '',
    alt,
    '',
  ].join(CRLF)
  parts.push(Buffer.from(altPart))

  // Cierre
  parts.push(Buffer.from(`--${boundary}--${CRLF}`))

  const body = Buffer.concat(parts)

  try {
    const res = await fetch(`${CMS_URL}/api/media`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length.toString(),
      },
      body,
    })

    const json = await res.json()
    if (!res.ok) {
      console.error(`  ❌ ${filename}: ${JSON.stringify(json.errors || json.message || json)}`)
      return false
    }
    console.log(`  ✅ ${filename} → ID: ${json.doc?.id}`)
    return true
  } catch (e) {
    console.error(`  ❌ ${filename}: ${e.message}`)
    return false
  }
}

async function main() {
  console.log('🖼  Sincronizando /media → Payload CMS')
  console.log('══════════════════════════════════════')
  console.log(`📁  Directorio: ${MEDIA_DIR}`)

  if (!existsSync(MEDIA_DIR)) {
    console.error('❌ El directorio /media no existe. Abortando.')
    process.exit(1)
  }

  // 1. Archivos locales
  const allFiles = await readdir(MEDIA_DIR)
  const imageFiles = allFiles.filter(f => {
    const ext = path.extname(f).toLowerCase()
    return Object.keys(MIME).includes(ext) && !f.startsWith('.')
  })
  console.log(`\n📄  ${imageFiles.length} imágenes encontradas en /media\n`)

  // 2. Archivos ya en Payload
  console.log('🔎  Consultando Payload para ver cuáles ya existen...')
  const existing = await getExistingFilenames()
  console.log(`   Ya registradas: ${existing.size}\n`)

  // 3. Subir solo las nuevas
  const toUpload = imageFiles.filter(f => !existing.has(f))
  if (toUpload.length === 0) {
    console.log('✅ Todo está sincronizado. No hay archivos nuevos para subir.')
    return
  }

  console.log(`⬆️  Subiendo ${toUpload.length} archivo(s) nuevo(s):\n`)
  let ok = 0
  let fail = 0

  for (const filename of toUpload) {
    const filePath = path.join(MEDIA_DIR, filename)
    const success = await uploadFile(filePath, filename)
    if (success) ok++; else fail++
    // Pequeña pausa para no saturar el servidor
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\n🏁  Listo! ✅ ${ok} subidas, ❌ ${fail} errores`)
}

main().catch(err => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
