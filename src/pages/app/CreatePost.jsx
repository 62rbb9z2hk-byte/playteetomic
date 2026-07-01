import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Image, Camera, X, ListChecks } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import { supabase } from '../../lib/supabase'

const GRADIENTS = [
  'from-emerald-800 to-emerald-600', 'from-sky-800 to-sky-600', 'from-amber-800 to-amber-600',
  'from-rose-800 to-rose-600', 'from-violet-800 to-violet-600', 'from-teal-800 to-teal-600',
  'from-brand-field to-brand-deep', 'from-indigo-800 to-indigo-600',
]

const HOLES_18 = Array.from({ length: 18 }, (_, i) => i + 1)

async function uploadPhoto(file, userId) {
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${userId}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('post-photos').upload(path, file, { upsert: false })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from('post-photos').getPublicUrl(path)
  return publicUrl
}

export default function CreatePost() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { createPost, toast } = useDataStore()
  const fileRef = useRef()

  const [text, setText] = useState('')
  const [gradient, setGradient] = useState(GRADIENTS[0])
  const [photos, setPhotos] = useState([])
  const [showScorecard, setShowScorecard] = useState(false)
  const [scores, setScores] = useState(Array(18).fill(''))
  const [loading, setLoading] = useState(false)

  if (!user) { navigate('/login'); return null }

  const addPhotos = (e) => {
    const files = Array.from(e.target.files).slice(0, 3 - photos.length)
    const previews = files.map(f => ({ file: f, url: URL.createObjectURL(f) }))
    setPhotos(p => [...p, ...previews].slice(0, 3))
    e.target.value = ''
  }

  const removePhoto = (i) => setPhotos(p => p.filter((_, idx) => idx !== i))

  const setScore = (i, val) => {
    const v = val === '' ? '' : Math.max(1, Math.min(15, Number(val)))
    setScores(s => { const n = [...s]; n[i] = v === '' ? '' : String(v); return n })
  }

  const gross = scores.reduce((a, s) => a + (Number(s) || 0), 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    try {
      let photoUrls = []
      for (const p of photos) {
        try {
          const url = await uploadPhoto(p.file, user.id)
          photoUrls.push(url)
        } catch {
          // Storage not configured — skip photos silently
        }
      }

      const scorecard = showScorecard && gross > 0
        ? { scores: scores.map(Number), gross, holes: 18 }
        : null

      await createPost({ userId: user.id, text, imageGradient: gradient, photos: photoUrls, scorecard })
      toast('¡Post publicado!')
      navigate('/app/feed')
    } catch (err) {
      toast(err.message || 'Error al publicar', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-muted hover:text-brand-cream mb-4 text-sm transition-colors">
        <ChevronLeft className="w-4 h-4" /> Cancelar
      </button>
      <h1 className="font-serif text-2xl font-black text-brand-cream mb-5">Nuevo post</h1>

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

        {/* Photos */}
        <div>
          <label className="block text-xs text-brand-muted font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
            <Camera className="w-3.5 h-3.5" /> Fotos del campo <span className="text-brand-deep font-normal normal-case tracking-normal">máx. 3</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {photos.map((p, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-brand-deep">
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {photos.length < 3 && (
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-24 h-24 rounded-xl border-2 border-dashed border-brand-deep flex flex-col items-center justify-center gap-1 text-brand-muted hover:border-brand-gold/50 hover:text-brand-gold transition-all">
                <Camera className="w-5 h-5" />
                <span className="text-xs">Añadir</span>
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={addPhotos} />
        </div>

        {/* Preview */}
        {photos.length === 0 && (
          <div className={`h-28 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-white/40 text-sm">Vista previa</span>
          </div>
        )}

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

        {/* Scorecard toggle */}
        <div>
          <button type="button" onClick={() => setShowScorecard(s => !s)}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${showScorecard ? 'text-brand-gold' : 'text-brand-muted hover:text-brand-cream'}`}>
            <ListChecks className="w-4 h-4" />
            {showScorecard ? 'Ocultar scorecard' : 'Añadir scorecard de la ronda'}
          </button>
        </div>

        {/* Scorecard mini grid */}
        {showScorecard && (
          <div className="bg-brand-dark border border-brand-deep rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-widest">Golpes por hoyo</p>
              {gross > 0 && <span className="font-mono text-brand-gold font-bold text-sm">Total: {gross}</span>}
            </div>
            {/* Holes 1-9 */}
            <div className="mb-3">
              <p className="text-xs text-brand-muted mb-2">Hoyos 1–9</p>
              <div className="grid grid-cols-9 gap-1">
                {HOLES_18.slice(0, 9).map((h, i) => (
                  <div key={h} className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-brand-muted">{h}</span>
                    <input type="number" min="1" max="15" value={scores[i]}
                      onChange={e => setScore(i, e.target.value)}
                      className="w-full h-8 rounded-lg bg-brand-black border border-brand-deep text-center text-sm text-brand-cream font-mono focus:border-brand-gold focus:outline-none" />
                  </div>
                ))}
              </div>
            </div>
            {/* Holes 10-18 */}
            <div>
              <p className="text-xs text-brand-muted mb-2">Hoyos 10–18</p>
              <div className="grid grid-cols-9 gap-1">
                {HOLES_18.slice(9).map((h, i) => (
                  <div key={h} className="flex flex-col items-center gap-0.5">
                    <span className="text-[9px] text-brand-muted">{h}</span>
                    <input type="number" min="1" max="15" value={scores[i + 9]}
                      onChange={e => setScore(i + 9, e.target.value)}
                      className="w-full h-8 rounded-lg bg-brand-black border border-brand-deep text-center text-sm text-brand-cream font-mono focus:border-brand-gold focus:outline-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button type="submit" disabled={!text.trim() || loading} className="btn-gold w-full justify-center py-3">
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  )
}
