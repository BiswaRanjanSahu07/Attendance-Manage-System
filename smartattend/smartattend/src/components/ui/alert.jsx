import { cn } from '../../lib/utils'

const variants = {
  default: { wrap: 'bg-slate-800/60 border-white/12 text-slate-300', icon: 'text-slate-400' },
  info: { wrap: 'bg-sky-500/8 border-sky-500/20 text-sky-200', icon: 'text-sky-400' },
  success: { wrap: 'bg-cyan-500/8 border-cyan-500/20 text-cyan-200', icon: 'text-cyan-400' },
  warning: { wrap: 'bg-amber-500/8 border-amber-500/20 text-amber-200', icon: 'text-amber-400' },
  destructive: { wrap: 'bg-rose-500/8 border-rose-500/20 text-rose-200', icon: 'text-rose-400' },
}

const defaultIcons = {
  default: <circle cx="12" cy="12" r="10"/>,
  info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  success: <><polyline points="20 6 9 17 4 12"/></>,
  warning: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
  destructive: <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
}

function Alert({ variant = 'default', icon, title, children, className, onDismiss, ...props }) {
  const styles = variants[variant]

  return (
    <div
      className={cn('flex gap-3 p-4 rounded-xl border', styles.wrap, className)}
      role="alert"
      {...props}
    >
      <span className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
        {icon || (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {defaultIcons[variant]}
          </svg>
        )}
      </span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-display font-semibold text-sm mb-0.5">{title}</p>}
        <div className="text-sm opacity-85">{children}</div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  )
}

function AlertTitle({ children, className }) {
  return <p className={cn('font-display font-semibold text-sm mb-1', className)}>{children}</p>
}

function AlertDescription({ children, className }) {
  return <div className={cn('text-sm opacity-85', className)}>{children}</div>
}

export { Alert, AlertTitle, AlertDescription }
