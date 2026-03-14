import React from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { getNews } from '../../../lib/getNews'

export const metadata = { title: 'Aviso Legal — Todo Talleres' }

export default async function AvisoLegalPage() {
    const tickerNews = await getNews(5)

    return (
        <>
            <Header tickerNews={tickerNews} />
            <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px', minHeight: '60vh', color: '#C8D8EC' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, textTransform: 'uppercase', color: 'white', marginBottom: 24 }}>
                    Aviso Legal
                </h1>
                
                <div style={{ lineHeight: 1.8, fontSize: 16 }}>
                    <p style={{ marginBottom: 16 }}>
                        Este sitio web (<strong>Todo Talleres</strong>) es un portal digital de <strong>noticias y contenido creado por y para los hinchas</strong> del Club Atlético Talleres de Córdoba.
                    </p>

                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>Sitio No Oficial</h2>
                    <p style={{ marginBottom: 16 }}>
                        Declaramos de forma explícita que este es un <strong>SITIO WEB NO OFICIAL</strong> y no tiene afiliación directa con la institución Club Atlético Talleres. Todo el contenido redactado, los artículos de opinión y las estadísticas son propiedad de sus respectivos autores.
                    </p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>Uso de Marcas y Logos</h2>
                    <p style={{ marginBottom: 16 }}>
                        Los logotipos, insignias y marcas registradas utilizadas (como el escudo del Club Atlético Talleres o escudos de otros equipos para representaciones deportivas) pertenecen de manera exclusiva a las instituciones deportivas. El uso de los mismos en nuestro sitio se realiza netamente con un fin informativo, periodístico y sin ánimos de lucro comercial sobre las insignias.
                    </p>
                    
                    <h2 style={{ fontSize: 20, color: 'white', marginTop: 32, marginBottom: 16, fontWeight: 700 }}>Responsabilidad</h2>
                    <p>
                        Todo Talleres no asume responsabilidad alguna por el uso indebido que los usuarios puedan hacer de la información aquí publicada, ni de los comentarios de terceros realizados dentro del marco público de esta página web.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    )
}
