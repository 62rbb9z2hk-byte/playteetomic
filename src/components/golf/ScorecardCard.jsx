import { useState } from 'react'
import { ChevronDown, ChevronUp, Trophy, Pencil, Trash2, Check, X } from 'lucide-react'
import { useDataStore } from '../../store/appStore'

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

function HalfGrid({ holes, scores, pars, photos, onPhotoClick, editMode, editScores, onScoreChange }) {
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
                {editMode ? (
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={editScores[holes[i] - 1] || ''}
                    onChange={e => onScoreChange(holes[i] - 1, e.target.value)}
                    className="w-8 h-7 text-center text-xs font-mono font-bold bg-brand-deep border border-brand-field/40 rounded text-brand-cream focus:border-brand-gold outline-none"
                  />
                ) : (
                  <span className={`inline-flex items-center justify-center w-6 h-6 font-mono font-bold text-[11px] ${scoreColor(s, pars[i])}`}>
                    {s && s > 0 ? s : '—'}
                  </span>
                )}
              </td>
            ))}
            <td className="py-1.5 text-center font-mono font-bold text-brand-cream pl-1">
              {editMode
                ? (editScores.slice(holes[0]-1, holes[holes.length-1]).reduce((a, s) => a + (Number(s) || 0), 0) || '—')
                : (scores.reduce((a, s) => a + (s || 0), 0) || '—')
              }
            </td>
          </tr>
          {photos && !editMode && (
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
  const { deleteScorecard, updateScorecard } = useDataStore()
  const [expanded, setExpanded] = useState(false)
  const [photoModal, setPhotoModal] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editScores, setEditScores] = useState([])
  const [saving, setSaving] = useState(false)

  const pars = field?.holePars || card?.pars || DEFAULT_PARS
  const photos = field?.holePhotos || null
  const scores = card.scores || Array(18).fill(0)

  const front9 = { holes: [1,2,3,4,5,6,7,8,9], scores: scores.slice(0,9), pars: pars.slice(0,9), photos: photos?.slice(0,9) }
  const back9  = { holes: [10,11,12,13,14,15,16,17,18], scores: scores.slice(9,18), pars: pars.slice(9,18), photos: photos?.slice(9,18) }

  const frontGross = front9.scores.reduce((a, s) => a + (s || 0), 0)
  const backGross = back9.scores.reduce((a, s) => a + (s || 0), 0)

  function startEdit() {
    setEditScores([...scores])
    setEditMode(true)
    setExpanded(true)
  }

  function cancelEdit() {
    setEditMode(false)
    setEditScores([])
  }

  async function saveEdit() {
    setSaving(true)
    const newScores = editScores.map(s => Number(s) || 0)
    const gross = newScores.reduce((a, s) => a + s, 0)
    const stableford = newScores.reduce((a, s, i) => {
      if (!s) return a
      const pts = Math.max(0, 2 + (pars[i] || 4) - s)
      return a + pts
    }, 0)
    await updateScorecard(card.id, { scores: newScores, gross, stableford })
    setSaving(false)
    setEditMode(false)
    setEditScores([])
  }

  function handleScoreChange(idx, val) {
    setEditScores(prev => {
      const next = [...prev]
      next[idx] = val === '' ? 0 : Math.max(1, Math.min(15, Number(val)))
      return next
    })
  }

  async function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return }
    await deleteScorecard(card.id)
  }

  const displayScores = editMode ? editScores : scores

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
          <div className="flex items-start gap-2">
            <div className="text-right">
              <div className="flex items-center gap-1.5 justify-end">
                <Trophy className="w-3.5 h-3.5 text-brand-gold" />
                <span className="font-mono font-black text-xl text-brand-gold">
                  {editMode
                    ? (editScores.reduce((a, s) => a + (Number(s) || 0), 0) || card.gross)
                    : card.gross
                  }
                </span>
              </div>
              <p className="text-xs text-brand-muted">
                {editMode
                  ? `${editScores.reduce((a, s, i) => { if (!Number(s)) return a; return a + Math.max(0, 2 + (pars[i]||4) - Number(s)) }, 0)} pts`
                  : `${card.stableford} pts Stableford`
                }
              </p>
            </div>
            {/* Action buttons */}
            {!editMode && (
              <div className="flex gap-1">
                <button onClick={startEdit}
                  className="p-1.5 rounded-lg text-brand-muted hover:text-brand-cream hover:bg-brand-deep/60 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDelete}
                  onBlur={() => setTimeout(() => setConfirmDelete(false), 200)}
                  className={`p-1.5 rounded-lg transition-colors ${confirmDelete ? 'text-red-400 bg-red-500/20' : 'text-brand-muted hover:text-red-400 hover:bg-brand-deep/60'}`}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {editMode && (
              <div className="flex gap-1">
                <button onClick={saveEdit} disabled={saving}
                  className="p-1.5 rounded-lg text-brand-green bg-brand-green/15 hover:bg-brand-green/25 transition-colors disabled:opacity-50">
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button onClick={cancelEdit}
                  className="p-1.5 rounded-lg text-brand-muted hover:text-brand-cream hover:bg-brand-deep/60 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {confirmDelete && !editMode && (
          <div className="mx-4 mb-3 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center justify-between">
            <span>¿Eliminar esta scorecard?</span>
            <button onClick={handleDelete} className="text-red-400 font-semibold hover:text-red-300">Confirmar</button>
          </div>
        )}

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
            {editMode && (
              <p className="text-xs text-brand-gold/80">Edita los golpes de cada hoyo y pulsa ✓ para guardar</p>
            )}
            <div>
              <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest mb-2">Hoyos 1–9</p>
              <HalfGrid {...front9}
                scores={displayScores.slice(0,9)}
                editMode={editMode}
                editScores={editScores}
                onScoreChange={handleScoreChange}
                onPhotoClick={(url, h) => setPhotoModal({ url, hole: h })}
              />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-brand-muted uppercase tracking-widest mb-2">Hoyos 10–18</p>
              <HalfGrid {...back9}
                scores={displayScores.slice(9,18)}
                editMode={editMode}
                editScores={editScores}
                onScoreChange={handleScoreChange}
                onPhotoClick={(url, h) => setPhotoModal({ url, hole: h })}
              />
            </div>
          </div>
        )}

        {/* Expand toggle */}
        <button
          onClick={() => !editMode && setExpanded(e => !e)}
          className={`w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-brand-deep/40 text-xs transition-colors ${editMode ? 'text-brand-deep cursor-default' : 'text-brand-muted hover:text-brand-cream'}`}
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
