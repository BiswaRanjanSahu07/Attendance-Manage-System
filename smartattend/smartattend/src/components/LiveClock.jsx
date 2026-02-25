import { useState, useEffect } from 'react'
import { formatTime, formatDate } from '../lib/utils'

export default function LiveClock({ showDate = true, size = 'md' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (size === 'lg') {
    return (
      <div className="text-center">
        <div className="font-mono text-5xl font-medium text-sky-400 tracking-tight tabular-nums">
          {formatTime(now)}
        </div>
        {showDate && (
          <div className="mt-2 text-sm font-body" style={{ color: 'var(--text-secondary)' }}>
            {formatDate(now)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="font-mono text-sm font-medium text-sky-400 tabular-nums">
        {formatTime(now)}
      </div>
      {showDate && (
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      )}
    </div>
  )
}
