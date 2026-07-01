import { useState } from 'react'
import { Heart, MessageCircle, Share2, Trophy, Trash2 } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { formatRelative } from '../../lib/utils'
import Avatar from '../ui/Avatar'
import CommentsModal from './CommentsModal'

export default function PostCard({ post }) {
  const { user } = useAuthStore()
  const { getUser, toggleLike, isLiked, deletePost, patchPostComments } = useDataStore()
  const author = post.author || getUser(post.userId)
  const liked = isLiked(post.id, user?.id)
  const isOwn = user?.id === post.userId
  const [showComments, setShowComments] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleLike = () => {
    if (!user) return
    toggleLike(post.id, user.id)
  }

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return }
    await deletePost(post.id)
  }

  const photos = Array.isArray(post.photos) ? post.photos : []

  return (
    <>
      <article className="bg-brand-dark border border-brand-deep rounded-2xl overflow-hidden">
        {/* Image / gradient */}
        {photos.length > 0 ? (
          <div className={`relative ${photos.length === 1 ? 'h-56' : 'h-48'}`}>
            <div className={`grid h-full ${photos.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-0.5`}>
              {photos.slice(0, 3).map((url, i) => (
                <div
                  key={i}
                  className={`overflow-hidden ${photos.length === 3 && i === 0 ? 'row-span-2' : ''}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`h-48 bg-gradient-to-br ${post.imageGradient} relative`}>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
            {post.scorecard && (
              <div className="absolute top-3 right-3">
                <span className="flex items-center gap-1 bg-brand-black/80 text-brand-gold text-xs font-mono font-bold px-2 py-1 rounded-lg border border-brand-gold/30">
                  <Trophy className="w-3 h-3" /> {post.scorecard.gross ?? post.scorecard.total}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-4">
          {/* Author row */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar user={author} size={8} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-brand-cream truncate">{author?.name}</p>
              <p className="text-xs text-brand-muted">{formatRelative(post.createdAt)}</p>
            </div>
            {isOwn && (
              <button
                onClick={handleDelete}
                onBlur={() => setConfirmDelete(false)}
                className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${confirmDelete ? 'bg-red-500/20 text-red-400' : 'text-brand-muted hover:text-red-400'}`}
                title={confirmDelete ? 'Toca de nuevo para confirmar' : 'Eliminar post'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Text */}
          <p className="text-sm text-brand-cream/90 leading-relaxed mb-3">{post.text}</p>

          {/* Scorecard mini */}
          {post.scorecard && (
            <div className="bg-brand-black/50 rounded-xl p-3 mb-3 border border-brand-deep">
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                <span className="font-semibold text-brand-gold flex items-center gap-1">
                  <Trophy className="w-3 h-3" /> Scorecard
                </span>
                <span className="font-mono font-bold text-brand-cream">
                  {post.scorecard.gross ?? post.scorecard.total} golpes
                </span>
              </div>
              {post.scorecard.scores && (
                <div className="flex gap-1 flex-wrap">
                  {post.scorecard.scores.slice(0, 18).map((s, i) => {
                    const par = post.scorecard.pars?.[i] || 4
                    const diff = s - par
                    const cls = diff <= -2 ? 'bg-yellow-400 text-black' : diff === -1 ? 'bg-brand-green text-black' : diff === 0 ? 'text-brand-muted border border-brand-deep' : diff === 1 ? 'bg-red-500/20 text-red-400' : 'bg-red-800/30 text-red-500'
                    return (
                      <div key={i} className={`w-6 h-6 rounded text-center text-[10px] font-mono font-bold flex items-center justify-center ${cls}`}>{s}</div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-red-400' : 'text-brand-muted hover:text-red-400'}`}
            >
              <Heart className={`w-4 h-4 transition-all ${liked ? 'fill-red-400 scale-110' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(true)}
              className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-cream transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-cream transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {showComments && (
        <CommentsModal
          post={post}
          onClose={() => setShowComments(false)}
          onCommentAdded={() => patchPostComments(post.id, 1)}
        />
      )}
    </>
  )
}
