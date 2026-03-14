import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nombre, email, telefono, motivo, mensaje } = body

        if (!nombre || !email || !mensaje) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
        }

        const apiKey = process.env.BREVO_API_KEY
        const senderEmail = process.env.BREVO_SENDER_EMAIL

        if (!apiKey || !senderEmail) {
            console.error('Brevo no está configurado correctamente en las variables de entorno.')
            return NextResponse.json({ error: 'El servicio de correo no está disponible temporalmente.' }, { status: 500 })
        }

        // El correo al que enviamos el mensaje (el dueño del sitio)
        const toEmail = senderEmail

        const emailBody = {
            sender: { name: 'Todo Talleres (Contacto)', email: senderEmail },
            to: [{ email: toEmail }],
            replyTo: { name: nombre, email: email },
            subject: `Nuevo mensaje de Contacto: ${motivo}`,
            htmlContent: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2>Nuevo mensaje desde Todo Talleres</h2>
                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Teléfono:</strong> ${telefono || 'No provisto'}</p>
                    <p><strong>Motivo:</strong> ${motivo}</p>
                    <br/>
                    <p><strong>Mensaje:</strong></p>
                    <p style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${mensaje}</p>
                </div>
            `,
        }

        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailBody),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('Error enviando correo de contacto:', err)
            return NextResponse.json({ error: 'Error al procesar el envío' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Mensaje enviado correctamente' }, { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}
