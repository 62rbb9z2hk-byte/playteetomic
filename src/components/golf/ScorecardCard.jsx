import { useState } from 'react'
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react'

const DEFAULT_PARS = [4,3,5,4,4,3,5,4,4, 4,3,5,4,4,3,5,4,4]

function scoreColor(score, par) {
  if (!score || score === 0) return 'text-brand-muted'
  const diff = score - par
  if (diff <= -2) return 'bg-yellow-400 text-black rounded-full'
  if (diff === -1) return 'bg-brand-green text-black rounded'
  if (diff === 0) return 'text-brand-cream'
  if (diff === 1) return 'bg-red-500/30 text-red-300 rounded'
  return 'bg-red-800/40 text-red-400 rounded'
}

function HalfGrid({ holes, scores, pars, photos, onPhotoClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse min-w-[280px]">
        <thead>
          <tr>
            <td className="py-1 pr-2 text-brand-muted font-semibold w-8">H</td>
            {holes.map(h => (
              <td key={h} className="py-1 text-center text-brand-muted w-7">{h}</td>
            ))}
            <td className="py-1 text-center text-brand-muted font-semibold pl-1">∑</td>
          </tr>
          <tr className="border-t border-brand-deep/40">
            <td className="py-1 pr-2 text-brand-muted">Par</td>
            {pars.map((p, i) => (
              <td key={i} className="py-1 text-center text-brand-muted">{p}</td>
            ))}
            <td className="py-1 text-center text-brand-muted font-semibold pl-1">
              {pars.reduce((a, p) => a + p, 0)}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-brand-deep/40">
            <td className="py-1.5 pr-2 text-brand-muted">Gol</td>
            {scores.map((s, i) => (
              <td key={i} className="py-1.5 text-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 font-mono font-bold text-[11px] ${scoreColor(s, pars[i])}`}>
                  {s && s > 0 ? s : '—'}
                </span>
              </td>
            ))}
            <td className="py-1.5 text-center font-mono font-bold text-brand-cream pl-1">
              {scores.reduce((a, s) => a + (s || 0), 0) || '—'}
            </td>
          </tr>
          {photos && (
            <tr>
              <td className="pt-1 pr-2 text-brand-muted text-[10px]">Foto</td>
              {photos.map((url, i) => (
                <td key={i} className="pt-1 text-center">
                  {url ? (
                    <button onClick={() => onPhotoClick?.(url, holes[i])}
                      className="w-7 h-5 rounded overflow-hidden inline-block hover:opacity-80 transition-opacity">
                      <img src={url} alt={`Hoyo ${holes[i]}`} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ) : (
                    <span className="text-brand-deep text-[10px]">—</span>
                  )}
                </td>
              ))}
              <td />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default function ScorecardCard({ card, field }) {
  const [expanded, setExpanded] = useState(false)
  const [photoModal, setPhotoModal] = useState(null)

  const pars = field?.holePars || card?.pars || DEFAULT_PARS
  const photos = field?.holePhotos || null
  const scores = card.scores || Array(18).fill(0)

  const front9 = { holes: [1,2,3,4,5,6,7,8,9], scores: scores.slice(0,9), pars: pars.slice(0,9), photos: photos?.slice(0,9) }
  const back9  = { holes: [10,11,12,13,14,15,16,17,18], scores: scores.slice(9,18), pars: pars.slice(9,18), photos: photos?.slice(9,18) }

  const frontGross = front9.scores.reduce((a, s) => a + (s || 0), 0)
  const backGross = back9.scores.reduce((a, s) => a + (s || 0), 0)

  return (
    <>
      <div className="bg-brand-dark border border-brand-deep rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 flex items-start justify-between">
          <div>
            <p className="font-semibold text-brand-cream">{card.fieldName || 'Campo'}</p>
            <p className="text-xs text-brand-muted mt-0.5">
              {card.date ? new Date(card.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <Trophy className="w-3.5 h-3.5 text-brand-gold" />
              <span className="font-mono font-black text-xl text-brand-gold">{card.gross}</span>
            </div>
            <p className="text-xs text-brand-muted">{card.stableford} pts Stableford</p>
          </div>
        </div>

        {/* Compact score pills */}
        {!expanded && (
          <div className="px-4 pb-3">
            <div className="flex gap-1 flex-wrap">
              {scores.map((s, i) => {
                const p = pars[i] || 4
                const diff = s - p
                const bg = !s || s === 0 ? 'bg-brand-black/40 text-brand-muted' :
                  diff <= -2 ? 'bg-yellow-400 text-black' :
                  diff === -1 ? 'bg-brand-green text-black' :
                  diff === 0 ? 'bg-brand-deep text-brand-cream' :
                  diff === 1 ? 'bg-red-500/30 text-red-300' : 'bg-red-900/40 text-red-400'
                return (
                  <div key={i} className={`relative w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold ${bg}`}>
                    {s && s > 0 ? s : '—'}
                  </div>
                )
              })}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-brand-muted">
              <span>Out: <b className="text-brand-cream">{frontGross || '—'}</b></span>
              <span>In: <b className="text-brand-cream">{backGross || '—'}</b></span>
            </div>
          </div>
        )}

        {/* Expanded full scorecard */}
        {expanded && (
          <div className="px-4 pb-4 space-y-4 border-t border-brand-deep/40 pt-3">
            <div>
              <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest mb-2">Hoyos 1–9</p>
              <HalfGrid {...front9} onPhotoClick={(url, h) => setPhotoModal({ url, hole: h })} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest mb-2">Hoyos 10–18</p>
              <HalfGrid {...back9} onPhotoClick={(url, h) => setPhotoModal({ url, hole: h })} />
            </div>
          </div>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-brand-deep/40 text-xs text-brand-muted hover:text-brand-cream transition-colors"
        >
          {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> Ocultar desglose</> : <><ChevronDown className="w-3.5 h-3.5" /> Ver desglose hoyo a hoyo</>}
        </button>
      </div>

      {/* Photo modal */}
      {photoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPhotoModal(null)}>
          <div className="max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl">
            <img src={photoModal.url} alt={`Hoyo ${photoModal.hole}`} className="w-full object-cover" />
            <div className="bg-brand-dark px-4 py-3 text-center">
              <p className="font-semibold text-brand-cream">Hoyo {photoModal.hole}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
