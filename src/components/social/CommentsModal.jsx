import { useState, useEffect, useRef } from 'react'
import { X, Send, Trash2 } from 'lucide-react'
import { useAuthStore } from '../../store/appStore'
import * as api from '../../lib/supabaseApi'
import Avatar from '../ui/Avatar'
import { formatRelative } from '../../lib/utils'

export default function CommentsModal({ post, onClose, onCommentAdded }) {
  const { user } = useAuthStore()
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef()
  const inputRef = useRef()

  useEffect(() => {
    api.getComments(post.id)
      .then(c => { setComments(c); setLoading(false) })
      .catch(() => setLoading(false))
  }, [post.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [comments.length])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim() || !user || sending) return
    setSending(true)
    try {
      const raw = await api.createComment(post.id, user.id, text.trim())
      const newComment = {
        id: raw.id, postId: raw.post_id, userId: raw.user_id,
        text: raw.text, createdAt: raw.created_at,
        author: { name: user.name, initials: user.initials, color: user.color },
      }
      setComments(c => [...c, newComment])
      setText('')
      onCommentAdded?.()
    } catch {}
    finally { setSending(false) }
  }

  const handleDelete = async (commentId) => {
    try {
      await api.deleteComment(commentId)
      setComments(c => c.filter(x => x.id !== commentId))
    } catch {}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-h-[80vh] bg-brand-dark rounded-t-3xl border-t border-x border-brand-deep flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-brand-deep" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-brand-deep">
          <h3 className="font-semibold text-brand-cream">
            Comentarios{' '}
            {!loading && <span className="text-brand-muted text-sm font-normal">({comments.length})</span>}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-brand-black/50 text-brand-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0">
          {loading ? (
            <p className="text-center text-brand-muted text-sm py-8">Cargando...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-brand-muted text-sm py-8">Sé el primero en comentar</p>
          ) : (
            comments.map(c => (
              <div key={c.id} className="flex items-start gap-3">
                <Avatar user={c.author} size={8} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-brand-cream">{c.author?.name}</span>
                    <span className="text-xs text-brand-muted">{formatRelative(c.createdAt)}</span>
                  </div>
                  <p className="text-sm text-brand-cream/80 mt-0.5 break-words leading-snug">{c.text}</p>
                </div>
                {user?.id === c.userId && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-brand-muted hover:text-red-400 transition-colors mt-0.5 flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-t border-brand-deep safe-bottom">
          <form onSubmit={handleSend} className="flex items-center gap-2.5">
            {user && <Avatar user={user} size={8} />}
            <input
              ref={inputRef}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Añade un comentario..."
              maxLength={500}
              className="flex-1 bg-brand-black/60 border border-brand-deep rounded-xl px-3.5 py-2.5 text-sm text-brand-cream placeholder-brand-muted focus:outline-none focus:border-brand-gold/50 min-w-0"
            />
            <button
              type="submit"
              disabled={!text.trim() || sending}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-gold text-brand-black disabled:opacity-40 transition-opacity flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
