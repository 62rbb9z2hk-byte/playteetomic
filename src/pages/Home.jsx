import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative text-center mb-10">
        <div className="w-20 h-20 mx-auto mb-5">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4" r="3.5" fill="#c9a84c"/>
            <rect x="11" y="7.5" width="2" height="13" rx="1" fill="#c9a84c"/>
            <rect x="7.5" y="7.5" width="9" height="2" rx="1" fill="#c9a84c"/>
          </svg>
        </div>
        <h1 className="font-serif text-5xl font-black text-brand-cream tracking-tight">
          PLAY <span className="text-brand-gold">T</span>EE TOMIC
        </h1>
        <p className="text-brand-muted text-lg mt-3">La red social del golf en España</p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3 max-w-sm w-full mb-10">
        {[
          ['⛳️', 'Encuentra partidas', 'Conecta con jugadores de tu nivel'],
          ['🏌️', 'Red social', 'Comparte tus rondas y logros'],
          ['📊', 'Scorecards', 'Registra y analiza tu juego'],
          ['🗺️', 'Campos', 'Descubre los mejores campos'],
        ].map(([em, title, desc]) => (
          <div key={title} className="bg-brand-dark border border-brand-deep rounded-2xl p-4">
            <p className="text-2xl mb-2">{em}</p>
            <p className="text-sm font-semibold text-brand-cream">{title}</p>
            <p className="text-xs text-brand-muted mt-0.5 leading-tight">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button onClick={() => navigate('/registro')} className="btn-gold w-full justify-center py-4 text-base">
          Empezar gratis
        </button>
        <button onClick={() => navigate('/login')} className="btn-outline w-full justify-center py-3">
          Ya tengo cuenta
        </button>
        <button onClick={() => navigate('/app/feed')} className="text-center text-xs text-brand-muted hover:text-brand-cream transition-colors py-2">
          Continuar sin registrarse →
        </button>
      </div>
    </div>
  )
}
