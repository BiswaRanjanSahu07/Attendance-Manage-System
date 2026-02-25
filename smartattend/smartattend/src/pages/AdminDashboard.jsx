import { useState, useMemo } from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { ALL_EMPLOYEES, } from '../lib/auth'
import { formatCurrency } from '../lib/utils'

const statusConfig = {
  present: { label: 'Present', cls: 'badge-success', color: '#22d3ee' },
  absent: { label: 'Absent', cls: 'badge-danger', color: '#f43f5e' },
  late: { label: 'Late', cls: 'badge-warning', color: '#f59e0b' },
  leave: { label: 'Leave', cls: 'badge-info', color: '#0ea5e9' },
}

const departments = ['All', ...new Set(ALL_EMPLOYEES.map(e => e.department))]

export default function AdminDashboard() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [selectedEmp, setSelectedEmp] = useState(null)

  const filtered = useMemo(() => {
    return ALL_EMPLOYEES
      .filter(e => {
        if (deptFilter !== 'All' && e.department !== deptFilter) return false
        if (statusFilter !== 'all' && e.status !== statusFilter) return false
        if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        if (sortBy === 'salary') return b.salary - a.salary
        if (sortBy === 'hours') return b.hoursToday - a.hoursToday
        return 0
      })
  }, [search, deptFilter, statusFilter, sortBy])

  const summary = useMemo(() => ({
    total: ALL_EMPLOYEES.length,
    present: ALL_EMPLOYEES.filter(e => e.status === 'present').length,
    absent: ALL_EMPLOYEES.filter(e => e.status === 'absent').length,
    late: ALL_EMPLOYEES.filter(e => e.status === 'late').length,
    leave: ALL_EMPLOYEES.filter(e => e.status === 'leave').length,
    totalPayroll: ALL_EMPLOYEES.reduce((sum, e) => sum + e.salary, 0),
  }), [])

  return (
    <Layout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-up">
          <div>
            <p className="text-sm font-display mb-1" style={{ color: 'var(--text-secondary)' }}>Administration</p>
            <h1 className="text-3xl font-display font-bold text-white">HR Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Welcome, {user?.name}</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs font-display font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Annual Payroll</p>
            <p className="text-2xl font-display font-bold text-sky-400">{formatCurrency(summary.totalPayroll)}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 animate-up-delay-1">
          {[
            { label: 'Total Staff', value: summary.total, color: '#f8fafc' },
            { label: 'Present', value: summary.present, color: '#22d3ee' },
            { label: 'Absent', value: summary.absent, color: '#f43f5e' },
            { label: 'Late', value: summary.late, color: '#f59e0b' },
            { label: 'On Leave', value: summary.leave, color: '#0ea5e9' },
          ].map(s => (
            <div key={s.label} className="stat-card text-center">
              <p className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs font-display font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card mb-4 animate-up-delay-2">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field"
              style={{ maxWidth: 220 }}
            />
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="select-field" style={{ maxWidth: 160 }}>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="select-field" style={{ maxWidth: 150 }}>
              {['all', 'present', 'absent', 'late', 'leave'].map(s => (
                <option key={s} value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="select-field" style={{ maxWidth: 150 }}>
              <option value="name">Sort: Name</option>
              <option value="salary">Sort: Salary</option>
              <option value="hours">Sort: Hours</option>
            </select>
            <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>
              {filtered.length} of {ALL_EMPLOYEES.length} employees
            </span>
          </div>
        </div>

        {/* Employee Table */}
        <div className="card animate-up-delay-3 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {['Employee', 'ID', 'Department', 'Position', 'Status', 'Today', 'Salary', ''].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-xs font-display font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className="table-row" style={{ animationDelay: `${i * 0.02}s` }}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold text-white flex-shrink-0"
                        style={{ background: `hsl(${emp.id.slice(-3) * 137.5 % 360}, 60%, 45%)` }}>
                        {emp.avatar}
                      </div>
                      <span className="text-sm font-display font-semibold text-white whitespace-nowrap">{emp.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{emp.id}</td>
                  <td className="py-3 pr-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{emp.department}</td>
                  <td className="py-3 pr-4 text-xs" style={{ color: 'var(--text-secondary)' }}>{emp.position}</td>
                  <td className="py-3 pr-4">
                    <span className={`badge ${statusConfig[emp.status].cls}`}>{statusConfig[emp.status].label}</span>
                  </td>
                  <td className="py-3 pr-4 text-xs font-mono" style={{ color: 'var(--accent-primary)' }}>
                    {emp.hoursToday > 0 ? `${emp.hoursToday}h` : '-'}
                  </td>
                  <td className="py-3 pr-4 text-sm font-display font-semibold" style={{ color: '#22d3ee' }}>
                    {formatCurrency(emp.salary)}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => setSelectedEmp(selectedEmp?.id === emp.id ? null : emp)}
                      className="text-xs btn-ghost"
                      style={{ padding: '4px 10px' }}
                    >
                      {selectedEmp?.id === emp.id ? 'Close' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
              <p className="font-display">No employees match your filters</p>
            </div>
          )}
        </div>

        {/* Employee Detail Panel */}
        {selectedEmp && (
          <div className="card mt-4 animate-up">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-display font-bold text-white"
                  style={{ background: `hsl(${selectedEmp.id.slice(-3) * 137.5 % 360}, 60%, 45%)` }}>
                  {selectedEmp.avatar}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">{selectedEmp.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedEmp.position} · {selectedEmp.department}</p>
                  <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{selectedEmp.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedEmp(null)} className="btn-ghost" style={{ padding: '6px 12px' }}>✕</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-xs font-display uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Status Today</p>
                <span className={`badge ${statusConfig[selectedEmp.status].cls}`}>{statusConfig[selectedEmp.status].label}</span>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-xs font-display uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Hours Today</p>
                <p className="text-xl font-display font-bold text-sky-400">{selectedEmp.hoursToday || '-'}h</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-xs font-display uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Annual Salary</p>
                <p className="text-xl font-display font-bold text-cyan-400">{formatCurrency(selectedEmp.salary)}</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
                <p className="text-xs font-display uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Monthly Pay</p>
                <p className="text-xl font-display font-bold" style={{ color: '#22d3ee' }}>{formatCurrency(selectedEmp.salary / 12)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
