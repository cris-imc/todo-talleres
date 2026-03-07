import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ArticleCard } from '../../../../components/NewsCards'
import { getNewsBySlug, getRelatedNews, getAllSlugs, getNews } from '../../../../lib/getNews'

// Sin caché — los cambios del admin se ven inmediatamente
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const noticia = await getNewsBySlug(slug)
    if (!noticia) return { title: 'Noticia no encontrada — Talleres' }
    return {
        title: `${noticia.titulo} — Talleres de Córdoba`,
        description: noticia.resumen ?? noticia.titulo,
        openGraph: {
            title: noticia.titulo,
            description: noticia.resumen ?? '',
            images: noticia.imagen?.url ? [noticia.imagen.url] : [],
        },
    }
}

// Serializa contenido Lexical a React (solo Server Component, sin handlers)
function serializeLexical(content: unknown): React.ReactNode {
    if (!content || typeof content !== 'object') return null
    const root = (content as any)?.root
    if (!root?.children) return null

    function renderNode(node: any, idx: number): React.ReactNode {
        const children = node.children?.map((c: any, i: number) => renderNode(c, i)) ?? []
        switch (node.type) {
            case 'paragraph':
                return <p key={idx} style={{ marginBottom: '1.4em', lineHeight: 1.8, color: '#C8D8EC', fontSize: 17 }}>{children}</p>
            case 'heading': {
                const style: React.CSSProperties = {
                    fontFamily: 'var(--font-display)', fontWeight: 900, textTransform: 'uppercase',
                    letterSpacing: 1, color: 'white', marginBottom: '0.5em', marginTop: '1.5em',
                    fontSize: node.tag === 'h2' ? 26 : node.tag === 'h3' ? 20 : 16,
                }
                if (node.tag === 'h2') return <h2 key={idx} style={style}>{children}</h2>
                if (node.tag === 'h3') return <h3 key={idx} style={style}>{children}</h3>
                return <h4 key={idx} style={style}>{children}</h4>
            }
            case 'text': {
                let el: React.ReactNode = node.text
                if (node.format & 1) el = <strong>{el}</strong>
                if (node.format & 2) el = <em>{el}</em>
                if (node.format & 8) el = <u>{el}</u>
                if (node.format & 16) el = <del>{el}</del>
                return <React.Fragment key={idx}>{el}</React.Fragment>
            }
            case 'link':
                return <a key={idx} href={node.url ?? '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#FF6B00', textDecoration: 'underline' }}>{children}</a>
            case 'quote':
                return <blockquote key={idx} style={{ borderLeft: '4px solid #FF6B00', marginLeft: 0, paddingLeft: 20, fontStyle: 'italic', color: '#7A94B0', margin: '1.5em 0' }}>{children}</blockquote>
            case 'list': {
                const Tag = node.listType === 'number' ? 'ol' : 'ul'
                return <Tag key={idx} style={{ marginBottom: '1.4em', paddingLeft: 24, color: '#C8D8EC' }}>{children}</Tag>
            }
            case 'listitem':
                return <li key={idx} style={{ marginBottom: '0.4em', lineHeight: 1.7 }}>{children}</li>
            case 'horizontalrule':
                return <hr key={idx} style={{ border: 'none', borderTop: '1px solid #1A2D45', margin: '2em 0' }} />
            case 'upload':
                if (node.value?.url) return (
                    <figure key={idx} style={{ margin: '2em 0', borderRadius: 10, overflow: 'hidden' }}>
                        <img src={node.value.url} alt={node.value.alt ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        {node.value.alt && <figcaption style={{ fontSize: 12, color: '#7A94B0', padding: '8px 0', textAlign: 'center' }}>{node.value.alt}</figcaption>}
                    </figure>
                )
                return null
            default:
                return children.length ? <React.Fragment key={idx}>{children}</React.Fragment> : null
        }
    }
    return <>{root.children.map((n: any, i: number) => renderNode(n, i))}</>
}

