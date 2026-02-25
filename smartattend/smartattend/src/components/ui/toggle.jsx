import { cn } from '../../lib/utils'

function Toggle({ pressed, onPressedChange, disabled, size = 'md', variant = 'default', children, className, ...props }) {
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-5 text-base' }

  return (
    <button
      role="checkbox"
      aria-checked={pressed}
      onClick={() => !disabled && onPressedChange?.(!pressed)}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold transition-all duration-150',
        'border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
        pressed
          ? 'bg-sky-500/15 border-sky-500/40 text-sky-400'
          : 'bg-transparent border-white/15 text-slate-400 hover:border-white/25 hover:text-slate-200',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function ToggleGroup({ value, onValueChange, multiple = false, children, className }) {
  function handleToggle(val) {
    if (multiple) {
      const arr = Array.isArray(value) ? value : []
      onValueChange?.(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
    } else {
      onValueChange?.(value === val ? null : val)
    }
  }

  const childArr = Array.isArray(children) ? children : [children]
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {childArr.map((child, i) => {
        if (!child) return null
        const val = child.props.value
        const pressed = multiple ? (Array.isArray(value) && value.includes(val)) : value === val
        return { ...child, props: { ...child.props, pressed, onPressedChange: () => handleToggle(val) } }
      })}
    </div>
  )
}

export { Toggle, ToggleGroup }
