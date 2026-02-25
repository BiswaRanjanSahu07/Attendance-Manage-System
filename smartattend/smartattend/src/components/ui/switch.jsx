import { cn } from '../../lib/utils'

function Switch({ checked, onCheckedChange, disabled, label, description, className, ...props }) {
  return (
    <label className={cn('flex items-start gap-3 cursor-pointer group', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={cn(
          'relative inline-flex w-11 h-6 rounded-full border-2 border-transparent',
          'transition-all duration-200 ease-out flex-shrink-0 mt-0.5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
          checked ? 'bg-sky-500' : 'bg-slate-700',
          !disabled && 'cursor-pointer'
        )}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none inline-block w-5 h-5 rounded-full bg-white shadow-lg',
            'transform transition-transform duration-200 ease-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-display font-medium text-slate-200">{label}</p>}
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}

export { Switch }
