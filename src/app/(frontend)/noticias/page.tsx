import React from 'react'
import Link from 'next/link'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { HeroCard, ArticleCard } from '../../../components/NewsCards'
import { getNews } from '../../../lib/getNews'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Noticias — Talleres de Córdoba',
    description: 'Todas las noticias del Club Atlético Talleres de Córdoba. Partidos, plantel, fichajes y más.',
}

export default async function NoticiasPage() {
    const allNews = await getNews()
    const hero = allNews.find(n => n.size === 'hero') ?? allNews[0]
    const rest = allNews.filter(n => n.id !== hero?.id)

    return (
        <>
            <Header tickerNews={allNews} />

            <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>

                {/* Título */}
                <div style={{ marginBottom: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ display: 'inline-block', width: 5, height: 28, background: '#FF6B00', borderRadius: 2 }} />
                    <h1 style={{
                        fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 900,
                        textTransform: 'uppercase', letterSpacing: 2, color: 'white',
                    }}>
                        Todas las Noticias
                    </h1>
                </div>

                {allNews.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: '#2A4060' }}>
                        <span style={{ fontSize: 64 }}>📰</span>
                        <p style={{ marginTop: 20, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Próximamente — Cargando las primeras noticias
                        </p>
                    </div>
                ) : (
                    <>
                        {hero && <HeroCard article={hero} />}

                        {rest.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: 20,
                            }}>
                                {rest.map((article, i) => (
                                    <ArticleCard key={article.id} article={article} index={i} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}
