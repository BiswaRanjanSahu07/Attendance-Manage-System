import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

function Popover({ children, content, side = 'bottom', align = 'start' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const alignClass = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  const sideClass = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  }

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(o => !o)}>{children}</div>
      {open && (
        <div className={cn(
          'absolute z-50 min-w-[200px] bg-slate-800 border border-white/12 rounded-xl shadow-xl p-3 animate-up',
          sideClass[side], alignClass[align]
        )}>
          {typeof content === 'function' ? content({ close: () => setOpen(false) }) : content}
        </div>
      )}
    </div>
  )
}

export { Popover }
