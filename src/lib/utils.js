export const formatDate = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
}

export const formatRelative = (iso) => {
  const diff = (Date.now() - new Date(iso)) / 1000
  if (diff < 60) return 'ahora'
  if (diff < 3600) return `${Math.floor(diff / 60)}min`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

export const hcpCategory = (hcp) => {
  if (hcp <= 5) return { label: 'Scratch', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' }
  if (hcp <= 15) return { label: 'Medio', color: 'text-brand-gold', bg: 'bg-brand-gold/10 border-brand-gold/30' }
  if (hcp <= 28) return { label: 'Amateur', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/30' }
  return { label: 'Principiante', color: 'text-brand-muted', bg: 'bg-brand-muted/10 border-brand-muted/30' }
}

export const matchTypeLabel = (type) => ({
  competitive: { label: 'Competitiva 🏆', cls: 'text-amber-400 bg-amber-500/10 border-amber-500/25' },
  social:      { label: 'Social 🍺',       cls: 'text-sky-400 bg-sky-500/10 border-sky-500/25' },
  open:        { label: 'Abierta 🤝',      cls: 'text-brand-green bg-brand-green/10 border-brand-green/25' },
}[type] || { label: type, cls: 'tag-muted' })

export const spotsLeft = (match) => match.maxPlayers - (match.playerIds?.length || 0)

export const canJoin = (match, userHcp) => {
  if (spotsLeft(match) <= 0) return { ok: false, reason: 'Partida completa' }
  if (userHcp < match.hcpMin) return { ok: false, reason: `Hándicap mínimo: ${match.hcpMin}` }
  if (userHcp > match.hcpMax) return { ok: false, reason: `Hándicap máximo: ${match.hcpMax}` }
  return { ok: true }
}

export const stablefordPoints = (strokes, par, hcpAllowance = 0) => {
  const net = strokes - Math.floor(hcpAllowance)
  const diff = par - net
  return Math.max(0, diff + 2)
}

export const calcHandicapDiff = (grossScore, courseRating, slopeRating) => {
  return ((grossScore - courseRating) * 113) / slopeRating
}
