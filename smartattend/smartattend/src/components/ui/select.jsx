import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Select = forwardRef(({ className, label, error, hint, children, placeholder, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-display font-semibold uppercase tracking-wider mb-2 text-slate-400">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'w-full bg-slate-900 border border-white/15 text-slate-100 rounded-xl px-4 py-3 text-sm',
            'font-body appearance-none cursor-pointer',
            'outline-none transition-all duration-150',
            'focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-rose-500',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  )
})

Select.displayName = 'Select'

const SelectItem = ({ value, children }) => <option value={value}>{children}</option>

export { Select, SelectItem }
