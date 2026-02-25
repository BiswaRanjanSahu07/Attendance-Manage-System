import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, type = 'info' }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, title, description, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }, [])

  return { toasts, toast }
}

export function ToastContainer({ toasts }) {
  if (!toasts.length) return null

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  const colors = {
    success: '#22d3ee',
    error: '#f43f5e',
    warning: '#f59e0b',
    info: '#0ea5e9',
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span style={{ color: colors[t.type], fontSize: 16, fontWeight: 700 }}>{icons[t.type]}</span>
          <div>
            {t.title && <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{t.title}</p>}
            {t.description && <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