export default async function NoticiaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    // Fetch todo en paralelo: noticia, noticias del ticker, relacionadas
    const [noticia, allNews] = await Promise.all([
        getNewsBySlug(slug),
        getNews(),
    ])
    if (!noticia) notFound()

    const related = await getRelatedNews(noticia.categoria, slug)

    const fechaFormateada = new Date(noticia.createdAt).toLocaleDateString('es-AR', {
        day: 'numeric', month: 'long', year: 'numeric',
    })

    const categoryColor: Record<string, string> = {
        Partido: '#FF6B00', Plantel: '#3B82F6', Fichajes: '#10B981',
        Selección: '#8B5CF6', Estadio: '#F59E0B', Análisis: '#06B6D4', Institucional: '#64748B',
    }
    const catColor = categoryColor[noticia.categoria] ?? '#FF6B00'

    return (
        <>
            <Header tickerNews={allNews} />

            <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

                {/* Breadcrumb */}
                <nav aria-label="Navegación" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 12, color: '#7A94B0' }}>
                    <Link href="/" style={{ color: '#7A94B0' }}>Inicio</Link>
                    <span>›</span>
                    <Link href="/noticias" style={{ color: '#7A94B0' }}>Noticias</Link>
                    <span>›</span>
                    <span style={{ color: catColor }}>{noticia.categoria}</span>
                </nav>

                {/* Header artículo */}
                <header style={{ marginBottom: 32 }}>
                    <span style={{
                        display: 'inline-block', marginBottom: 16,
                        fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700,
                        letterSpacing: 2, textTransform: 'uppercase',
                        padding: '5px 14px', borderRadius: 4,
                        background: catColor, color: 'white',
                    }}>
                        {noticia.categoria}
                    </span>

                    <h1 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 900,
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        textTransform: 'uppercase', lineHeight: 1.05,
                        letterSpacing: 0.5, color: 'white', marginBottom: 20,
                    }}>
                        {noticia.titulo}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingBottom: 20, borderBottom: '1px solid #1A2D45' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: '50%',
                                background: 'linear-gradient(135deg, #001030, #003087)',
                                border: '2px solid #FF6B00', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontFamily: 'var(--font-display)',
                                fontSize: 14, fontWeight: 900, color: '#FF6B00',
                            }}>
                                {noticia.autor?.[0]?.toUpperCase() ?? 'R'}
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, color: 'white', fontSize: 13 }}>{noticia.autor ?? 'Redacción TalleresWeb'}</p>
                                <p style={{ fontSize: 11, color: '#7A94B0' }}>{fechaFormateada}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginLeft: 'auto', alignItems: 'center' }}>
                            <span style={{ fontSize: 12, color: '#7A94B0' }}>⏱ {noticia.tiempoLectura ?? 4} min de lectura</span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(noticia.titulo)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ fontSize: 11, fontWeight: 700, color: '#7A94B0', border: '1px solid #1A2D45', borderRadius: 6, padding: '5px 10px' }}
                            >
                                𝕏 Compartir
                            </a>
                        </div>
                    </div>
                </header>

                {/* Imagen de portada */}
                {noticia.imagen?.url && (
                    <figure style={{ margin: '0 0 40px', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                        <img
                            src={noticia.imagen.url}
                            alt={noticia.imagen.alt ?? noticia.titulo}
                            style={{ width: '100%', height: 'auto', maxHeight: 520, objectFit: 'cover', display: 'block' }}
                        />
                    </figure>
                )}

                {/* Resumen */}
                {noticia.resumen && (
                    <div style={{ fontSize: 20, lineHeight: 1.65, color: '#C8D8EC', borderLeft: '4px solid #FF6B00', paddingLeft: 20, marginBottom: 36, fontStyle: 'italic' }}>
                        {noticia.resumen}
                    </div>
                )}

                {/* Cuerpo */}
                <article>
                    {noticia.contenido
                        ? serializeLexical(noticia.contenido)
                        : <p style={{ color: '#7A94B0', fontStyle: 'italic' }}>Esta nota no tiene contenido aún.</p>
                    }
                </article>

                {/* Etiquetas */}
                {Array.isArray((noticia as any).etiquetas) && (noticia as any).etiquetas.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 48, paddingTop: 24, borderTop: '1px solid #1A2D45' }}>
                        <span style={{ fontSize: 11, color: '#7A94B0', marginRight: 4 }}>Etiquetas:</span>
                        {(noticia as any).etiquetas.map((t: any, i: number) => (
                            <span key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4, border: '1px solid #1A2D45', color: '#7A94B0' }}>
                                {t.etiqueta}
                            </span>
                        ))}
                    </div>
                )}

                {/* Relacionadas */}
                {related.length > 0 && (
                    <section style={{ marginTop: 64 }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5, color: 'white', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ display: 'inline-block', width: 4, height: 20, background: '#FF6B00', borderRadius: 2 }} />
                            Notas relacionadas
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                            {related.map((r, i) => <ArticleCard key={r.id} article={r} index={i} />)}
                        </div>
                    </section>
                )}

                {/* Volver */}
                <div style={{ marginTop: 48, textAlign: 'center' }}>
                    <Link href="/noticias" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700,
                        letterSpacing: 1, textTransform: 'uppercase',
                        color: '#7A94B0', border: '1px solid #1A2D45', borderRadius: 6, padding: '10px 20px',
                    }}>
                        ← Volver a todas las noticias
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    )
}
