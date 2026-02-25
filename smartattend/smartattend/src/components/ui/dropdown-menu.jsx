import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      {Array.isArray(children)
        ? children.map((child, i) => {
            if (child?.type?.displayName === 'DropdownMenuTrigger') {
              return <span key={i} onClick={() => setOpen(o => !o)}>{child}</span>
            }
            if (child?.type?.displayName === 'DropdownMenuContent') {
              return open ? <span key={i}>{child}</span> : null
            }
            return child
          })
        : children}
    </div>
  )
}

function DropdownMenuTrigger({ children, asChild }) {
  return <>{children}</>
}
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

function DropdownMenuContent({ className, align = 'end', children, ...props }) {
  return (
    <div
      className={cn(
        'absolute z-50 mt-2 min-w-[160px] bg-slate-800 border border-white/12 rounded-xl shadow-xl py-1 animate-up',
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
DropdownMenuContent.displayName = 'DropdownMenuContent'

function DropdownMenuItem({ className, destructive, icon, children, onClick, ...props }) {
  return (
    <button
      className={cn(
        'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors duration-100',
        'font-body cursor-pointer border-none bg-transparent',
        destructive ? 'text-rose-400 hover:bg-rose-500/10' : 'text-slate-300 hover:bg-white/8 hover:text-white',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="flex-shrink-0 opacity-70">{icon}</span>}
      {children}
    </button>
  )
}

function DropdownMenuSeparator({ className }) {
  return <div className={cn('my-1 border-t border-white/8', className)} />
}

function DropdownMenuLabel({ className, children }) {
  return (
    <div className={cn('px-3 py-2 text-[11px] font-display font-semibold uppercase tracking-widest text-slate-500', className)}>
      {children}
    </div>
  )
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel }
