import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useAuthStore } from '../../store/appStore'

const STEPS = ['Cuenta', 'Perfil', 'Golf']

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuthStore()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    city: '', bio: '',
    handicap: 18, preferredGame: 'social',
  })
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleNext = async (e) => {
    e.preventDefault()
    if (step < 2) setStep(s => s + 1)
    else {
      const result = await register(form)
      if (result.success) navigate('/app/feed')
      else setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl font-black text-brand-cream">
          PLAY <span className="text-brand-gold">T</span>EE TOMIC
        </h1>
        <p className="text-brand-muted text-sm">Crea tu cuenta · Paso {step + 1} de 3</p>
      </div>

      {/* Step pills */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-brand-gold w-10' : 'bg-brand-deep w-6'}`} />
        ))}
      </div>

      <div className="w-full max-w-sm">
        <div className="glass rounded-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-brand-cream mb-6">{STEPS[step]}</h2>

          <form onSubmit={handleNext} className="space-y-4">
            {step === 0 && (
              <>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Nombre completo</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} required className="input-base" placeholder="Carlos García" />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required className="input-base" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Contraseña</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)} required minLength={6} className="input-base" placeholder="Min. 6 caracteres" />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Ciudad</label>
                  <input value={form.city} onChange={e => set('city', e.target.value)} required className="input-base" placeholder="Madrid" />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Bio (opcional)</label>
                  <textarea value={form.bio} onChange={e => set('bio', e.target.value)} rows={3} className="input-base resize-none" placeholder="Cuéntanos algo sobre ti..." />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Handicap oficial</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={-5} max={36} value={form.handicap} onChange={e => set('handicap', Number(e.target.value))} className="flex-1 accent-brand-gold" />
                    <span className="font-mono text-brand-gold font-bold w-10 text-right">{form.handicap > 0 ? '+' : ''}{form.handicap}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-3">Tipo de juego preferido</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[['social', '🤝', 'Social'], ['competitive', '🏆', 'Competición'], ['open', '🌿', 'Abierto']].map(([v, em, l]) => (
                      <button type="button" key={v} onClick={() => set('preferredGame', v)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-xs font-semibold transition-all ${form.preferredGame === v ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-brand-deep text-brand-muted hover:border-brand-muted'}`}>
                        <span className="text-xl">{em}</span>{l}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
            )}

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="btn-outline flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" /> Atrás
                </button>
              )}
              <button type="submit" className="btn-gold flex-1 justify-center flex items-center gap-1">
                {step < 2 ? <><span>Siguiente</span><ChevronRight className="w-4 h-4" /></> : 'Crear cuenta'}
              </button>
            </div>
          </form>
        </div>

        {step === 0 && (
          <div className="mt-6 text-center">
            <p className="text-brand-muted text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-brand-gold hover:text-brand-goldl font-semibold transition-colors">Inicia sesión</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
