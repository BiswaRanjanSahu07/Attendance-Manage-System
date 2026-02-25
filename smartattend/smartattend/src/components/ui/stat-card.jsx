import { cn } from '../../lib/utils'

function StatCard({ label, value, suffix, prefix, change, changeLabel, icon, color, className, ...props }) {
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-slate-800/60 p-5 transition-all duration-200',
        'hover:border-white/15 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-slate-500">{label}</p>
        {icon && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}18`, color }}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-sm text-slate-400">{prefix}</span>}
        <span className="text-3xl font-display font-bold" style={{ color: color || 'white' }}>{value}</span>
        {suffix && <span className="text-sm text-slate-400 ml-1">{suffix}</span>}
      </div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 mt-2 text-xs font-display font-semibold',
          isPositive ? 'text-cyan-400' : isNegative ? 'text-rose-400' : 'text-slate-500')}>
          {isPositive && <span>↑</span>}
          {isNegative && <span>↓</span>}
          <span>{Math.abs(change)}%</span>
          {changeLabel && <span className="text-slate-600 font-normal">{changeLabel}</span>}
        </div>
      )}
    </div>
  )
}

export { StatCard }
