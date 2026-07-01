import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Save, LogOut } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import Avatar from '../../components/ui/Avatar'
import HandicapBadge from '../../components/ui/HandicapBadge'
import PostCard from '../../components/social/PostCard'
import MatchCard from '../../components/golf/MatchCard'

const TABS = ['Posts', 'Scorecards', 'Partidas']

export default function MyProfile() {
  const navigate = useNavigate()
  const { user, updateProfile, logout } = useAuthStore()
  const { matches, scorecards, posts, toast } = useDataStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', city: user?.city || '', bio: user?.bio || '' })
  const [tab, setTab] = useState('Posts')

  if (!user) { navigate('/login'); return null }

  const myMatches = matches.filter(m => m.playerIds?.includes(user.id))
  const myCards = scorecards.filter(s => s.userId === user.id)
  const myPosts = posts.filter(p => p.userId === user.id)

  const handleSave = () => { updateProfile(form); toast('Perfil actualizado'); setEditing(false) }
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-serif text-2xl font-black text-brand-cream">Mi perfil</h1>
        <div className="flex gap-2">
          {editing ? (
            <button onClick={handleSave} className="btn-gold flex items-center gap-1.5 text-sm">
              <Save className="w-4 h-4" /> Guardar
            </button>
          ) : (
            <button onClick={() => setEditing(true)} className="btn-outline flex items-center gap-1.5 text-sm">
              <Edit2 className="w-4 h-4" /> Editar
            </button>
          )}
          <button onClick={handleLogout} className="p-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className="gold-top bg-brand-dark border border-brand-deep rounded-2xl p-5 mb-5">
        <div className="flex items-start gap-4">
          <Avatar user={user} size={16} />
          <div className="flex-1 min-w-0">
            {editing ? (
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-base text-lg font-bold mb-2 w-full" />
            ) : (
              <h2 className="font-serif text-xl font-bold text-brand-cream mb-1">{user.name}</h2>
            )}
            <HandicapBadge hcp={user.handicap} size="md" />
            {editing ? (
              <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="input-base text-sm mt-2 w-full" placeholder="Ciudad" />
            ) : (
              <p className="text-sm text-brand-muted mt-1.5">📍 {user.city}</p>
            )}
          </div>
        </div>

        {editing ? (
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="input-base resize-none mt-4 w-full" placeholder="Cuéntanos algo sobre ti..." />
        ) : user.bio ? (
          <p className="text-sm text-brand-cream/80 mt-4 leading-relaxed">{user.bio}</p>
        ) : null}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-brand-deep">
          {[
            { label: 'Posts', val: myPosts.length },
            { label: 'Scorecards', val: myCards.length },
            { label: 'Partidas', val: myMatches.length },
          ].map(({ label, val }) => (
            <div key={label} className="text-center">
              <p className="font-mono font-black text-2xl text-brand-gold">{val}</p>
              <p className="text-xs text-brand-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-deep mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${tab === t ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-muted hover:text-brand-cream'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'Posts' && (
        <div className="space-y-5">
          {myPosts.length === 0
            ? <p className="text-center text-brand-muted py-10">Aún no has publicado nada</p>
            : myPosts.map(p => <PostCard key={p.id} post={p} />)
          }
        </div>
      )}

      {tab === 'Scorecards' && (
        <div className="space-y-3">
          {myCards.length === 0
            ? <p className="text-center text-brand-muted py-10">Aún no tienes scorecards</p>
            : myCards.map((card, i) => (
              <div key={i} className="bg-brand-dark border border-brand-deep rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-brand-cream">{card.fieldName || 'Campo'}</p>
                    <p className="text-xs text-brand-muted">{card.date ? new Date(card.date).toLocaleDateString('es-ES') : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-black text-xl text-brand-gold">{card.gross}</p>
                    <p className="text-xs text-brand-muted">{card.stableford} pts Stableford</p>
                  </div>
                </div>
                {card.scores && (
                  <div className="flex gap-1 flex-wrap mt-2">
                    {card.scores.map((s, h) => (
                      <span key={h} className="w-7 h-7 rounded-lg bg-brand-black border border-brand-deep flex items-center justify-center font-mono text-xs text-brand-cream">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )}

      {tab === 'Partidas' && (
        <div className="space-y-3">
          {myMatches.length === 0
            ? <p className="text-center text-brand-muted py-10">Aún no te has unido a ninguna partida</p>
            : myMatches.map(m => <MatchCard key={m.id} match={m} showJoin={false} />)
          }
        </div>
      )}
    </div>
  )
}
