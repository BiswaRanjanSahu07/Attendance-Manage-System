import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

function Command({ open, onClose, items = [], onSelect, placeholder = 'Search...', className }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const filtered = query
    ? items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.group?.toLowerCase().includes(query.toLowerCase())
      )
    : items

  const grouped = filtered.reduce((acc, item) => {
    const g = item.group || 'Results'
    acc[g] = acc[g] || []
    acc[g].push(item)
    return acc
  }, {})

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    function handler(e) { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative z-10 w-full max-w-lg bg-slate-800 border border-white/12 rounded-2xl shadow-2xl overflow-hidden animate-up', className)}>
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500 flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none font-body"
          />
          <kbd className="text-[10px] text-slate-600 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {Object.keys(grouped).length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500">No results found</div>
          ) : (
            Object.entries(grouped).map(([group, groupItems]) => (
              <div key={group}>
                <div className="px-4 py-2 text-[11px] font-display font-semibold uppercase tracking-widest text-slate-600">{group}</div>
                {groupItems.map(item => (
                  <button
                    key={item.value}
                    onClick={() => { onSelect?.(item); onClose?.() }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors text-left border-none bg-transparent cursor-pointer"
                  >
                    {item.icon && <span className="text-slate-500">{item.icon}</span>}
                    {item.label}
                    {item.shortcut && <kbd className="ml-auto text-[10px] text-slate-600 border border-white/10 rounded px-1.5">{item.shortcut}</kbd>}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export { Command }
