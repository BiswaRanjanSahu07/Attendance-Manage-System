import { useState } from 'react'
import { cn } from '../../lib/utils'

function Tooltip({ children, content, side = 'top', delay = 300 }) {
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState(null)

  function show() {
    const t = setTimeout(() => setVisible(true), delay)
    setTimer(t)
  }
  function hide() {
    clearTimeout(timer)
    setVisible(false)
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && content && (
        <div
          className={cn(
            'absolute z-50 px-2.5 py-1.5 rounded-lg text-xs font-body text-white bg-slate-700 border border-white/12 shadow-lg whitespace-nowrap pointer-events-none animate-in',
            positions[side]
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { Tooltip }
