import { useDataStore } from '../../store/appStore'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

export default function ToastContainer() {
  const { toasts, removeToast } = useDataStore()
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border animate-fade-up pointer-events-auto min-w-[260px] max-w-sm ${
            t.type === 'error'
              ? 'bg-red-900/90 border-red-500/30 text-red-100'
              : 'bg-brand-deep/95 border-brand-green/30 text-brand-cream'
          }`}>
          {t.type === 'error'
            ? <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            : <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />}
          <span className="text-sm flex-1">{t.message}</span>
          <button onClick={() => removeToast(t.id)} className="text-brand-muted hover:text-brand-cream">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
