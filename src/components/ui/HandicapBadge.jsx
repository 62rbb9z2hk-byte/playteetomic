import { hcpCategory } from '../../lib/utils'

export default function HandicapBadge({ hcp, size = 'sm' }) {
  const cat = hcpCategory(hcp)
  const sizeClass = size === 'lg'
    ? 'text-2xl font-mono font-bold px-4 py-1.5'
    : size === 'md'
    ? 'text-sm font-mono font-bold px-3 py-1'
    : 'text-xs font-mono font-bold px-2 py-0.5'
  return (
    <span className={`inline-flex items-center border rounded-full ${cat.bg} ${cat.color} ${sizeClass}`}>
      HCP {hcp > 0 ? '+' : ''}{hcp}
    </span>
  )
}
