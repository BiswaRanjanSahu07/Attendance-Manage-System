import { useState } from 'react'
import { cn } from '../../lib/utils'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function Calendar({ value, onChange, minDate, maxDate, className }) {
  const today = new Date()
  const selected = value ? new Date(value) : null
  const [viewing, setViewing] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstDay = new Date(viewing.year, viewing.month, 1).getDay()
  const daysInMonth = new Date(viewing.year, viewing.month + 1, 0).getDate()

  function prevMonth() {
    setViewing(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 })
  }
  function nextMonth() {
    setViewing(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 })
  }

  function isSelected(day) {
    return selected && selected.getFullYear() === viewing.year && selected.getMonth() === viewing.month && selected.getDate() === day
  }
  function isToday(day) {
    return today.getFullYear() === viewing.year && today.getMonth() === viewing.month && today.getDate() === day
  }
  function isDisabled(day) {
    const d = new Date(viewing.year, viewing.month, day)
    if (minDate && d < new Date(minDate)) return true
    if (maxDate && d > new Date(maxDate)) return true
    return false
  }

  function selectDay(day) {
    if (isDisabled(day)) return
    const d = new Date(viewing.year, viewing.month, day)
    onChange?.(d.toISOString().split('T')[0])
  }

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className={cn('bg-slate-800 border border-white/12 rounded-2xl p-4 w-72', className)}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <span className="font-display font-semibold text-sm text-white">{MONTHS[viewing.month]} {viewing.year}</span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[11px] font-display font-semibold text-slate-500 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square">
            {day && (
              <button
                onClick={() => selectDay(day)}
                disabled={isDisabled(day)}
                className={cn(
                  'w-full h-full rounded-lg text-xs font-body flex items-center justify-center transition-all',
                  isSelected(day) && 'bg-sky-500 text-white font-semibold',
                  isToday(day) && !isSelected(day) && 'border border-sky-500/50 text-sky-400',
                  !isSelected(day) && !isToday(day) && !isDisabled(day) && 'text-slate-300 hover:bg-white/10 hover:text-white',
                  isDisabled(day) && 'text-slate-700 cursor-not-allowed'
                )}
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { Calendar }
