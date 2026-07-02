import { useEffect, useRef, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, MapPin } from 'lucide-react'
import { useAuthStore, useDataStore } from '../../store/appStore'
import Avatar from '../../components/ui/Avatar'
import HandicapBadge from '../../components/ui/HandicapBadge'

export default function Conversation() {
  const { userId: toUserId } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { getUser, messages, sendMessage, loadMessages, subscribeToMessages, unsubscribeMessages } = useDataStore()
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  const toUser = state?.toUser || getUser(toUserId)

  const conv = messages.filter(m =>
    (m.fromId === user?.id && m.toId === toUserId) ||
    (m.fromId === toUserId && m.toId === user?.id)
  ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  useEffect(() => {
    if (!user?.id || !toUserId) return
    loadMessages(user.id, toUserId)
    const unsub = subscribeToMessages(user.id, toUserId)
    return () => unsub?.()
  }, [user?.id, toUserId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conv.length])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!text.trim() || !user?.id) return
    setSending(true)
    await sendMessage({ fromId: user.id, toId: toUserId, text: text.trim() })
    setText('')
    setSending(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-brand-deep bg-brand-black">
        <button onClick={() => navigate(-1)} className="text-brand-muted hover:text-brand-cream p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        {toUser && (
          <>
            <Avatar user={toUser} size={10} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-cream text-sm">{toUser.name}</p>
              <div className="flex items-center gap-2">
                {(toUser.municipality || toUser.city) && (
                  <p className="text-xs text-brand-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {toUser.municipality || toUser.city}
                  </p>
                )}
                <HandicapBadge hcp={toUser.handicap} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {conv.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-brand-muted text-sm text-center">
              Empieza la conversación con {toUser?.name?.split(' ')[0] || 'este golfista'}
            </p>
          </div>
        )}
        {conv.map(msg => {
          const isMe = msg.fromId === user?.id
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              {!isMe && (
                <div className="mr-2 flex-shrink-0 self-end">
                  <Avatar user={toUser} size={7} />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                isMe
                  ? 'bg-brand-gold text-brand-black rounded-br-sm'
                  : 'bg-brand-deep text-brand-cream rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isMe ? 'text-brand-black/60 text-right' : 'text-brand-muted'}`}>
                  {new Date(msg.createdAt).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="px-4 py-3 border-t border-brand-deep bg-brand-black flex items-center gap-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={`Mensaje a ${toUser?.name?.split(' ')[0] || 'golfista'}...`}
          className="flex-1 bg-brand-deep border border-brand-deep/60 rounded-full px-4 py-2.5 text-sm text-brand-cream placeholder-brand-muted focus:outline-none focus:border-brand-gold/50 transition-colors"
          disabled={sending}
          autoFocus
        />
        <button
          type="submit"
          disabled={!text.trim() || sending}
          className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center disabled:opacity-40 hover:bg-brand-gold/90 transition-colors flex-shrink-0"
        >
          <Send className="w-4 h-4 text-brand-black" />
        </button>
      </form>
    </div>
  )
}
