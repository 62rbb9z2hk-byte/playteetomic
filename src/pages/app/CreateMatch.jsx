import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'

export default function CreateMatch() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { fields, createMatch, toast } = useDataStore()
  const [form, setForm] = useState({
    fieldId: fields[0]?.id || '',
    date: '',
    type: 'social',
    maxPlayers: 4,
    hcpMin: 0,
    hcpMax: 36,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    const match = createMatch({ ...form, creatorId: user.id })
    toast('¡Partida creada!')
    navigate(`/app/partidas/${match.id}`)
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-muted hover:text-brand-cream mb-6 text-sm transition-colors">
        <ChevronLeft className="w-4 h-4" /> Volver
      </button>
      <h1 className="font-serif text-2xl font-black text-brand-cream mb-8">Nueva partida</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Campo de golf</label>
          <select value={form.fieldId} onChange={e => set('fieldId', e.target.value)} required className="input-base">
            {fields.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Fecha y hora</label>
          <input type="datetime-local" value={form.date} onChange={e => set('date', e.target.value)} required className="input-base" />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-3">Tipo de partida</label>
          <div className="grid grid-cols-3 gap-3">
            {[['social', '🤝', 'Social', 'Informal, para pasar un buen rato'], ['competitive', '🏆', 'Competición', 'Puntuación oficial y seria'], ['open', '🌿', 'Abierto', 'Todo el mundo es bienvenido']].map(([v, em, l, desc]) => (
              <button type="button" key={v} onClick={() => set('type', v)}
                className={`flex flex-col items-start gap-1 p-4 rounded-xl border text-left transition-all ${form.type === v ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-deep hover:border-brand-muted bg-brand-dark'}`}>
                <span className="text-2xl">{em}</span>
                <span className={`text-sm font-bold ${form.type === v ? 'text-brand-gold' : 'text-brand-cream'}`}>{l}</span>
                <span className="text-[11px] text-brand-muted leading-tight">{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Jugadores */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">
            Jugadores máximo: <span className="text-brand-gold font-mono">{form.maxPlayers}</span>
          </label>
          <input type="range" min={2} max={8} value={form.maxPlayers} onChange={e => set('maxPlayers', Number(e.target.value))} className="w-full accent-brand-gold" />
        </div>

        {/* Handicap range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">HCP mínimo</label>
            <input type="number" min={-5} max={36} value={form.hcpMin} onChange={e => set('hcpMin', Number(e.target.value))} className="input-base" />
          </div>
          <div>
            <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">HCP máximo</label>
            <input type="number" min={-5} max={54} value={form.hcpMax} onChange={e => set('hcpMax', Number(e.target.value))} className="input-base" />
          </div>
        </div>

        <button type="submit" className="btn-gold w-full justify-center py-3">Crear partida</button>
      </form>
    </div>
  )
}
