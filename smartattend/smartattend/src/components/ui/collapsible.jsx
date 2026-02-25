import { useState } from 'react'
import { cn } from '../../lib/utils'

function Collapsible({ defaultOpen = false, trigger, children, className }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('w-full', className)}>
      <div
        onClick={() => setOpen(o => !o)}
        className="cursor-pointer select-none"
      >
        {typeof trigger === 'function' ? trigger(open) : trigger}
      </div>
      {open && (
        <div className="animate-up">
          {children}
        </div>
      )}
    </div>
  )
}

export { Collapsible }
