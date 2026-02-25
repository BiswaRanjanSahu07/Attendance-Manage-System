import { cn } from '../../lib/utils'

function Separator({ className, orientation = 'horizontal', decorative = true, ...props }) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      className={cn(
        'shrink-0 bg-white/8',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  )
}

// Glow variant
function GlowSeparator({ className }) {
  return (
    <div
      className={cn('h-px w-full', className)}
      style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), transparent)' }}
    />
  )
}

export { Separator, GlowSeparator }
