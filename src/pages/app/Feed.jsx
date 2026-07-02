import { useNavigate } from 'react-router-dom'
import { Plus, Target, Trophy, Video, Gift } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import PostCard from '../../components/social/PostCard'
import StoryBar from '../../components/social/StoryBar'
import Avatar from '../../components/ui/Avatar'

function HoleInOneChallenge() {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-gold/40 bg-gradient-to-br from-brand-black via-[#1a2a12] to-brand-black mb-6">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 via-transparent to-brand-gold/5 pointer-events-none" />

      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-brand-gold" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">
                Reto activo
              </span>
            </div>
            <h3 className="font-serif font-bold text-brand-cream text-base leading-tight mb-1">
              Reto Hoyo en Uno
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Graba un par 3, haz hoyo en uno, sube el vídeo con tu post y el equipo te contactará con tu premio.
            </p>
          </div>
        </div>

        {/* Prizes */}
        <div className="flex gap-2 mt-3 mb-4">
          {[
            { icon: Gift, label: 'Pack de bolas' },
            { icon: Trophy, label: 'Experiencia golf' },
            { icon: Video, label: 'Protagonista en RRSS' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex-1 bg-brand-deep/60 rounded-xl p-2 flex flex-col items-center gap-1 text-center">
              <Icon className="w-4 h-4 text-brand-gold" />
              <span className="text-[10px] text-brand-muted leading-tight">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/app/feed/nuevo')}
          className="w-full btn-gold text-sm flex items-center justify-center gap-2"
        >
          <Video className="w-4 h-4" />
          Subir mi vídeo de hoyo en uno
        </button>
      </div>
    </div>
  )
}

export default function Feed() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { posts } = useDataStore()

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-black text-brand-cream">
          <span className="text-brand-gold">T</span>ee Feed
        </h1>
        <button onClick={() => navigate('/app/feed/nuevo')} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Post
        </button>
      </div>

      {/* Quick post bar */}
      {user && (
        <div
          className="flex items-center gap-3 bg-brand-dark border border-brand-deep rounded-2xl p-3 mb-6 cursor-pointer hover:border-brand-gold/40 transition-all"
          onClick={() => navigate('/app/feed/nuevo')}>
          <Avatar user={user} size={9} />
          <p className="text-brand-muted text-sm">¿Cómo fue la ronda de hoy, {user.name.split(' ')[0]}?</p>
        </div>
      )}

      {/* Hole-in-one challenge */}
      <HoleInOneChallenge />

      {/* Stories */}
      <div className="mb-6">
        <StoryBar />
      </div>

      {/* Posts */}
      <div className="space-y-5">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  )
}
