import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AppLogo from '../components/AppLogo'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('employee')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const demoCredentials = {
    employee: { username: 'alice', password: 'pass123' },
    admin: { username: 'admin', password: 'admin123' },
  }

  function fillDemo() {
    const creds = demoCredentials[role]
    setUsername(creds.username)
    setPassword(creds.password)
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(username, password)
    setLoading(false)
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard')
    } else {
      setError('Invalid username or password. Try the demo credentials.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <div className="noise-overlay" />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
        <div className="absolute top-1/3 left-1/4 w-px h-64 opacity-10" style={{ background: 'linear-gradient(180deg, transparent, #0ea5e9, transparent)' }} />
        <div className="absolute top-1/4 right-1/3 w-px h-48 opacity-10" style={{ background: 'linear-gradient(180deg, transparent, #22d3ee, transparent)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 animate-up">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <AppLogo size="lg" />
          </div>
          <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
            Attendance Management System
          </p>
        </div>

        <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-normal)' }}>
          {/* Role Toggle */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: 'var(--bg-secondary)' }}>
            {['employee', 'admin'].map(r => (
              <button
                key={r}
                onClick={() => { setRole(r); setError(''); setUsername(''); setPassword('') }}
                className="flex-1 py-2 rounded-lg text-sm font-display font-semibold capitalize transition-all duration-200"
                style={{
                  background: role === r ? 'var(--accent-primary)' : 'transparent',
                  color: role === r ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {r === 'admin' ? '⚙ Admin' : '👤 Employee'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-display font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder={role === 'admin' ? 'admin' : 'alice, bob, carol'}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-display font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg p-3 text-xs" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', color: '#f43f5e' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full" style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={fillDemo} className="text-xs transition-colors" style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              Fill demo credentials →
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          Demo: <span style={{ color: 'var(--text-secondary)' }}>alice / pass123</span> &nbsp;·&nbsp; <span style={{ color: 'var(--text-secondary)' }}>admin / admin123</span>
        </p>
      </div>
    </div>
  )
}
