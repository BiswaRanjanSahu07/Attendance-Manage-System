import { useState } from 'react'
import { cn } from '../../lib/utils'

function Carousel({ items, renderItem, className, showDots = true, showArrows = true, autoPlay = false }) {
  const [current, setCurrent] = useState(0)

  function prev() { setCurrent(c => (c - 1 + items.length) % items.length) }
  function next() { setCurrent(c => (c + 1) % items.length) }

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div
        className="flex transition-transform duration-400 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, i) => (
          <div key={i} className="w-full flex-shrink-0">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-800/90 border border-white/12 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-800/90 border border-white/12 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}

      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'rounded-full transition-all duration-200 border-none cursor-pointer',
                i === current ? 'w-5 h-2 bg-sky-500' : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { Carousel }
