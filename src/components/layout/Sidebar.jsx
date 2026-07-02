import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Flag, Map, User, Bell, Trophy, LogOut, ChevronRight, MapPin, MessageCircle } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import Avatar from '../ui/Avatar'
import HandicapBadge from '../ui/HandicapBadge'

const NAV = [
  { to: '/app/feed',           icon: Home,          label: 'Inicio' },
  { to: '/app/partidas',       icon: Flag,          label: 'Partidas' },
  { to: '/app/campos',         icon: Map,           label: 'Campos' },
  { to: '/app/mapa',           icon: MapPin,        label: 'Mapa' },
  { to: '/app/mensajes',       icon: MessageCircle, label: 'Mensajes', badge: 'unreadMessages' },
  { to: '/app/scorecard',      icon: Trophy,        label: 'Scorecard' },
  { to: '/app/perfil',         icon: User,          label: 'Mi perfil' },
  { to: '/app/notificaciones', icon: Bell,          label: 'Notificaciones', badge: 'unread' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuthStore()
  const { unreadCount, unreadMessageCount } = useDataStore()
  const navigate = useNavigate()
  const unread = unreadCount()
  const unreadMsgs = unreadMessageCount()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <aside className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-brand-black border-r border-brand-deep/60 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-brand-deep/60">
        <div className="w-8 h-8 flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4" r="3" fill="#c9a84c"/>
            <rect x="11" y="7" width="2" height="13" rx="1" fill="#c9a84c"/>
            <rect x="8" y="7" width="8" height="1.5" rx=".75" fill="#c9a84c"/>
          </svg>
        </div>
        {!collapsed && (
          <span className="font-serif font-black text-brand-cream text-sm whitespace-nowrap">
            PLAY <span className="text-brand-gold">T</span>EE TOMIC
          </span>
        )}
        <button onClick={onToggle} className="ml-auto text-brand-muted hover:text-brand-cream transition-colors">
          <ChevronRight className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label, badge }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative ${isActive ? 'nav-active' : 'text-brand-muted hover:text-brand-cream hover:bg-brand-deep/40'}`
            }>
            <div className="relative flex-shrink-0">
              <Icon className="w-5 h-5" />
              {badge === 'unread' && unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
              {badge === 'unreadMessages' && unreadMsgs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-gold rounded-full text-[10px] flex items-center justify-center font-bold text-brand-black">
                  {unreadMsgs > 9 ? '9+' : unreadMsgs}
                </span>
              )}
            </div>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      {user && (
        <div className="border-t border-brand-deep/60 p-3">
          {collapsed ? (
            <Avatar user={user} size={8} />
          ) : (
            <div className="flex items-center gap-3">
              <Avatar user={user} size={9} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-cream truncate">{user.name}</p>
                <HandicapBadge hcp={user.handicap} />
              </div>
              <button onClick={handleLogout} className="text-brand-muted hover:text-red-400 transition-colors p-1">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
