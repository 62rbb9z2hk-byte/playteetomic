import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Image } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'

const GRADIENTS = [
  'from-emerald-800 to-emerald-600', 'from-sky-800 to-sky-600', 'from-amber-800 to-amber-600',
  'from-rose-800 to-rose-600', 'from-violet-800 to-violet-600', 'from-teal-800 to-teal-600',
  'from-brand-field to-brand-deep', 'from-indigo-800 to-indigo-600',
]

export default function CreatePost() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { createPost, toast } = useDataStore()
  const [text, setText] = useState('')
  const [gradient, setGradient] = useState(GRADIENTS[0])

  if (!user) { navigate('/login'); return null }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    createPost({ userId: user.id, text, imageGradient: gradient })
    toast('¡Post publicado!')
    navigate('/app/feed')
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-muted hover:text-brand-cream mb-6 text-sm transition-colors">
        <ChevronLeft className="w-4 h-4" /> Cancelar
      </button>
      <h1 className="font-serif text-2xl font-black text-brand-cream mb-6">Nuevo post</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Gradient picker */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Image className="w-3.5 h-3.5" /> Fondo visual
          </label>
          <div className="flex gap-2 flex-wrap">
            {GRADIENTS.map(g => (
              <button type="button" key={g} onClick={() => setGradient(g)}
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${g} transition-all ${gradient === g ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-black' : 'opacity-60 hover:opacity-100'}`} />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className={`h-32 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-white/40 text-sm font-medium">Vista previa</span>
        </div>

        {/* Text */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-1.5">Tu post</label>
          <textarea
            value={text} onChange={e => setText(e.target.value)} required
            rows={4} maxLength={280}
            className="input-base resize-none w-full"
            placeholder="¿Cómo fue la ronda? Comparte tu experiencia..."
          />
          <p className="text-right text-xs text-brand-muted mt-1">{text.length}/280</p>
        </div>

        <button type="submit" disabled={!text.trim()} className="btn-gold w-full justify-center py-3">
          Publicar
        </button>
      </form>
    </div>
  )
}
