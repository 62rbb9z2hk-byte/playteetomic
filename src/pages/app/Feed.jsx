import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import PostCard from '../../components/social/PostCard'
import StoryBar from '../../components/social/StoryBar'
import Avatar from '../../components/ui/Avatar'

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
