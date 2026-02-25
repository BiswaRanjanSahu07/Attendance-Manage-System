import { cn } from '../../lib/utils'

function Label({ className, required, children, ...props }) {
  return (
    <label
      className={cn(
        'block text-xs font-display font-semibold uppercase tracking-wider text-slate-400',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-rose-400 ml-1">*</span>}
    </label>
  )
}

export { Label }
