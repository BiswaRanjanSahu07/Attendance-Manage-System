import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AppLogo from './AppLogo'
import LiveClock from './LiveClock'

const employeeLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { to: '/leave', label: 'Leave Request', icon: CalendarIcon },
  { to: '/history', label: 'Attendance History', icon: HistoryIcon },
]

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: HomeIcon },
  { to: '/admin/employees', label: 'Employees', icon: UsersIcon },
]

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const links = isAdmin ? adminLinks : employeeLinks

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="mb-8">
        <AppLogo size="sm" />
      </div>

      <div className="mb-6">
        <LiveClock showDate={true} />
      </div>

      <div className="glow-line mb-6" />

      <div className="flex-1">
        <p className="text-xs font-display font-semibold mb-3 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          {isAdmin ? 'Administration' : 'Menu'}
        </p>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-xs font-display font-bold text-white flex-shrink-0">
            {user?.avatar}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-display font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost w-full text-left text-xs flex items-center gap-2"
          style={{ padding: '8px 12px' }}
        >
          <LogoutIcon size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

// Inline SVG icon components
function HomeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )
}

function CalendarIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function HistoryIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  )
}

function UsersIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function LogoutIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
