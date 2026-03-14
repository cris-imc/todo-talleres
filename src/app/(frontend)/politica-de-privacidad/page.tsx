import React from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { getNews } from '../../../lib/getNews'

export const metadata = { title: 'Política de Privacidad — Todo Talleres' }

export default async function PoliticaPrivacidadPage() {
    const tickerNews = await getNews(5)

    return (
        <>
            <Header tickerNews={tickerNews} />
            <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px', minHeight: '60vh', color: '#C8D8EC' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: 24 }}>
                    Política de Privacidad
                </h1>
                
                <div style={{ lineHeight: 1.8, fontSize: 16 }}>
                    <p style={{ marginBottom: 16 }}>En <strong>Todo Talleres</strong> valoramos su privacidad y nos comprometemos a proteger sus datos personales.</p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>1. Recopilación de datos</h2>
                    <p style={{ marginBottom: 16 }}>Al suscribirse a nuestro newsletter, recopilamos únicamente su dirección de correo electrónico para poder enviarle las últimas novedades del Club Atlético Talleres. No almacenamos datos sensibles adicionales.</p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>2. Uso de la información</h2>
                    <p style={{ marginBottom: 16 }}>Su información se utiliza exclusivamente para: a) El envío periódico del boletín informativo de noticias; b) Mejorar la experiencia en el sitio web; c) Responder de manera directa a solicitudes de contacto.</p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>3. Proveedores de Terceros</h2>
                    <p style={{ marginBottom: 16 }}>Utilizamos servicios de terceros como Brevo para el envío de correos electrónicos. Su email será procesado de manera segura bajo las políticas de privacidad establecidas por dicha plataforma.</p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>4. Sus derechos</h2>
                    <p>Usted tiene el derecho legal a solicitar el acceso, corrección o eliminación de su correo electrónico de nuestra base de datos. Puede darse de baja del boletín informativo en cualquier momento utilizando el enlace incluido al pie de nuestros correos.</p>
                </div>
            </main>
            <Footer />
        </>
    )
}
