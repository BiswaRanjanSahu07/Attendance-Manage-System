import { cn } from '../../lib/utils'

function ScrollArea({ className, maxHeight, children, ...props }) {
  return (
    <div
      className={cn('overflow-y-auto', className)}
      style={maxHeight ? { maxHeight } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

function ScrollBar({ orientation = 'vertical', className }) {
  return null // Handled via CSS scrollbar styles in index.css
}

export { ScrollArea, ScrollBar }
