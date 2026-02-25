import { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

function ContextMenu({ children, items = [] }) {
  const [pos, setPos] = useState(null)
  const ref = useRef(null)

  function handleContextMenu(e) {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    function close() { setPos(null) }
    document.addEventListener('click', close)
    document.addEventListener('keydown', e => e.key === 'Escape' && close())
    return () => {
      document.removeEventListener('click', close)
    }
  }, [])

  return (
    <div ref={ref} onContextMenu={handleContextMenu} className="relative">
      {children}
      {pos && (
        <div
          className="fixed z-50 min-w-[160px] bg-slate-800 border border-white/12 rounded-xl shadow-xl py-1 animate-up"
          style={{ top: pos.y, left: pos.x }}
          onClick={e => e.stopPropagation()}
        >
          {items.map((item, i) =>
            item === 'separator' ? (
              <div key={i} className="my-1 border-t border-white/8" />
            ) : (
              <button
                key={i}
                onClick={() => { item.onClick?.(); setPos(null) }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors',
                  'font-body cursor-pointer border-none bg-transparent',
                  item.destructive ? 'text-rose-400 hover:bg-rose-500/10' : 'text-slate-300 hover:bg-white/8 hover:text-white'
                )}
              >
                {item.icon && <span className="opacity-70">{item.icon}</span>}
                {item.label}
                {item.shortcut && <span className="ml-auto text-[11px] text-slate-600">{item.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

export { ContextMenu }
