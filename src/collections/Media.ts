import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Ruta absoluta a /media desde la raíz del proyecto
const MEDIA_DIR =
  process.env.NODE_ENV === 'production'
    ? '/var/data/media'
    : path.resolve(dirname, '..', '..', 'media')

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Imagen',
    plural: 'Imágenes',
  },
  admin: {
    description: 'Biblioteca de imágenes del sitio',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo (descripción)',
      required: false,
    },
  ],
  upload: {
    staticDir: MEDIA_DIR,
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'],
    // Sin imageSizes: evita columnas extra en SQLite que requieren migración
  },
}
