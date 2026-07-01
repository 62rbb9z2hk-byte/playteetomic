import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Shield, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../../store/appStore'

const STEPS = ['Cuenta', 'Perfil', 'Golf', 'RFEG']

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuthStore()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    city: '', bio: '',
    handicap: 18, preferredGame: 'social',
    rfegLicense: '', rfegFullName: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleNext = async (e) => {
    e.preventDefault()
    setError('')

    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
      return
    }

    setLoading(true)
    const result = await register(form)
    setLoading(false)
    if (result.success) navigate('/app/feed')
    else setError(result.error)
  }

  const handleSkipRFEG = async () => {
    setLoading(true)
    const result = await register(form)
    setLoading(false)
    if (result.success) navigate('/app/feed')
    else setError(result.error)
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl font-black text-brand-cream">
          PLAY <span className="text-brand-gold">T</span>EE TOMIC
        </h1>
        <p className="text-brand-muted text-sm">Crea tu cuenta · Paso {step + 1} de {STEPS.length}</p>
      </div>

      {/* Step pills */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-brand-gold w-10' : 'bg-brand-deep w-6'}`} />
        ))}
      </div>

      <div className="w-full max-w-sm">
        <div className="glass rounded-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-brand-cream mb-1">{STEPS[step]}</h2>
          {step === 3 && (
            <p className="text-sm text-brand-muted mb-5 leading-snug">
              Conecta tu ficha de la Real Federación Española de Golf para verificar tu handicap oficial y obtener el sello de jugador verificado.
            </p>
          )}
          {step !== 3 && <div className="mb-6" />}

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
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Handicap</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min={-5} max={54} value={form.handicap} onChange={e => set('handicap', Number(e.target.value))} className="flex-1 accent-brand-gold" />
                    <span className="font-mono text-brand-gold font-bold w-10 text-right">{form.handicap > 0 ? '+' : ''}{form.handicap}</span>
                  </div>
                  <p className="text-xs text-brand-muted mt-1">Podrás verificarlo con la RFEG en el siguiente paso</p>
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

            {step === 3 && (
              <>
                {/* Badge preview */}
                <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${form.rfegLicense ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-deep bg-brand-dark'}`}>
                  {form.rfegLicense ? (
                    <ShieldCheck className="w-8 h-8 text-brand-gold flex-shrink-0" />
                  ) : (
                    <Shield className="w-8 h-8 text-brand-muted flex-shrink-0" />
                  )}
                  <div>
                    <p className={`text-sm font-bold ${form.rfegLicense ? 'text-brand-gold' : 'text-brand-muted'}`}>
                      {form.rfegLicense ? 'Jugador federado' : 'Sin verificar'}
                    </p>
                    <p className="text-xs text-brand-muted">
                      {form.rfegLicense ? `Licencia ${form.rfegLicense}` : 'Introduce tus datos de federado'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Nombre completo (como aparece en la ficha)</label>
                  <input
                    value={form.rfegFullName}
                    onChange={e => set('rfegFullName', e.target.value)}
                    className="input-base"
                    placeholder="García López, Carlos"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Número de licencia RFEG</label>
                  <input
                    value={form.rfegLicense}
                    onChange={e => set('rfegLicense', e.target.value.toUpperCase())}
                    className="input-base font-mono"
                    placeholder="Ej: M-12345-A"
                  />
                </div>

                <p className="text-xs text-brand-muted leading-relaxed">
                  Tu handicap quedará marcado como verificado. Los demás jugadores verán el sello ✓ en tu perfil.
                </p>
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
              <button type="submit" disabled={loading} className="btn-gold flex-1 justify-center flex items-center gap-1">
                {loading ? 'Creando cuenta...' : step < STEPS.length - 1 ? <><span>Siguiente</span><ChevronRight className="w-4 h-4" /></> : 'Crear cuenta'}
              </button>
            </div>

            {step === 3 && (
              <button
                type="button"
                onClick={handleSkipRFEG}
                disabled={loading}
                className="w-full text-center text-sm text-brand-muted hover:text-brand-cream transition-colors py-1"
              >
                Omitir por ahora
              </button>
            )}
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
