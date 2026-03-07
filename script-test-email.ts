import { getPayload } from 'payload'
// Asegurarse de tener importado dotenv si npx tsx no lo carga automático
import 'dotenv/config'
import configPromise from './src/payload.config'

async function crearNoticia() {
    try {
        console.log('Iniciando Payload Local API...')
        const payload = await getPayload({ config: configPromise })

        console.log('Creando noticia de prueba...')
        const result = await payload.create({
            collection: 'noticias',
            data: {
                titulo: '¡Suscripción al Newsletter Activada!',
                categoria: 'Institucional',
                destacada: true,
                tamaño: 'hero',
                resumen: 'Esta es una noticia de prueba para verificar que el sistema de correos automáticos mediante Brevo está funcionando correctamente y llegando a los hinchas. ¡Vamos Talleres!',
                autor: 'Sistema Automático',
            }
        })

        console.log(`Noticia creada con éxito. ID: ${result.id}`)
        process.exit(0)
    } catch (e) {
        console.error('Error:', e)
        process.exit(1)
    }
}

crearNoticia()
