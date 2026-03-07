import React from 'react'

interface AdSlotProps {
    name: string
    type: 'banner' | 'rectangle' | 'sidebar'
}

const dimensions: Record<string, { width: number | string; height: number }> = {
    banner: { width: '100%', height: 72 },
    rectangle: { width: 300, height: 250 },
    sidebar: { width: '100%', height: 120 },
}

export const AdSlot: React.FC<AdSlotProps> = ({ name, type }) => {
    const { width, height } = dimensions[type] ?? dimensions.banner

    return (
        <div style={{
            width, height,
            background: 'repeating-linear-gradient(45deg, #06101E, #06101E 10px, #080F1D 10px, #080F1D 20px)',
            border: '1px dashed #1A2D45',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            color: '#2A4060',
            userSelect: 'none',
            margin: '12px 0',
        }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Publicidad</span>
            <span style={{ fontSize: 9, opacity: 0.5 }}>Google AdSense — {name}</span>
        </div>
    )
}
