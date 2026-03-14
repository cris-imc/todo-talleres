import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Singleton del cliente Payload — guardado en globalThis para sobrevivir
 * al Hot Module Replacement en desarrollo, evitando re-inicializar en cada
 * request o cada recarga de módulo.
 */

// Extender globalThis para TypeScript
declare global {
  // eslint-disable-next-line no-var
  var __payloadClient: Awaited<ReturnType<typeof getPayload>> | undefined
}

export async function getPayloadClient() {
  if (!global.__payloadClient) {
    global.__payloadClient = await getPayload({ config: configPromise })
  }
  return global.__payloadClient
}
