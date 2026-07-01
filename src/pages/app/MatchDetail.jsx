import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Calendar, MapPin, Users, Trophy } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { formatDate, matchTypeLabel, spotsLeft, canJoin } from '../../lib/utils'
import Avatar from '../../components/ui/Avatar'
import HandicapBadge from '../../components/ui/HandicapBadge'

export default function MatchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { getMatch, getUser, getField, joinMatch, leaveMatch, toast } = useDataStore()
  const match = getMatch(id)

  if (!match) return (
    <div className="flex items-center justify-center min-h-screen text-brand-muted">
      <div className="text-center">
        <p className="text-4xl mb-3">⛳️</p>
        <p>Partida no encontrada</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn-outline">Volver</button>
      </div>
    </div>
  )

  const field = getField(match.fieldId)
  const players = (match.playerIds || []).map(id => getUser(id)).filter(Boolean)
  const joined = match.playerIds?.includes(user?.id)
  const spots = spotsLeft(match)
  const { label: typeLabel, color: typeColor, bg: typeBg } = matchTypeLabel(match.type)

  const handleJoin = () => {
    if (!user) { navigate('/login'); return }
    if (joined) {
      leaveMatch(match.id, user.id)
      toast('Has abandonado la partida')
    } else if (canJoin(match, user.handicap)) {
      joinMatch(match.id, user.id)
      toast('¡Te has apuntado!')
    } else {
      toast('No cumples el rango de handicap', 'error')
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-muted hover:text-brand-cream mb-6 text-sm transition-colors">
        <ChevronLeft className="w-4 h-4" /> Partidas
      </button>

      {/* Hero */}
      <div className={`h-40 rounded-2xl bg-gradient-to-br ${field?.gradient || 'from-brand-field to-brand-deep'} mb-6 relative flex items-end p-5`}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-brand-black/70 to-transparent" />
        <div className="relative z-10">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${typeBg} ${typeColor} mb-2 inline-block`}>{typeLabel}</span>
          <h1 className="font-serif text-2xl font-black text-white">{field?.name}</h1>
        </div>
      </div>

      {/* Info */}
      <div className="bg-brand-dark border border-brand-deep rounded-2xl p-5 mb-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-brand-muted">
          <Calendar className="w-4 h-4" /> <span>{formatDate(match.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-muted">
          <MapPin className="w-4 h-4" /> <span>{field?.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-muted">
          <Users className="w-4 h-4" /> <span>{players.length}/{match.maxPlayers} jugadores · {spots} plazas libres</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-brand-muted">
          <Trophy className="w-4 h-4" /> <span>Handicap {match.hcpMin}–{match.hcpMax}</span>
        </div>
      </div>

      {/* Players */}
      <div className="mb-6">
        <h2 className="font-serif font-bold text-brand-cream mb-3">Jugadores ({players.length})</h2>
        <div className="space-y-3">
          {players.map(p => (
            <div key={p.id} className="flex items-center gap-3 bg-brand-dark border border-brand-deep rounded-xl p-3">
              <Avatar user={p} size={9} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-brand-cream">{p.name}</p>
                <p className="text-xs text-brand-muted">{p.city}</p>
              </div>
              <HandicapBadge hcp={p.handicap} />
            </div>
          ))}
          {Array.from({ length: spots }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 bg-brand-dark/50 border border-dashed border-brand-deep/50 rounded-xl p-3">
              <div className="w-9 h-9 rounded-full bg-brand-deep/50 flex items-center justify-center text-brand-muted/50">?</div>
              <p className="text-sm text-brand-muted/50">Plaza libre</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button onClick={handleJoin}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${joined ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20' : spots === 0 ? 'bg-brand-deep text-brand-muted cursor-not-allowed' : 'btn-gold justify-center'}`}
        disabled={!joined && spots === 0}>
        {joined ? 'Abandonar partida' : spots === 0 ? 'Partida completa' : 'Unirse a la partida'}
      </button>
    </div>
  )
}
