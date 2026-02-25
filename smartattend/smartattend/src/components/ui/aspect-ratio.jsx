import { cn } from '../../lib/utils'

function AspectRatio({ ratio = 16 / 9, children, className, ...props }) {
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      {...props}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}

export { AspectRatio }
