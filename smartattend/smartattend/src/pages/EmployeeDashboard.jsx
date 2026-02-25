import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/Layout'
import LiveClock from '../components/LiveClock'
import { useToast, ToastContainer } from '../hooks/use-toast.jsx'
import { formatCurrency, formatHours } from '../lib/utils'

const weekStats = [
  { day: 'Mon', hours: 8.5, status: 'present' },
  { day: 'Tue', hours: 7.0, status: 'present' },
  { day: 'Wed', hours: 0, status: 'absent' },
  { day: 'Thu', hours: 9.0, status: 'present' },
  { day: 'Fri', hours: 6.5, status: 'late' },
]

export default function EmployeeDashboard() {
  const { user } = useAuth()
  const { toasts, toast } = useToast()
  const [punchedIn, setPunchedIn] = useState(false)
  const [punchInTime, setPunchInTime] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [timerRef, setTimerRef] = useState(null)

  function handlePunchIn() {
    const now = new Date()
    setPunchedIn(true)
    setPunchInTime(now)
    setElapsedSeconds(0)
    const ref = setInterval(() => setElapsedSeconds(s => s + 1), 1000)
    setTimerRef(ref)
    toast({ title: 'Punched In', description: `Started at ${now.toLocaleTimeString()}`, type: 'success' })
  }

  function handlePunchOut() {
    clearInterval(timerRef)
    setPunchedIn(false)
    const hours = (elapsedSeconds / 3600).toFixed(2)
    toast({ title: 'Punched Out', description: `Session: ${formatElapsed(elapsedSeconds)}`, type: 'info' })
    setElapsedSeconds(0)
    setPunchInTime(null)
  }

  function formatElapsed(secs) {
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  }

  const monthStats = { present: 18, absent: 2, late: 3, leave: 2, totalHours: 154.5 }
  const attendanceRate = Math.round((monthStats.present / 22) * 100)

  return (
    <Layout>
      <ToastContainer toasts={toasts} />
      
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-up">
          <div>
            <p className="text-sm font-display mb-1" style={{ color: 'var(--text-secondary)' }}>Welcome back,</p>
            <h1 className="text-3xl font-display font-bold text-white">{user?.name}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{user?.position} · {user?.department}</p>
          </div>
          <div className="text-right hidden md:block">
            <LiveClock showDate={true} />
          </div>
        </div>

        {/* Punch In/Out Card */}
        <div className="card mb-6 animate-up-delay-1 text-center" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid var(--border-normal)' }}>
          <div className="mb-6">
            <LiveClock size="lg" showDate={false} />
          </div>

          {punchedIn && (
            <div className="mb-6">
              <div className="font-mono text-2xl font-medium text-green-400 tabular-nums">
                {formatElapsed(elapsedSeconds)}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Session started · {punchInTime?.toLocaleTimeString()}
              </p>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePunchIn}
              disabled={punchedIn}
              className="punch-btn-in"
              style={{ opacity: punchedIn ? 0.4 : 1, cursor: punchedIn ? 'not-allowed' : 'pointer' }}
            >
              ▶ Punch In
            </button>
            <button
              onClick={handlePunchOut}
              disabled={!punchedIn}
              className="punch-btn-out"
              style={{ opacity: !punchedIn ? 0.4 : 1, cursor: !punchedIn ? 'not-allowed' : 'pointer' }}
            >
              ■ Punch Out
            </button>
          </div>

          <div className="mt-4">
            <span className={`badge ${punchedIn ? 'badge-success' : 'badge-danger'}`}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: punchedIn ? '#22d3ee' : '#f43f5e', animation: punchedIn ? 'pulse 2s infinite' : 'none' }} />
              {punchedIn ? 'Currently Active' : 'Not Clocked In'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Present Days', value: monthStats.present, suffix: '/22', color: '#22d3ee' },
            { label: 'Absent Days', value: monthStats.absent, suffix: ' days', color: '#f43f5e' },
            { label: 'Late Arrivals', value: monthStats.late, suffix: ' times', color: '#f59e0b' },
            { label: 'Total Hours', value: monthStats.totalHours, suffix: 'h', color: '#0ea5e9' },
          ].map((stat, i) => (
            <div key={stat.label} className={`stat-card animate-up-delay-${i+2}`}>
              <p className="text-xs font-display font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              <p className="text-2xl font-display font-bold" style={{ color: stat.color }}>
                {stat.value}<span className="text-base font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Rate */}
          <div className="card animate-up-delay-3">
            <h3 className="font-display font-semibold text-sm mb-4 text-white">Monthly Attendance Rate</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--bg-elevated)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#0ea5e9" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - attendanceRate / 100)}`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-display font-bold text-sky-400">{attendanceRate}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span style={{ color: 'var(--text-secondary)' }}>Present: {monthStats.present} days</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <span style={{ color: 'var(--text-secondary)' }}>Absent: {monthStats.absent} days</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  <span style={{ color: 'var(--text-secondary)' }}>Late: {monthStats.late} days</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0" />
                  <span style={{ color: 'var(--text-secondary)' }}>Leave: {monthStats.leave} days</span>
                </div>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="card animate-up-delay-4">
            <h3 className="font-display font-semibold text-sm mb-4 text-white">This Week</h3>
            <div className="space-y-2">
              {weekStats.map(day => (
                <div key={day.day} className="flex items-center gap-3">
                  <span className="text-xs font-display font-semibold w-8" style={{ color: 'var(--text-muted)' }}>{day.day}</span>
                  <div className="flex-1 rounded-full h-2 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(day.hours / 10) * 100}%`,
                        background: day.status === 'present' ? '#0ea5e9' : day.status === 'late' ? '#f59e0b' : '#f43f5e',
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono w-10 text-right" style={{ color: 'var(--text-secondary)' }}>
                    {day.hours > 0 ? `${day.hours}h` : '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
