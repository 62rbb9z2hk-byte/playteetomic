import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Send } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import Avatar from '../../components/ui/Avatar'
import { formatDate } from '../../lib/utils'

export default function Messages() {
  const { user } = useAuthStore()
  const { conversations, loadConversations } = useDataStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.id) loadConversations(user.id)
  }, [user?.id])

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-6 h-6 text-brand-gold" />
        <h1 className="font-serif text-2xl font-bold text-brand-cream">Mensajes</h1>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-16">
          <Send className="w-12 h-12 text-brand-deep mx-auto mb-4" />
          <p className="text-brand-muted text-lg font-medium">Sin conversaciones aún</p>
          <p className="text-brand-muted/70 text-sm mt-1">
            Abre el mapa y haz clic en un golfista para iniciar una conversación
          </p>
          <button
            onClick={() => navigate('/app/mapa')}
            className="btn-gold mt-6 text-sm"
          >
            Abrir mapa
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {conversations.map(conv => {
            const other = conv.otherUser
            return (
              <button
                key={conv.id}
                onClick={() => navigate(`/app/mensajes/${other?.id || conv.id}`, { state: { toUser: other } })}
                className="w-full bg-brand-dark border border-brand-deep rounded-2xl p-4 flex items-center gap-4 hover:border-brand-gold/40 transition-all text-left"
              >
                <div className="relative">
                  <Avatar user={other} size={12} />
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold rounded-full text-[10px] flex items-center justify-center font-bold text-brand-black">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-semibold text-brand-cream text-sm">{other?.name || 'Usuario'}</p>
                    <span className="text-[11px] text-brand-muted">{formatDate(conv.lastMessageAt)}</span>
                  </div>
                  <p className={`text-sm truncate ${conv.unread > 0 ? 'text-brand-cream font-medium' : 'text-brand-muted'}`}>
                    {conv.lastMessage || 'Sin mensajes aún'}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
