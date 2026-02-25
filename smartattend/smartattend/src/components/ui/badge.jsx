import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
  success: 'bg-cyan-500/12 text-cyan-400 border-cyan-500/20',
  warning: 'bg-amber-500/12 text-amber-400 border-amber-500/20',
  destructive: 'bg-rose-500/12 text-rose-400 border-rose-500/20',
  secondary: 'bg-slate-700 text-slate-300 border-slate-600',
  outline: 'bg-transparent text-slate-300 border-white/20',
  purple: 'bg-violet-500/12 text-violet-400 border-violet-500/20',
  orange: 'bg-orange-500/12 text-orange-400 border-orange-500/20',
}

function Badge({ className, variant = 'default', dot = false, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-display font-semibold',
        'uppercase tracking-[0.06em] border',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
          style={{ background: 'currentColor' }}
        />
      )}
      {children}
    </span>
  )
}

export { Badge }
