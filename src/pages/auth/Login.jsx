import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/appStore'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(form.email, form.password)
    setLoading(false)
    if (result.success) navigate('/app/feed')
    else setError(result.error)
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4" r="3.5" fill="#c9a84c"/>
            <rect x="11" y="7.5" width="2" height="13" rx="1" fill="#c9a84c"/>
            <rect x="7.5" y="7.5" width="9" height="2" rx="1" fill="#c9a84c"/>
          </svg>
        </div>
        <h1 className="font-serif text-3xl font-black text-brand-cream">
          PLAY <span className="text-brand-gold">T</span>EE TOMIC
        </h1>
        <p className="text-brand-muted text-sm mt-1">La red social del golf</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm">
        <div className="glass rounded-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-brand-cream mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="input-base"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Contraseña</label>
              <input
                type="password" required
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="input-base"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-gold w-full justify-center py-3 mt-2">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-deep text-center">
            <p className="text-brand-muted text-sm">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-brand-gold hover:text-brand-goldl font-semibold transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-3 rounded-xl border border-brand-deep/50 text-center">
          <p className="text-xs text-brand-muted">
            <span className="text-brand-gold font-mono">Demo:</span> miguel@golf.es · <span className="font-mono">golf123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
