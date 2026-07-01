import { useState } from 'react'
import { Search } from 'lucide-react'
import { useDataStore } from '../../store/appStore'
import FieldCard from '../../components/golf/FieldCard'

export default function Fields() {
  const { fields } = useDataStore()
  const [search, setSearch] = useState('')

  const filtered = fields.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-8">
      <h1 className="font-serif text-2xl font-black text-brand-cream mb-6">Campos de Golf</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
        <input value={search} onChange={e => setSearch(e.target.value)} className="input-base pl-9" placeholder="Buscar por nombre o ciudad..." />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-brand-muted">
          <p className="text-4xl mb-3">🗺️</p>
          <p>Sin resultados para "{search}"</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map(f => <FieldCard key={f.id} field={f} />)}
        </div>
      )}
    </div>
  )
}
