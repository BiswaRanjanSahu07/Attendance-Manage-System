import { createContext, useContext } from 'react'
import { cn } from '../../lib/utils'

const RadioContext = createContext(null)

function RadioGroup({ value, onValueChange, className, children, ...props }) {
  return (
    <RadioContext.Provider value={{ value, onValueChange }}>
      <div role="radiogroup" className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </RadioContext.Provider>
  )
}

function RadioGroupItem({ value, label, description, disabled, className }) {
  const ctx = useContext(RadioContext)
  const checked = ctx?.value === value

  return (
    <label
      className={cn(
        'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150',
        checked
          ? 'border-sky-500/50 bg-sky-500/8'
          : 'border-white/10 bg-transparent hover:border-white/20 hover:bg-white/4',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={() => !disabled && ctx?.onValueChange?.(value)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150',
          checked ? 'border-sky-500' : 'border-white/25'
        )}>
          {checked && <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />}
        </div>
      </div>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-body text-slate-200">{label}</p>}
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}

export { RadioGroup, RadioGroupItem }
