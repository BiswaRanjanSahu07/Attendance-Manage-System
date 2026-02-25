import { useState, useMemo } from 'react'
import Layout from '../components/Layout'
import BackButton from '../components/BackButton'
import { generateAttendanceHistory, formatDateShort } from '../lib/utils'

const history = generateAttendanceHistory(60)

const statusConfig = {
  present: { label: 'Present', cls: 'badge-success' },
  absent: { label: 'Absent', cls: 'badge-danger' },
  late: { label: 'Late', cls: 'badge-warning' },
  leave: { label: 'Leave', cls: 'badge-info' },
}

export default function AttendanceHistoryPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 15

  const filtered = useMemo(() => {
    return history.filter(r => {
      if (filter !== 'all' && r.status !== filter) return false
      if (search && !formatDateShort(r.date).toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [filter, search])

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  const summary = useMemo(() => ({
    present: history.filter(r => r.status === 'present').length,
    absent: history.filter(r => r.status === 'absent').length,
    late: history.filter(r => r.status === 'late').length,
    leave: history.filter(r => r.status === 'leave').length,
  }), [])

  return (
    <Layout>
      <div className="max-w-5xl">
        <div className="mb-6 animate-up">
          <BackButton to="/dashboard" />
          <h1 className="text-3xl font-display font-bold text-white mt-3">Attendance History</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Last 60 days attendance records</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-up-delay-1">
          {[
            { label: 'Present', count: summary.present, color: '#22d3ee' },
            { label: 'Absent', count: summary.absent, color: '#f43f5e' },
            { label: 'Late', count: summary.late, color: '#f59e0b' },
            { label: 'Leave', count: summary.leave, color: '#0ea5e9' },
          ].map(s => (
            <div key={s.label} className="stat-card text-center">
              <p className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs font-display font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="card animate-up-delay-2">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="flex gap-1 flex-wrap">
              {['all', 'present', 'absent', 'late', 'leave'].map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setPage(1) }}
                  className="px-3 py-1.5 rounded-lg text-xs font-display font-semibold capitalize transition-all duration-150"
                  style={{
                    background: filter === f ? 'rgba(14,165,233,0.15)' : 'var(--bg-secondary)',
                    color: filter === f ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    border: filter === f ? '1px solid rgba(14,165,233,0.3)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search by date..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="input-field ml-auto"
              style={{ maxWidth: 200 }}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  {['Date', 'Day', 'Status', 'Punch In', 'Punch Out', 'Hours'].map(h => (
                    <th key={h} className="text-left pb-3 text-xs font-display font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, i) => (
                  <tr key={i} className="table-row">
                    <td className="py-3 pr-4 text-sm font-body" style={{ color: 'var(--text-primary)' }}>
                      {formatDateShort(row.date)}
                    </td>
                    <td className="py-3 pr-4 text-xs font-display" style={{ color: 'var(--text-muted)' }}>
                      {row.date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`badge ${statusConfig[row.status].cls}`}>
                        {statusConfig[row.status].label}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{row.punchIn}</td>
                    <td className="py-3 pr-4 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{row.punchOut}</td>
                    <td className="py-3 text-xs font-mono font-medium" style={{ color: 'var(--accent-primary)' }}>{row.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
              <p className="font-display">No records found</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost" style={{ padding: '6px 12px', opacity: page === 1 ? 0.4 : 1 }}>←</button>
                <span className="flex items-center text-xs px-3" style={{ color: 'var(--text-secondary)' }}>{page}/{totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-ghost" style={{ padding: '6px 12px', opacity: page === totalPages ? 0.4 : 1 }}>→</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
