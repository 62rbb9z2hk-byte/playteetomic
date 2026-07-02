import { NavLink } from 'react-router-dom'
import { Home, Flag, MapPin, MessageCircle, User } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'

const NAV = [
  { to: '/app/feed',      icon: Home,          label: 'Inicio' },
  { to: '/app/partidas',  icon: Flag,          label: 'Partidas' },
  { to: '/app/mapa',      icon: MapPin,        label: 'Mapa' },
  { to: '/app/mensajes',  icon: MessageCircle, label: 'Mensajes', badge: true },
  { to: '/app/perfil',    icon: User,          label: 'Perfil' },
]

export default function BottomNav() {
  const { user } = useAuthStore()
  const { unreadMessageCount } = useDataStore()
  const unreadMsgs = unreadMessageCount()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-brand-black/95 backdrop-blur border-t border-brand-deep/60 flex md:hidden safe-bottom">
      {NAV.map(({ to, icon: Icon, label, badge }) => (
        <NavLink key={to} to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-3 text-[10px] font-medium transition-colors ${isActive ? 'text-brand-gold' : 'text-brand-muted'}`
          }>
          <div className="relative">
            <Icon className="w-5 h-5" />
            {badge && unreadMsgs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full text-[9px] flex items-center justify-center font-bold text-brand-black">
                {unreadMsgs > 9 ? '9+' : unreadMsgs}
              </span>
            )}
          </div>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
