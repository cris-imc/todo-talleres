import React from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { getNews } from '../../../lib/getNews'

export const metadata = { title: 'Uso de Cookies — Todo Talleres' }

export default async function CookiesPage() {
    const tickerNews = await getNews(5)

    return (
        <>
            <Header tickerNews={tickerNews} />
            <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px', minHeight: '60vh', color: '#C8D8EC' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: 24 }}>
                    Política de Uso de Cookies
                </h1>
                
                <div style={{ lineHeight: 1.8, fontSize: 16 }}>
                    <p style={{ marginBottom: 16 }}>
                        Este sitio web emplea cookies para ofrecer una mejor experiencia de navegación y garantizar ciertas funcionalidades técnicas (como el panel de administración o persistencia de inicio de sesión).
                    </p>

                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>¿Qué son las cookies?</h2>
                    <p style={{ marginBottom: 16 }}>
                        Las "cookies" son pequeños fragmentos de datos, ubicados en archivos de texto, que se almacenan en su computadora u otro dispositivo cuando los sitios web se cargan en un navegador. 
                    </p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>Tipos de cookies que usamos</h2>
                    <ul style={{ listStyleType: 'disc', paddingLeft: 24, marginBottom: 16 }}>
                        <li style={{ marginBottom: 8 }}><strong>Cookies estrictamente necesarias:</strong> esenciales para recorrer el sitio web y aprovechar sus componentes (ejm. acceso al sistema y variables de autenticación interna con Payload CMS).</li>
                        <li style={{ marginBottom: 8 }}><strong>Cookies analíticas y publicitarias:</strong> provistas por plataformas como Google AdSense o Analytics, nos permiten recolectar métricas anónimas sobre interacciones de usuarios para sostener económicamente este espacio gratuito.</li>
                    </ul>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>Control de Privacidad</h2>
                    <p>
                        Por obvio, le comunicamos que al acceder a configurar su navegador usted puede decidir bloquear las cookies, ser alertado acerca del establecimiento de este tipo de archivo e incluso proceder y borrarlas de manera efectiva en cualquiler momento, aunque algunas funcionalidades pueden verse afectadas.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    )
}
