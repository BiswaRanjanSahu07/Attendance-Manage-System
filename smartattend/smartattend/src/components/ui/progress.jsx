import { cn } from '../../lib/utils'

function Progress({ value = 0, max = 100, className, color, size = 'md', label, showValue, ...props }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const heights = { sm: 'h-1', md: 'h-2', lg: 'h-3', xl: 'h-4' }

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-slate-400 font-body">{label}</span>}
          {showValue && <span className="text-xs font-mono text-slate-400">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className={cn('w-full rounded-full overflow-hidden bg-slate-700/60', heights[size], className)}
        {...props}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: color || 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
          }}
        />
      </div>
    </div>
  )
}

export { Progress }
