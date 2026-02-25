import { useState, useRef } from 'react'
import { cn } from '../../lib/utils'

function HoverCard({ trigger, content, side = 'top', className }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef(null)

  function handleEnter() {
    timerRef.current = setTimeout(() => setOpen(true), 200)
  }
  function handleLeave() {
    clearTimeout(timerRef.current)
    setOpen(false)
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {trigger}
      {open && (
        <div className={cn(
          'absolute z-50 min-w-[220px] bg-slate-800 border border-white/12 rounded-xl shadow-2xl p-4 animate-up pointer-events-none',
          positions[side], className
        )}>
          {content}
        </div>
      )}
    </div>
  )
}

export { HoverCard }
