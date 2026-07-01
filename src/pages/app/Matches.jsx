import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import { useDataStore } from '../../store/appStore'
import MatchCard from '../../components/golf/MatchCard'

const TABS = [['all', 'Todas'], ['social', 'Social'], ['competitive', 'Competición'], ['open', 'Abierto']]

export default function Matches() {
  const navigate = useNavigate()
  const { matches } = useDataStore()
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = matches.filter(m => {
    if (tab !== 'all' && m.type !== tab) return false
    if (search && !m.fieldId?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-black text-brand-cream">Partidas</h1>
        <button onClick={() => navigate('/app/partidas/nueva')} className="btn-gold flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Nueva
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          className="input-base pl-9" placeholder="Buscar campo..." />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {TABS.map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === v ? 'bg-brand-gold text-brand-black' : 'bg-brand-dark border border-brand-deep text-brand-muted hover:text-brand-cream'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-brand-muted">
          <p className="text-4xl mb-3">⛳️</p>
          <p className="font-semibold">No hay partidas disponibles</p>
          <p className="text-sm mt-1">¡Crea una nueva partida!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      )}
    </div>
  )
}
