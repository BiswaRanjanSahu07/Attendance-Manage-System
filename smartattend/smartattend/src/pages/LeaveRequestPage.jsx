import { useState } from 'react'
import Layout from '../components/Layout'
import BackButton from '../components/BackButton'
import { useToast, ToastContainer } from '../hooks/use-toast.jsx'

const leaveTypes = [
  'Annual Leave',
  'Sick Leave',
  'Personal Leave',
  'Maternity/Paternity Leave',
  'Bereavement Leave',
  'Unpaid Leave',
  'Emergency Leave',
]

const existingRequests = [
  { id: 1, type: 'Annual Leave', from: '2024-12-20', to: '2024-12-27', days: 6, status: 'approved', reason: 'Family vacation' },
  { id: 2, type: 'Sick Leave', from: '2024-11-14', to: '2024-11-15', days: 2, status: 'approved', reason: 'Flu' },
  { id: 3, type: 'Personal Leave', from: '2025-01-10', to: '2025-01-10', days: 1, status: 'pending', reason: 'Personal matters' },
]

export default function LeaveRequestPage() {
  const { toasts, toast } = useToast()
  const [form, setForm] = useState({ type: '', from: '', to: '', reason: '' })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.type || !form.from || !form.to || !form.reason) {
      toast({ title: 'Missing Fields', description: 'Please fill in all required fields.', type: 'error' })
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setForm({ type: '', from: '', to: '', reason: '' })
    toast({ title: 'Leave Requested', description: 'Your request has been submitted for approval.', type: 'success' })
  }

  function calcDays() {
    if (!form.from || !form.to) return 0
    const diff = new Date(form.to) - new Date(form.from)
    return Math.max(0, Math.floor(diff / 86400000) + 1)
  }

  const leaveBalance = { annual: 14, sick: 10, personal: 5 }

  return (
    <Layout>
      <ToastContainer toasts={toasts} />
      <div className="max-w-4xl">
        <div className="mb-6 animate-up">
          <BackButton to="/dashboard" />
          <h1 className="text-3xl font-display font-bold text-white mt-3">Leave Request</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Submit and manage your leave applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-up-delay-1">
          {[
            { label: 'Annual Leave', used: 4, total: leaveBalance.annual, color: '#0ea5e9' },
            { label: 'Sick Leave', used: 2, total: leaveBalance.sick, color: '#22d3ee' },
            { label: 'Personal Leave', used: 1, total: leaveBalance.personal, color: '#f59e0b' },
          ].map(b => (
            <div key={b.label} className="stat-card">
              <p className="text-xs font-display font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>{b.label}</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-2xl font-display font-bold" style={{ color: b.color }}>{b.total - b.used}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/{b.total} days left</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <div className="h-full rounded-full" style={{ width: `${((b.total - b.used) / b.total) * 100}%`, background: b.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request Form */}
          <div className="card animate-up-delay-2">
            <h2 className="font-display font-semibold text-white mb-5">New Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-display font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Leave Type <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <select name="type" value={form.type} onChange={handleChange} className="select-field">
                  <option value="">Select leave type...</option>
                  {leaveTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-display font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    From <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <input type="date" name="from" value={form.from} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-display font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    To <span style={{ color: '#f43f5e' }}>*</span>
                  </label>
                  <input type="date" name="to" value={form.to} onChange={handleChange} min={form.from} className="input-field" />
                </div>
              </div>

              {calcDays() > 0 && (
                <div className="rounded-lg p-3 text-center" style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)' }}>
                  <span className="text-sm font-display font-semibold text-sky-400">{calcDays()} working day{calcDays() > 1 ? 's' : ''} requested</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-display font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Reason <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Brief reason for your leave request..."
                  rows={3}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full" style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>

          {/* Request History */}
          <div className="card animate-up-delay-3">
            <h2 className="font-display font-semibold text-white mb-5">Recent Requests</h2>
            <div className="space-y-3">
              {existingRequests.map(req => (
                <div key={req.id} className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-display font-semibold text-white">{req.type}</span>
                    <span className={`badge ${req.status === 'approved' ? 'badge-success' : req.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {req.from} → {req.to} · <span style={{ color: 'var(--accent-primary)' }}>{req.days} day{req.days > 1 ? 's' : ''}</span>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{req.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
