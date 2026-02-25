import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(({ className, type = 'text', label, error, hint, startIcon, endIcon, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2 text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full bg-slate-900 border border-white/15 text-slate-100 rounded-xl px-4 py-3 text-sm',
            'placeholder:text-slate-600 font-body',
            'outline-none transition-all duration-150',
            'focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export { Input }
