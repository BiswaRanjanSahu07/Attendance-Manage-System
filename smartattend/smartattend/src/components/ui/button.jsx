import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-sky-500 text-white hover:bg-sky-400 shadow-sm',
  destructive: 'bg-rose-500 text-white hover:bg-rose-400 shadow-sm',
  outline: 'border border-white/20 bg-transparent text-slate-200 hover:bg-white/10',
  secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600',
  ghost: 'bg-transparent text-slate-300 hover:bg-white/10 hover:text-white',
  link: 'bg-transparent text-sky-400 underline-offset-4 hover:underline p-0 h-auto',
  success: 'bg-emerald-600 text-white hover:bg-emerald-500',
  warning: 'bg-amber-500 text-white hover:bg-amber-400',
}

const sizes = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-8 px-3 text-xs rounded-md',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-lg',
  icon: 'h-10 w-10 p-0',
  'icon-sm': 'h-8 w-8 p-0',
}

const Button = forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  disabled,
  loading,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold tracking-wide',
        'transition-all duration-150 ease-out cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
        'disabled:pointer-events-none disabled:opacity-40',
        'active:scale-[0.97]',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export { Button }
