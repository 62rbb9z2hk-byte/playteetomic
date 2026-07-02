import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Save, LogOut, ShieldCheck, MapPin, Flag, Award } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { MUNICIPALITIES } from '../../lib/municipalities'
import Avatar from '../../components/ui/Avatar'
import HandicapBadge from '../../components/ui/HandicapBadge'
import PostCard from '../../components/social/PostCard'
import MatchCard from '../../components/golf/MatchCard'
import ScorecardCard from '../../components/golf/ScorecardCard'

const TABS = ['Posts', 'Scorecards', 'Partidas', 'Campos']

export default function MyProfile() {
  const navigate = useNavigate()
  const { user, updateProfile, logout } = useAuthStore()
  const { matches, scorecards, posts, fields, toast } = useDataStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    city: user?.city || '',
    municipality: user?.municipality || '',
    bio: user?.bio || '',
  })
  const [tab, setTab] = useState('Posts')

  if (!user) { navigate('/login'); return null }

  const myMatches = matches.filter(m => m.playerIds?.includes(user.id))
  const myCards = scorecards.filter(s => s.userId === user.id)
  const myPosts = posts.filter(p => p.userId === user.id)

  // Unique fields played from scorecards
  const playedFieldIds = [...new Set(myCards.map(c => c.fieldId).filter(Boolean))]
  const playedFieldNames = [...new Set(myCards.map(c => c.fieldName).filter(Boolean))]
  const playedFields = fields.filter(f => playedFieldIds.includes(f.id))
  // Also include by name match for demo seed data
  const playedByName = fields.filter(f => playedFieldNames.includes(f.name) && !playedFields.find(pf => pf.id === f.id))
  const allPlayedFields = [...playedFields, ...playedByName]

  // Tournaments from matches (competitive type)
  const myTournaments = myMatches.filter(m => m.type === 'competitive')

  const handleSave = () => {
    updateProfile(form)
    toast('Perfil actualizado')
    setEditing(false)
  }
  const handleLogout = () => { logout(); navigate('/') }

  // Province list for municipality dropdown
  const municipalityOptions = MUNICIPALITIES.map(m => ({ value: m.name, label: `${m.name} (${m.province})` }))

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
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <HandicapBadge hcp={user.handicap} size="md" />
              {user.rfeg_license && (
                <span className="flex items-center gap-1 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-semibold px-2 py-0.5 rounded-lg">
                  <ShieldCheck className="w-3 h-3" /> RFEG verificado
                </span>
              )}
            </div>

            {editing ? (
              <div className="mt-2 space-y-2">
                <input
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="input-base text-sm w-full"
                  placeholder="Provincia / Ciudad"
                />
                <select
                  value={form.municipality}
                  onChange={e => setForm(f => ({ ...f, municipality: e.target.value }))}
                  className="input-base text-sm w-full"
                >
                  <option value="">Selecciona municipio...</option>
                  {municipalityOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-sm text-brand-muted mt-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {user.municipality ? `${user.municipality}, ${user.city}` : user.city}
              </p>
            )}
          </div>
        </div>

        {editing ? (
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="input-base resize-none mt-4 w-full" placeholder="Cuéntanos algo sobre ti..." />
        ) : user.bio ? (
          <p className="text-sm text-brand-cream/80 mt-4 leading-relaxed">{user.bio}</p>
        ) : null}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-brand-deep">
          {[
            { label: 'Posts', val: myPosts.length },
            { label: 'Scorecards', val: myCards.length },
            { label: 'Partidas', val: myMatches.length },
            { label: 'Campos', val: allPlayedFields.length },
          ].map(({ label, val }) => (
            <div key={label} className="text-center">
              <p className="font-mono font-black text-xl text-brand-gold">{val}</p>
              <p className="text-[11px] text-brand-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-deep mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors border-b-2 -mb-px ${tab === t ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-muted hover:text-brand-cream'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Posts */}
      {tab === 'Posts' && (
        <div className="space-y-5">
          {myPosts.length === 0
            ? <p className="text-center text-brand-muted py-10">Aún no has publicado nada</p>
            : myPosts.map(p => <PostCard key={p.id} post={p} />)
          }
        </div>
      )}

      {/* Tab: Scorecards */}
      {tab === 'Scorecards' && (
        <div className="space-y-3">
          {myCards.length === 0
            ? <p className="text-center text-brand-muted py-10">Aún no tienes scorecards</p>
            : myCards.map((card, i) => {
                const field = fields.find(f => f.id === card.fieldId)
                return <ScorecardCard key={card.id || i} card={card} field={field} />
              })
          }
        </div>
      )}

      {/* Tab: Partidas */}
      {tab === 'Partidas' && (
        <div className="space-y-3">
          {myMatches.length === 0
            ? <p className="text-center text-brand-muted py-10">Aún no te has unido a ninguna partida</p>
            : myMatches.map(m => <MatchCard key={m.id} match={m} showJoin={false} />)
          }
        </div>
      )}

      {/* Tab: Campos (badges) */}
      {tab === 'Campos' && (
        <div>
          {/* Tournaments */}
          {myTournaments.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-brand-gold" />
                <h3 className="text-sm font-bold text-brand-cream">Torneos jugados</h3>
              </div>
              <div className="flex flex-col gap-2">
                {myTournaments.map(t => {
                  const field = fields.find(f => f.id === t.fieldId)
                  return (
                    <div key={t.id} className="flex items-center gap-3 bg-brand-deep rounded-xl p-3 border border-brand-gold/20">
                      <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-cream">{field?.name || 'Campo'}</p>
                        <p className="text-xs text-brand-muted">{new Date(t.date).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Fields played */}
          <div className="flex items-center gap-2 mb-3">
            <Flag className="w-4 h-4 text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-cream">Campos jugados</h3>
          </div>

          {allPlayedFields.length === 0 ? (
            <div className="text-center py-10">
              <Flag className="w-10 h-10 text-brand-deep mx-auto mb-3" />
              <p className="text-brand-muted text-sm">Guarda una scorecard para ganar tu primera medalla</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {allPlayedFields.map(field => {
                const timesPlayed = myCards.filter(c => c.fieldId === field.id || c.fieldName === field.name).length
                return (
                  <button
                    key={field.id}
                    onClick={() => navigate(`/app/campos/${field.id}`)}
                    className={`relative bg-gradient-to-br ${field.gradient} rounded-2xl p-4 text-left border border-brand-gold/30 hover:border-brand-gold/60 transition-all shadow-lg`}
                  >
                    {/* Medal badge */}
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-brand-gold flex items-center justify-center shadow-md">
                      <span className="text-[10px] font-black text-brand-black">{timesPlayed}×</span>
                    </div>
                    <Flag className="w-5 h-5 text-white/70 mb-2" />
                    <p className="text-xs font-bold text-white leading-tight line-clamp-2">{field.name}</p>
                    <p className="text-[10px] text-white/60 mt-1">{field.location}</p>
                  </button>
                )
              })}
            </div>
          )}

          {/* All available fields (greyed out) */}
          {fields.filter(f => !allPlayedFields.find(pf => pf.id === f.id)).length > 0 && (
            <>
              <p className="text-xs text-brand-muted text-center mt-6 mb-3">Por conquistar</p>
              <div className="grid grid-cols-3 gap-2">
                {fields.filter(f => !allPlayedFields.find(pf => pf.id === f.id)).map(field => (
                  <button
                    key={field.id}
                    onClick={() => navigate(`/app/campos/${field.id}`)}
                    className="relative rounded-xl p-3 border border-brand-deep bg-brand-deep/30 text-center opacity-50 hover:opacity-70 transition-opacity"
                  >
                    <div className="w-7 h-7 rounded-full border-2 border-dashed border-brand-muted mx-auto mb-1.5 flex items-center justify-center">
                      <Flag className="w-3.5 h-3.5 text-brand-muted" />
                    </div>
                    <p className="text-[9px] text-brand-muted leading-tight line-clamp-2">{field.name.replace('Real Club de Golf', 'RCG').replace('Club de Golf', 'CG')}</p>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
