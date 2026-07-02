import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, RotateCcw } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { stablefordPoints } from '../../lib/utils'

const PARS = [4,3,5,4,4,3,5,4,4, 4,3,5,4,4,3,5,4,4]
const HOLES = Array.from({ length: 18 }, (_, i) => i + 1)

export default function Scorecard() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { fields, saveScorecard, toast } = useDataStore()
  const [fieldId, setFieldId] = useState(fields[0]?.id || '')
  const [scores, setScores] = useState(Array(18).fill(''))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-4xl mb-3">🏌️</p>
        <p className="text-brand-muted mb-4">Inicia sesión para guardar scorecards</p>
        <button onClick={() => navigate('/login')} className="btn-gold">Iniciar sesión</button>
      </div>
    </div>
  )

  const validScores = scores.map(s => s === '' ? null : Number(s))
  const gross = validScores.reduce((a, s) => a + (s || 0), 0)
  const par = PARS.slice(0, 18).reduce((a, p) => a + p, 0)
  const diff = gross - par
  const stableford = validScores.reduce((total, s, i) => {
    if (!s) return total
    const allowance = Math.round(PARS[i] * (user.handicap / par))
    return total + stablefordPoints(s, PARS[i], allowance)
  }, 0)

  const handleSave = async () => {
    if (saving || !gross) return
    setSaving(true)
    setSaveError('')
    try {
      const field = fields.find(f => f.id === fieldId)
      await saveScorecard({
        userId: user.id,
        fieldId,
        fieldName: field?.name || 'Campo',
        date: new Date().toISOString(),
        scores: validScores,
        pars: PARS,
        gross,
        stableford,
      })
      toast('¡Scorecard guardada!')
      setSaved(true)
    } catch (err) {
      const msg = err?.message || JSON.stringify(err) || 'Error desconocido'
      setSaveError(msg)
      console.error('Scorecard save error:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => { setScores(Array(18).fill('')); setSaved(false) }

  const diffClass = diff < 0 ? 'text-brand-green' : diff === 0 ? 'text-brand-muted' : 'text-red-400'

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
      <h1 className="font-serif text-2xl font-black text-brand-cream mb-6">Scorecard</h1>

      {/* Campo selector */}
      <div className="mb-6">
        <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Campo</label>
        <select value={fieldId} onChange={e => { setFieldId(e.target.value); setSaved(false) }} className="input-base max-w-xs">
          {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Gross', val: gross || '—', cls: '' },
          { label: 'Par', val: par, cls: 'text-brand-muted' },
          { label: 'Dif.', val: gross ? (diff > 0 ? `+${diff}` : diff) : '—', cls: diffClass },
          { label: 'Stbl', val: stableford || '—', cls: 'text-brand-gold' },
        ].map(({ label, val, cls }) => (
          <div key={label} className="bg-brand-dark border border-brand-deep rounded-xl p-3 text-center">
            <p className={`font-mono font-black text-xl ${cls || 'text-brand-cream'}`}>{val}</p>
            <p className="text-xs text-brand-muted">{label}</p>
          </div>
        ))}
      </div>

      {/* Score grid */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs text-brand-muted font-semibold py-2 w-8">H</th>
              <th className="text-center text-xs text-brand-muted font-semibold py-2 w-10">Par</th>
              <th className="text-center text-xs text-brand-muted font-semibold py-2">Golpes</th>
              <th className="text-center text-xs text-brand-muted font-semibold py-2 w-12">Stbl</th>
            </tr>
          </thead>
          <tbody>
            {[0, 9].map(offset => (
              <>
                {HOLES.slice(offset, offset + 9).map((hole, i) => {
                  const idx = offset + i
                  const holePar = PARS[idx]
                  const s = scores[idx] === '' ? null : Number(scores[idx])
                  const holeDiff = s ? s - holePar : null
                  const allowance = Math.round(holePar * (user.handicap / 72))
                  const pts = s ? stablefordPoints(s, holePar, allowance) : null
                  const rowCls = holeDiff !== null
                    ? holeDiff <= -2 ? 'bg-yellow-400/10' : holeDiff === -1 ? 'bg-brand-green/10' : holeDiff === 1 ? 'bg-red-500/10' : holeDiff >= 2 ? 'bg-red-800/20' : ''
                    : ''
                  return (
                    <tr key={hole} className={`border-t border-brand-deep/30 ${rowCls}`}>
                      <td className="py-1.5 font-mono text-brand-muted text-xs">{hole}</td>
                      <td className="py-1.5 font-mono text-center text-brand-muted">{holePar}</td>
                      <td className="py-1">
                        <input
                          type="number" min={1} max={15}
                          value={scores[idx]}
                          onChange={e => {
                            const ns = [...scores]
                            ns[idx] = e.target.value
                            setScores(ns)
                            setSaved(false)
                          }}
                          className="w-16 mx-auto block text-center bg-brand-black border border-brand-deep rounded-lg py-1 font-mono text-sm text-brand-cream focus:border-brand-gold outline-none"
                          placeholder={String(holePar)}
                        />
                      </td>
                      <td className={`py-1.5 font-mono text-center text-xs font-bold ${pts >= 3 ? 'text-yellow-400' : pts === 2 ? 'text-brand-green' : 'text-brand-muted'}`}>
                        {pts !== null ? pts : '—'}
                      </td>
                    </tr>
                  )
                })}
                <tr className="border-t-2 border-brand-deep bg-brand-deep/20">
                  <td colSpan={2} className="py-1.5 text-xs text-brand-muted font-semibold px-1">OUT {offset === 0 ? 1 : 10}–{offset === 0 ? 9 : 18}</td>
                  <td className="py-1.5 font-mono text-center font-bold text-brand-cream text-sm">
                    {scores.slice(offset, offset + 9).reduce((a, s) => a + (s === '' ? 0 : Number(s)), 0) || '—'}
                  </td>
                  <td />
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error display */}
      {saveError && (
        <div className="mb-4 bg-red-500/10 border border-red-500/40 rounded-xl px-4 py-3 text-red-400 text-sm break-all">
          Error: {saveError}
        </div>
      )}

      {!gross && (
        <p className="text-center text-brand-muted text-sm mb-4">Introduce los golpes de cada hoyo para poder guardar</p>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleReset} className="btn-outline flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={handleSave}
          disabled={saved || !gross || saving}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${saved ? 'bg-brand-green/20 border border-brand-green/30 text-brand-green' : 'btn-gold'}`}
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar scorecard'}
        </button>
      </div>
    </div>
  )
}
