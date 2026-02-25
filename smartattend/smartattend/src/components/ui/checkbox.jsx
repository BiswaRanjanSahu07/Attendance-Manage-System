import { cn } from '../../lib/utils'

function Checkbox({ checked, onCheckedChange, disabled, label, description, className, id, ...props }) {
  const inputId = id || `checkbox-${Math.random().toString(36).slice(2)}`

  return (
    <div className="flex items-start gap-3">
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={inputId}
          checked={checked}
          onChange={e => onCheckedChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'flex w-5 h-5 items-center justify-center rounded-md border-2 cursor-pointer',
            'transition-all duration-150',
            'border-white/25 bg-transparent',
            'peer-checked:bg-sky-500 peer-checked:border-sky-500',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900',
            'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
            'hover:border-sky-500/60',
            className
          )}
        >
          {checked && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
        </label>
      </div>
      {(label || description) && (
        <label htmlFor={inputId} className="cursor-pointer">
          {label && <p className="text-sm font-body text-slate-200">{label}</p>}
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
