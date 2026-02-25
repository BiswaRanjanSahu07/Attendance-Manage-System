import { useEffect, useCallback } from 'react'
import { cn } from '../../lib/utils'

function Dialog({ open, onClose, children }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose?.()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg animate-up">
        {children}
      </div>
    </div>
  )
}

function DialogContent({ className, children, ...props }) {
  return (
    <div
      className={cn('bg-slate-800 border border-white/12 rounded-2xl shadow-2xl', className)}
      onClick={e => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  )
}

function DialogHeader({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pt-6 pb-4 border-b border-white/8', className)} {...props}>
      {children}
    </div>
  )
}

function DialogTitle({ className, children, ...props }) {
  return (
    <h2 className={cn('font-display font-bold text-lg text-white', className)} {...props}>
      {children}
    </h2>
  )
}

function DialogDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-sm text-slate-400 mt-1', className)} {...props}>
      {children}
    </p>
  )
}

function DialogBody({ className, children, ...props }) {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  )
}

function DialogFooter({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pb-6 pt-2 flex items-center justify-end gap-3', className)} {...props}>
      {children}
    </div>
  )
}

function DialogClose({ onClose, children }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children || (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      )}
    </button>
  )
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose }
