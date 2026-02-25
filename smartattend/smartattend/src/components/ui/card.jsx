import { cn } from '../../lib/utils'

function Card({ className, hover = false, glow = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/8 bg-slate-800/60 backdrop-blur-sm',
        hover && 'transition-all duration-200 hover:border-white/15 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer',
        glow && 'shadow-[0_0_30px_rgba(14,165,233,0.08)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pt-6 pb-0', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn('font-display font-semibold text-base text-white leading-tight', className)} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn('text-xs text-slate-500 mt-1', className)} {...props}>
      {children}
    </p>
  )
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('px-6 py-6', className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn('px-6 pb-6 pt-0 flex items-center gap-3', className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
