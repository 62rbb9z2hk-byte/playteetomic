import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, Lock } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { formatDate, matchTypeLabel, spotsLeft, canJoin } from '../../lib/utils'
import Avatar from '../ui/Avatar'
import HandicapBadge from '../ui/HandicapBadge'

export default function MatchCard({ match, showJoin = true }) {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { getUser, getField, joinMatch, leaveMatch, toast } = useDataStore()

  const field = getField(match.fieldId)
  const players = (match.playerIds || []).map(id => getUser(id)).filter(Boolean)
  const spots = spotsLeft(match)
  const joined = match.playerIds?.includes(user?.id)
  const { label: typeLabel, color: typeColor, bg: typeBg } = matchTypeLabel(match.type)

  const handleJoin = (e) => {
    e.stopPropagation()
    if (!user) { navigate('/login'); return }
    if (joined) {
      leaveMatch(match.id, user.id)
      toast('Has abandonado la partida', 'info')
    } else if (canJoin(match, user.handicap)) {
      joinMatch(match.id, user.id)
      toast('¡Te has apuntado a la partida!')
    } else {
      toast('No cumples los requisitos de handicap', 'error')
    }
  }

  return (
    <div
      className="card-3d bg-brand-dark border border-brand-deep rounded-2xl p-5 cursor-pointer hover:border-brand-gold/40 transition-all group"
      onClick={() => navigate(`/app/partidas/${match.id}`)}>

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${typeBg} ${typeColor}`}>
            {typeLabel}
          </span>
          {match.type === 'competitive' && <Lock className="inline w-3 h-3 ml-1 text-brand-muted" />}
        </div>
        <HandicapBadge hcp={match.hcpMin} size="sm" />
      </div>

      {/* Field */}
      <h3 className="font-serif font-bold text-brand-cream text-lg mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">
        {field?.name || 'Campo desconocido'}
      </h3>

      {/* Meta */}
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-brand-muted">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{formatDate(match.date)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-brand-muted">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{field?.location || '—'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-brand-muted">
          <Users className="w-3.5 h-3.5 flex-shrink-0" />
          <span>HCP {match.hcpMin}–{match.hcpMax} · {spots} plaza{spots !== 1 ? 's' : ''} libre{spots !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Players + CTA */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {players.slice(0, 4).map(p => <Avatar key={p.id} user={p} size={7} className="ring-2 ring-brand-dark" />)}
          {players.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-brand-deep flex items-center justify-center text-[10px] text-brand-muted ring-2 ring-brand-dark">
              +{players.length - 4}
            </div>
          )}
        </div>

        {showJoin && (
          <button
            onClick={handleJoin}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${joined ? 'border border-brand-muted text-brand-muted hover:border-red-400 hover:text-red-400' : spots === 0 ? 'bg-brand-deep text-brand-muted cursor-not-allowed' : 'btn-gold text-xs'}`}
            disabled={!joined && spots === 0}>
            {joined ? 'Salir' : spots === 0 ? 'Completo' : 'Unirse'}
          </button>
        )}
      </div>
    </div>
  )
}
