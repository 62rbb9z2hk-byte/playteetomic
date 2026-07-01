import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Star, Flag, Waves, MapPin } from 'lucide-react'
import { useDataStore } from '../../store/appStore'

export default function FieldDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getField, matches } = useDataStore()
  const field = getField(id)

  if (!field) return (
    <div className="flex items-center justify-center min-h-screen text-brand-muted">
      <div className="text-center"><p className="text-4xl mb-3">🗺️</p><p>Campo no encontrado</p></div>
    </div>
  )

  const fieldMatches = matches.filter(m => m.fieldId === id)

  return (
    <div className="max-w-lg mx-auto pb-8">
      {/* Hero */}
      <div className={`h-56 bg-gradient-to-br ${field.gradient} relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-brand-black/60 text-white hover:bg-brand-black/80 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-5 left-5 right-5">
          <h1 className="font-serif text-2xl font-black text-white mb-1">{field.name}</h1>
          <div className="flex items-center gap-1.5 text-white/70 text-sm">
            <MapPin className="w-3.5 h-3.5" /> {field.location}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: Flag, label: 'Hoyos', val: field.holes },
            { icon: Star, label: 'Par', val: field.par },
            { icon: Waves, label: 'CR', val: field.courseRating },
            { icon: Waves, label: 'Slope', val: field.slope },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="bg-brand-dark border border-brand-deep rounded-xl p-3 text-center">
              <p className="font-mono font-bold text-brand-gold text-xl">{val}</p>
              <p className="text-xs text-brand-muted mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          {[1,2,3,4,5].map(n => (
            <Star key={n} className={`w-5 h-5 ${n <= Math.round(field.rating || 4.5) ? 'fill-brand-gold text-brand-gold' : 'text-brand-deep'}`} />
          ))}
          <span className="text-brand-muted text-sm ml-1">{field.rating?.toFixed(1) || '4.5'} de 5</span>
        </div>

        {/* Upcoming matches */}
        {fieldMatches.length > 0 && (
          <div>
            <h2 className="font-serif font-bold text-brand-cream mb-3">Partidas en este campo</h2>
            <div className="space-y-3">
              {fieldMatches.slice(0, 3).map(m => (
                <button key={m.id} onClick={() => navigate(`/app/partidas/${m.id}`)}
                  className="w-full flex items-center justify-between bg-brand-dark border border-brand-deep rounded-xl p-4 hover:border-brand-gold/40 transition-all">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-brand-cream capitalize">{m.type}</p>
                    <p className="text-xs text-brand-muted">{new Date(m.date).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-muted">{m.maxPlayers - (m.playerIds?.length || 0)} plazas</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
