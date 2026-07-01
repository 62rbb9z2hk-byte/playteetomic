import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Flag } from 'lucide-react'

export default function FieldCard({ field }) {
  const navigate = useNavigate()

  return (
    <div
      className="card-3d bg-brand-dark border border-brand-deep rounded-2xl overflow-hidden cursor-pointer hover:border-brand-gold/40 transition-all group"
      onClick={() => navigate(`/app/campos/${field.id}`)}>

      {/* Hero gradient */}
      <div className={`h-36 bg-gradient-to-br ${field.gradient} relative flex items-end p-4`}>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
        <div className="relative z-10">
          <span className="text-xs font-mono text-white/70">{field.holes} hoyos · Par {field.par}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif font-bold text-brand-cream text-base mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">
          {field.name}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-brand-muted mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{field.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-brand-muted">
            <span className="flex items-center gap-1"><Flag className="w-3 h-3" /> CR {field.courseRating}</span>
            <span>Slope {field.slope}</span>
          </div>
          <div className="flex items-center gap-1 text-brand-gold text-sm font-semibold">
            <Star className="w-3.5 h-3.5 fill-brand-gold" />
            <span>{field.rating?.toFixed(1) || '4.5'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
