import { cn } from '../../lib/utils'

// Donut/Ring chart
function DonutChart({ data, size = 120, strokeWidth = 12, className }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const total = data.reduce((sum, d) => sum + d.value, 0)

  let offset = 0
  const segments = data.map(d => {
    const pct = d.value / total
    const dash = pct * circumference
    const seg = { ...d, dash, gap: circumference - dash, offset }
    offset += dash
    return seg
  })

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}/>
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx={size/2}
            cy={size/2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={-seg.offset}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  )
}

// Simple bar chart
function BarChart({ data, maxValue, height = 120, color = '#0ea5e9', className }) {
  const max = maxValue || Math.max(...data.map(d => d.value))

  return (
    <div className={cn('flex items-end gap-1', className)} style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-700"
            style={{
              height: `${(d.value / max) * (height - 20)}px`,
              background: d.active ? color : 'rgba(148,163,184,0.2)',
              minHeight: 4,
            }}
            title={`${d.label}: ${d.value}`}
          />
          {d.label && <span className="text-[10px] text-slate-600">{d.label}</span>}
        </div>
      ))}
    </div>
  )
}

// Mini sparkline
function Sparkline({ data, width = 100, height = 32, color = '#0ea5e9', className }) {
  if (!data?.length) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const w = width / (data.length - 1)

  const points = data.map((v, i) => [
    i * w,
    height - ((v - min) / range) * height
  ])

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')

  return (
    <svg width={width} height={height} className={cn('overflow-visible', className)}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export { DonutChart, BarChart, Sparkline }
