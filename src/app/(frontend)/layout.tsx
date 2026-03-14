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
  title: 'Talleres de Córdoba — Web Oficial',
  description: 'Sitio web oficial del Club Atlético Talleres de Córdoba. Desde 1913.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="es" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body className="font-body text-white bg-navy antialiased" style={{ overflowX: 'hidden' }}>
        <main>{children}</main>
      </body>
    </html>
  )
}
