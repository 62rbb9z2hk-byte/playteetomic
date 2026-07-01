import { Heart, MessageCircle, Share2, Trophy } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { formatRelative } from '../../lib/utils'
import Avatar from '../ui/Avatar'

export default function PostCard({ post }) {
  const { user } = useAuthStore()
  const { getUser, toggleLike, isLiked } = useDataStore()
  const author = getUser(post.userId)
  const liked = isLiked(post.id, user?.id)

  const handleLike = () => {
    if (!user) return
    toggleLike(post.id, user.id)
  }

  return (
    <article className="bg-brand-dark border border-brand-deep rounded-2xl overflow-hidden">
      {/* Image */}
      <div className={`h-56 bg-gradient-to-br ${post.imageGradient} relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
        {post.scorecard && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-brand-black/80 text-brand-gold text-xs font-mono font-bold px-2 py-1 rounded-lg border border-brand-gold/30">
              <Trophy className="w-3 h-3" /> {post.scorecard.total}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar user={author} size={8} />
          <div>
            <p className="font-semibold text-sm text-brand-cream">{author?.name}</p>
            <p className="text-xs text-brand-muted">{formatRelative(post.createdAt)}</p>
          </div>
        </div>

        {/* Text */}
        <p className="text-sm text-brand-cream/90 leading-relaxed mb-3">{post.text}</p>

        {/* Scorecard mini */}
        {post.scorecard && (
          <div className="bg-brand-black/50 rounded-xl p-3 mb-3 border border-brand-deep">
            <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
              <span className="font-semibold text-brand-gold">Scorecard · {post.scorecard.field}</span>
              <span className="font-mono">{post.scorecard.date}</span>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {post.scorecard.scores?.map((s, i) => {
                const par = post.scorecard.pars?.[i] || 4
                const diff = s - par
                const cls = diff <= -2 ? 'bg-yellow-400 text-black' : diff === -1 ? 'bg-brand-green text-black' : diff === 0 ? 'text-brand-muted' : diff === 1 ? 'bg-red-500/20 text-red-400' : 'bg-red-800/20 text-red-600'
                return (
                  <div key={i} className={`rounded text-center py-0.5 text-[11px] font-mono font-bold ${cls}`}>{s}</div>
                )
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-red-400' : 'text-brand-muted hover:text-red-400'}`}>
            <Heart className={`w-4.5 h-4.5 ${liked ? 'fill-red-400' : ''}`} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-cream transition-colors">
            <MessageCircle className="w-4.5 h-4.5" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-cream transition-colors ml-auto">
            <Share2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </article>
  )
}
