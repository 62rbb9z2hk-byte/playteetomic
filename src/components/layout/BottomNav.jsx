import { NavLink } from 'react-router-dom'
import { Home, Flag, Map, Trophy, User } from 'lucide-react'

const NAV = [
  { to: '/app/feed',      icon: Home,   label: 'Inicio' },
  { to: '/app/partidas',  icon: Flag,   label: 'Partidas' },
  { to: '/app/campos',    icon: Map,    label: 'Campos' },
  { to: '/app/scorecard', icon: Trophy, label: 'Score' },
  { to: '/app/perfil',    icon: User,   label: 'Perfil' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-brand-black/95 backdrop-blur border-t border-brand-deep/60 flex md:hidden safe-bottom">
      {NAV.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-medium transition-colors ${isActive ? 'text-brand-gold' : 'text-brand-muted'}`
          }>
          <Icon className="w-5 h-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
