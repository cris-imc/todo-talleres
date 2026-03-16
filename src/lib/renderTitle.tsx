import React from 'react'

/**
 * Parsea el título para marcar en naranja (u otro color) las secciones entre *asteriscos*.
 * Ejemplo: "*FASSI* confirma el inicio" → "FASSI" en destacado, resto en normal.
 * Si no hay asteriscos, resalta la primera palabra (comportamiento anterior).
 */
export function renderTitle(title: string, isTicker: boolean = false): React.ReactNode {
    if (!title) return null

    // Detectar si hay tokens *...*
    const hasMark = /\*[^*]+\*/.test(title)
    const highlightColor = isTicker ? '#001030' : '#FF6B00'

    if (hasMark) {
        // Dividir por los tokens *...*
        const parts = title.split(/(\*[^*]+\*)/)
        return parts.map((part, i) => {
            if (part && part.startsWith('*') && part.endsWith('*')) {
                // Texto entre asteriscos
                return (
                    <em key={i} style={{ color: highlightColor, fontStyle: 'normal' }}>
                        {part.slice(1, -1)}
                    </em>
                )
            }
            return <span key={i}>{part}</span>
        })
    }

    // Fallback: primera palabra
    const words = title.split(' ')
    return words.map((word, i) =>
        i === 0
            ? <em key={i} style={{ color: highlightColor, fontStyle: 'normal' }}>{word}{' '}</em>
            : <span key={i}>{word}{' '}</span>
    )
}
