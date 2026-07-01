import { Bell, Check } from 'lucide-react'
import { useDataStore } from '../../store/appStore'
import { formatRelative } from '../../lib/utils'
import Avatar from '../../components/ui/Avatar'

export default function Notifications() {
  const { notifications, markAllRead, getUser } = useDataStore()

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-black text-brand-cream">Notificaciones</h1>
        <button onClick={markAllRead} className="flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-cream transition-colors">
          <Check className="w-4 h-4" /> Marcar todo leído
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 text-brand-muted">
          <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Sin notificaciones</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => {
            const from = n.fromUserId ? getUser(n.fromUserId) : null
            return (
              <div key={n.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${n.read ? 'bg-brand-dark/30 border-brand-deep/40' : 'bg-brand-dark border-brand-deep/80 border-l-2 border-l-brand-gold'}`}>
                {from ? (
                  <Avatar user={from} size={9} className="flex-shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-4 h-4 text-brand-gold" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-cream leading-snug">{n.message}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{formatRelative(n.createdAt)}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
