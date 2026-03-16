import React from 'react'
import { Barlow_Condensed, DM_Sans } from 'next/font/google'
import './styles.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'Talleres de Córdoba — Web NO Oficial',
  description: 'Sitio web NO oficial del Club Atlético Talleres de Córdoba. Desde 1913.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8595484624493248"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="font-body text-white bg-navy antialiased" style={{ overflowX: 'hidden' }}>
        <main>{children}</main>
      </body>
    </html>
  )
}
