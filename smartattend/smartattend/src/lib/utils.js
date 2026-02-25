export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function formatDateShort(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)
}

export function formatHours(hours) {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  return `${h}h ${m}m`
}

export function generateAttendanceHistory(days = 30) {
  const history = []
  const statuses = ['present', 'absent', 'late', 'leave']
  const weights = [0.65, 0.1, 0.15, 0.1]
  
  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dow = date.getDay()
    if (dow === 0 || dow === 6) continue // skip weekends
    
    const rand = Math.random()
    let cumulative = 0
    let status = 'present'
    for (let j = 0; j < statuses.length; j++) {
      cumulative += weights[j]
      if (rand < cumulative) { status = statuses[j]; break }
    }
    
    const inH = status === 'present' ? 8 + Math.floor(Math.random() * 2) : status === 'late' ? 10 + Math.floor(Math.random() * 2) : null
    const inM = inH ? Math.floor(Math.random() * 60) : null
    const outH = inH ? inH + 8 + Math.floor(Math.random() * 2) : null
    const outM = outH ? Math.floor(Math.random() * 60) : null
    const totalHours = inH && outH ? outH - inH + (outM - inM) / 60 : 0
    
    history.push({
      date: new Date(date),
      status,
      punchIn: inH ? `${String(inH).padStart(2,'0')}:${String(inM).padStart(2,'0')} AM` : '-',
      punchOut: outH ? `${String(outH % 12 || 12).padStart(2,'0')}:${String(outM).padStart(2,'0')} PM` : '-',
      totalHours: totalHours > 0 ? totalHours.toFixed(1) : '-',
    })
  }
  return history.reverse()
}
