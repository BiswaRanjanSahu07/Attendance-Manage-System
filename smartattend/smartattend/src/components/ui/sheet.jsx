import { useEffect } from 'react'
import { cn } from '../../lib/utils'

function Sheet({ open, onClose, side = 'right', children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const slideClass = {
    right: 'right-0 top-0 h-full w-80 translate-x-0',
    left: 'left-0 top-0 h-full w-80 translate-x-0',
    top: 'top-0 left-0 w-full h-80',
    bottom: 'bottom-0 left-0 w-full h-80',
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in" onClick={onClose} />
      <div className={cn('absolute bg-slate-800 border-white/12 shadow-2xl flex flex-col', slideClass[side],
        side === 'right' || side === 'left' ? 'border-l' : 'border-t', 'animate-up')}>
        {children}
      </div>
    </div>
  )
}

function SheetHeader({ className, children }) {
  return (
    <div className={cn('px-6 py-5 border-b border-white/8 flex-shrink-0', className)}>
      {children}
    </div>
  )
}

function SheetTitle({ className, children }) {
  return <h2 className={cn('font-display font-bold text-lg text-white', className)}>{children}</h2>
}

function SheetDescription({ className, children }) {
  return <p className={cn('text-sm text-slate-400 mt-1', className)}>{children}</p>
}

function SheetBody({ className, children }) {
  return <div className={cn('flex-1 overflow-y-auto px-6 py-5', className)}>{children}</div>
}

function SheetFooter({ className, children }) {
  return <div className={cn('px-6 py-4 border-t border-white/8 flex gap-3 justify-end flex-shrink-0', className)}>{children}</div>
}

export { Sheet, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter }
