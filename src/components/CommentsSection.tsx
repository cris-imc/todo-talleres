'use client'

import React, { useState, useEffect } from 'react'
import { createCommentServer, editCommentServer, deleteCommentServer } from '../lib/commentActions'

export interface Comentario {
    id: string
    nombre: string
    comentario: string
    padre_id?: string | null
    aprobado: boolean
    createdAt: string
    autor_token?: string
}

interface Props {
    noticiaId: string | number
    initialComments: Comentario[]
}

const CommentBox = ({
    initialName, initialText, isReply = false, onCancel, onSubmit, error
}: {
    initialName: string, initialText: string, isReply?: boolean,
    onCancel?: () => void, onSubmit: (nombre: string, texto: string) => Promise<void>, error?: string
}) => {
    const [nombre, setNombre] = useState(initialName)
    const [texto, setTexto] = useState(initialText)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialName) setNombre(initialName)
    }, [initialName])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(nombre, texto)
        if (!isReply) setTexto('') // Only clear if main box
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {error && <p style={{ color: '#ef4444', fontSize: 13 }}>{error}</p>}
            <input
                type="text"
                placeholder="Tu Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{
                    padding: '10px 14px', borderRadius: 6, background: '#0B1929', border: '1px solid #1A2D45',
                    color: 'white', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none'
                }}
            />
            <textarea
                placeholder="Escribe tu comentario..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
                rows={isReply ? 2 : 4}
                style={{
                    padding: '10px 14px', borderRadius: 6, background: '#0B1929', border: '1px solid #1A2D45',
                    color: 'white', fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none', resize: 'vertical'
                }}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                {isReply && (
                    <button type="button" onClick={onCancel} style={{ background: 'transparent', color: '#7A94B0', fontSize: 13, border: 'none', cursor: 'pointer' }}>
                        Cancelar
                    </button>
                )}
                <button type="submit" disabled={loading} style={{
                    background: '#FF6B00', color: 'white', padding: '8px 24px', borderRadius: 6, border: 'none',
                    fontWeight: 700, fontFamily: 'var(--font-display)', textTransform: 'uppercase', cursor: loading ? 'default' : 'pointer',
                    opacity: loading ? 0.7 : 1
                }}>
                    {loading ? 'Enviando...' : (isReply ? 'Responder / Editar' : 'Comentar')}
                </button>
            </div>
        </form>
    )
}

export function CommentsSection({ noticiaId, initialComments }: Props) {
    const [comments, setComments] = useState<Comentario[]>(initialComments)
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deviceToken, setDeviceToken] = useState<string>('')
    const [savedName, setSavedName] = useState<string>('')
    const [error, setError] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('device_token')
        if (!token) {
            token = Math.random().toString(36).substring(2, 15)
            localStorage.setItem('device_token', token)
        }
        setDeviceToken(token)

        const name = localStorage.getItem('comment_author_name')
        if (name) setSavedName(name)
    }, [])

    const mainComments = comments.filter(c => !c.padre_id && c.aprobado)

    const handleCreate = async (nombre: string, comentario: string, parentId: string | null = null) => {
        try {
            setError('')
            localStorage.setItem('comment_author_name', nombre)
            setSavedName(nombre)

            const doc = await createCommentServer({
                noticia: noticiaId,
                nombre,
                comentario,
                padre_id: parentId,
                autor_token: deviceToken
            })
            setComments(prev => [...prev, doc as unknown as Comentario])
            if (parentId) setReplyingTo(null)
        } catch (err) {
            setError('Ocurrió un error. Inténtalo de nuevo.')
            throw err
        }
    }

    const handleEdit = async (id: string, nuevoNombre: string, nuevoTexto: string) => {
        try {
            setError('')
            localStorage.setItem('comment_author_name', nuevoNombre)
            setSavedName(nuevoNombre)

            const doc = await editCommentServer(id, deviceToken, nuevoTexto)
            setComments(prev => prev.map(c => c.id === id ? { ...c, comentario: nuevoTexto } : c))
            setEditingId(null)
        } catch (err: any) {
            alert(err.message || "Error al editar")
        }
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Seguro que querés borrar este comentario?")) return
        try {
            await deleteCommentServer(id, deviceToken)
            setComments(prev => prev.filter(c => c.id !== id && c.padre_id !== id))
        } catch (err: any) {
            alert(err.message || "Error al borrar")
        }
    }

    const renderComment = (c: Comentario) => {
        const replies = comments.filter(r => r.padre_id === c.id && r.aprobado)
        const isReplying = replyingTo === c.id
        const isEditing = editingId === c.id
        const isMine = c.autor_token === deviceToken

        return (
            <div key={c.id} style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{
                        width: 40, height: 40, borderRadius: '50%', background: '#1A2D45', color: '#C8D8EC',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
                        flexShrink: 0
                    }}>
                        {c.nombre[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                            <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{c.nombre}</span>
                            <span style={{ color: '#7A94B0', fontSize: 11 }}>
                                {new Date(c.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isMine && !isEditing && (
                                <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                                    <button onClick={() => setEditingId(c.id)} style={{ background: 'none', border: 'none', color: '#7A94B0', fontSize: 11, cursor: 'pointer' }}>Editar</button>
                                    <button onClick={() => handleDelete(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 11, cursor: 'pointer' }}>Borrar</button>
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <CommentBox
                                initialName={c.nombre}
                                initialText={c.comentario}
                                isReply={true}
                                onCancel={() => setEditingId(null)}
                                onSubmit={(n, text) => handleEdit(c.id, n, text)}
                            />
                        ) : (
                            <p style={{ color: '#C8D8EC', fontSize: 15, marginTop: 4, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{c.comentario}</p>
                        )}

                        {!c.padre_id && !isEditing && (
                            <button onClick={() => setReplyingTo(isReplying ? null : c.id)} style={{
                                background: 'transparent', border: 'none', color: '#FF6B00', fontSize: 12, fontWeight: 700,
                                marginTop: 8, cursor: 'pointer', padding: 0
                            }}>
                                Responder
                            </button>
                        )}

                        {isReplying && (
                            <CommentBox
                                initialName={savedName}
                                initialText=""
                                isReply={true}
                                onCancel={() => setReplyingTo(null)}
                                onSubmit={(n, text) => handleCreate(n, text, c.id)}
                            />
                        )}

                        {replies.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16, paddingLeft: 16, borderLeft: '2px solid #1A2D45' }}>
                                {replies.map(renderComment)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ marginTop: 40, paddingTop: 40, borderTop: '1px solid #1A2D45' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', textTransform: 'uppercase', marginBottom: 24 }}>
                Comentarios ({comments.filter(c => c.aprobado).length})
            </h3>
            
            <div style={{ marginBottom: 40 }}>
                <CommentBox
                    initialName={savedName}
                    initialText=""
                    onSubmit={(n, text) => handleCreate(n, text, null)}
                    error={error}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mainComments.length === 0 ? (
                    <p style={{ color: '#7A94B0', fontSize: 14 }}>Sé el primero en comentar.</p>
                ) : (
                    mainComments.map(renderComment)
                )}
            </div>
        </div>
    )
}
