import { cn } from '../../lib/utils'

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
}

function Avatar({ className, size = 'md', src, alt, fallback, color, ...props }) {
  const sizeClass = sizes[size]

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden flex-shrink-0', sizeClass, className)} {...props}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-white',
        sizeClass,
        className
      )}
      style={{ background: color || 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
      {...props}
    >
      {fallback}
    </div>
  )
}

function AvatarGroup({ children, max = 4, size = 'sm' }) {
  const arr = Array.isArray(children) ? children : [children]
  const visible = arr.slice(0, max)
  const extra = arr.length - max

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((child, i) => (
        <div key={i} className="ring-2 ring-slate-900 rounded-full">
          {child}
        </div>
      ))}
      {extra > 0 && (
        <div className={cn(
          'rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-display font-semibold ring-2 ring-slate-900',
          sizes[size],
          'text-[10px]'
        )}>
          +{extra}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
