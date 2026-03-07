'use client'

import React from 'react'
import Link from 'next/link'

interface TickerProps {
    newsBase?: { title: string; slug: string }[]
}

const mockNews = [
    { title: "Victoria en el Kempes ante el clásico rival", slug: "victoria-clasico" },
    { title: "Nuevas incorporaciones para el plantel 2026", slug: "nuevas-incorporaciones" },
    { title: "Avanzan las obras en el Centro de Alto Rendimiento", slug: "obras-car" },
    { title: "Venta de entradas para el partido de Copa", slug: "entradas-copa" },
    { title: "Convocados a la Selección Nacional", slug: "convocados-seleccion" }
]

export const Ticker: React.FC<TickerProps> = ({ newsBase = mockNews }) => {
    return (
        <div className="bg-orange h-[32px] flex items-center overflow-hidden">
            <div className="bg-orange-dk font-display font-extrabold text-[11px] tracking-[2px] uppercase px-4 h-full flex items-center whitespace-nowrap shrink-0 z-10">
                ⚡ ÚLTIMAS
            </div>
            <div className="flex flex-1 overflow-hidden">
                {/* Usamos dos contenedores duplicados para el scroll infinito y suave */}
                <div className="flex gap-[60px] whitespace-nowrap animate-tickerScroll pr-[60px]">
                    {newsBase.map((item, idx) => (
                        <span key={`ticker-1-${idx}`} className="text-[12px] font-semibold tracking-[0.5px] text-white flex items-center before:content-['•'] before:mr-2 before:opacity-60">
                            <Link href={`/noticias/${item.slug}`} className="hover:underline">
                                {item.title}
                            </Link>
                        </span>
                    ))}
                </div>
                <div className="flex gap-[60px] whitespace-nowrap animate-tickerScroll pr-[60px]" aria-hidden="true">
                    {newsBase.map((item, idx) => (
                        <span key={`ticker-2-${idx}`} className="text-[12px] font-semibold tracking-[0.5px] text-white flex items-center before:content-['•'] before:mr-2 before:opacity-60">
                            <Link href={`/noticias/${item.slug}`} className="hover:underline">
                                {item.title}
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
