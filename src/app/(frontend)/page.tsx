import React from 'react'
import Link from 'next/link'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Hero } from '../../components/Hero'
import { Sidebar } from '../../components/Sidebar'
import { NewsGrid } from '../../components/NewsGrid'
import { AdSlot } from '../../components/AdSlot'
import { getNews, getFeaturedNews, getNextMatch, getFullFixture } from '../../lib/getNews'

// Sin caché — los cambios del admin se reflejan inmediatamente
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch paralelo: noticias + noticia destacada para el Hero
  const [allNews, featured, nextMatch, fixture] = await Promise.all([
    getNews(),
    getFeaturedNews(),
    getNextMatch(),
    getFullFixture(),
  ])

  return (
    <>
      {/* Header fijo — recibe las noticias para el ticker */}
      <Header tickerNews={allNews} />

      {/* Layout principal: Contenido 70% | Sidebar 30% */}
      <div style={{
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        minHeight: 600,
      }}
        className="main-layout"
      >
        {/* ── Columna izquierda: contenido ── */}
        <div className="main-content" style={{ flex: 1, minWidth: 0 }}>
          {/* Hero: siempre de borde a borde */}
          <Hero featured={featured} />

          {/* Banner AdSense */}
          <div style={{ padding: '0 28px' }} className="ad-slot-top">
            <AdSlot name="Home - Top Banner" type="banner" />
          </div>

          {/* Cabecera "Últimas Noticias" */}
          <div id="ultimas-noticias" className="ultimas-header flex items-center justify-between gap-2 flex-wrap" style={{
            borderBottom: '1px solid #1A2D45',
            scrollMarginTop: 140,
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}>
              <span style={{ display: 'inline-block', width: 4, height: 22, background: '#FF6B00', borderRadius: 2, flexShrink: 0 }} />
              Últimas Noticias
            </h2>
            <Link href="/noticias" style={{
              fontSize: 12, fontWeight: 700, color: '#FF6B00',
              display: 'flex', alignItems: 'center', gap: 4, transition: 'gap .2s',
            }}>
              Ver todas →
            </Link>
          </div>

          <NewsGrid news={allNews} />
        </div>

        {/* ── Columna derecha: sidebar fijo ── */}
        <div
          className="sidebar-col"
          style={{
            width: 340,
            flexShrink: 0,
            position: 'sticky',
            top: 134,
            alignSelf: 'flex-start',
            maxHeight: 'calc(100vh - 134px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: '#1A2D45 transparent',
          }}
        >
          <Sidebar nextMatch={nextMatch} fixture={fixture} />
        </div>
      </div>

      <Footer />

    </>
  )
}
