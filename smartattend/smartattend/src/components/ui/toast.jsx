import { useState, useCallback, createContext, useContext } from 'react'
import { cn } from '../../lib/utils'

const ToastContext = createContext(null)

const icons = {
  success: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
}

const typeStyles = {
  success: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  error: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  info: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, type = 'info', duration = 3500 }) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, title, description, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-2xl',
              'bg-slate-800 border-white/12 min-w-[280px] max-w-[360px]',
              'pointer-events-auto animate-up'
            )}
          >
            <span className={cn('flex-shrink-0 mt-0.5 p-1.5 rounded-lg border', typeStyles[t.type])}>
              {icons[t.type]}
            </span>
            <div className="flex-1 min-w-0">
              {t.title && <p className="text-sm font-display font-semibold text-white">{t.title}</p>}
              {t.description && <p className="text-xs text-slate-400 mt-0.5">{t.description}</p>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="flex-shrink-0 text-slate-600 hover:text-slate-300 transition-colors mt-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

// Named exports matching shadcn API
function Toaster() { return null } // handled by ToastProvider

export { ToastProvider, useToast, Toaster }
