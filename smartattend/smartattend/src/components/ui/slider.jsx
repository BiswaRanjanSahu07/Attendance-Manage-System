import { useRef } from 'react'
import { cn } from '../../lib/utils'

function Slider({ value = 0, min = 0, max = 100, step = 1, onChange, label, showValue, disabled, className, color }) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-xs font-display font-semibold text-slate-400">{label}</span>}
          {showValue && <span className="text-xs font-mono text-sky-400">{value}</span>}
        </div>
      )}
      <div className="relative flex items-center h-5">
        <div className="relative w-full h-2 rounded-full overflow-hidden bg-slate-700/70">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: color || 'var(--accent-primary)' }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={e => onChange?.(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-white shadow-md border-2 border-sky-500 pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  )
}

export { Slider }
