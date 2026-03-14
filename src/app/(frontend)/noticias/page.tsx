import React from 'react'
import Link from 'next/link'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { HeroCard, ArticleCard } from '../../../components/NewsCards'
import { getNews, getPaginatedNews } from '../../../lib/getNews'

export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Noticias — Talleres de Córdoba',
    description: 'Todas las noticias del Club Atlético Talleres de Córdoba. Partidos, plantel, fichajes y más.',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function NoticiasPage({ searchParams }: { searchParams: SearchParams }) {
    const defaultNews = await getNews()
    const sp = await searchParams
    const page = typeof sp.page === 'string' ? parseInt(sp.page, 10) : 1

    const { docs: allNews, totalPages, hasNextPage, hasPrevPage } = await getPaginatedNews(page, 12)
    
    // Si estamos en la página 1, la primera es Hero. Si no, todas son cuadrilla
    const hero = page === 1 ? (allNews.find(n => n.size === 'hero') ?? allNews[0]) : null
    const rest = page === 1 ? allNews.filter(n => n.id !== hero?.id) : allNews

    return (
        <>
            <Header tickerNews={defaultNews} />

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

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 48 }}>
                                {hasPrevPage ? (
                                    <Link href={`/noticias?page=${page - 1}`} style={{ padding: '8px 16px', background: '#1A2D45', borderRadius: 6, color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                                        ← Más nuevas
                                    </Link>
                                ) : <span style={{ padding: '8px 16px', background: 'transparent', color: 'transparent', userSelect: 'none' }}>← Más nuevas</span>}
                                
                                <span style={{ color: '#7A94B0', fontSize: 13, fontWeight: 700 }}>Página {page} de {totalPages}</span>

                                {hasNextPage ? (
                                    <Link href={`/noticias?page=${page + 1}`} style={{ padding: '8px 16px', background: '#1A2D45', borderRadius: 6, color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                                        Más antiguas →
                                    </Link>
                                ) : <span style={{ padding: '8px 16px', background: 'transparent', color: 'transparent', userSelect: 'none' }}>Más antiguas →</span>}
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}
