import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email } = body

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Email inválido' }), { status: 400 })
        }

        const payload = await getPayload({ config: configPromise })

        // Check si ya existe
        const existing = await payload.find({
            collection: 'suscriptores',
            where: { email: { equals: email } },
            depth: 0,
        })

        if (existing.totalDocs > 0) {
            return new Response(JSON.stringify({ success: true, message: 'Ya estabas suscrito' }), { status: 200 })
        }

        // Crear suscriptor
        await payload.create({
            collection: 'suscriptores',
            data: {
                email,
                origen: 'web',
            },
        })

        return new Response(JSON.stringify({ success: true }), { status: 201 })
    } catch (e: any) {
        console.error('Error suscribiendo:', e)
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 })
    }
}
