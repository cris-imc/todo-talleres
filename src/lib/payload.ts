import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Devuelve un cliente de Payload CMS.
 * Sin singleton — cada request obtiene datos frescos de SQLite.
 * Garantiza que los cambios del admin panel se ven inmediatamente.
 */
export async function getPayloadClient() {
    return getPayload({ config: configPromise })
}
