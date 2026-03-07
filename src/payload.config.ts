import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Noticias } from './collections/Noticias'
import { Partidos } from './collections/Partidos'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Noticias, Partidos],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'talleres-secret-2026-cat',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      // Base de datos SQLite local — no requiere servidor externo
      url: `file:${path.resolve(dirname, '..', 'talleres.db')}`,
    },
  }),
  sharp,
  plugins: [],
  // Subida de archivos (imágenes)
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})
