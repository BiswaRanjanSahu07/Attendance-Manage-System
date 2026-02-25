import { cn } from '../../lib/utils'

const sizes = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8', xl: 'w-12 h-12' }

function Spinner({ size = 'md', color, className }) {
  return (
    <svg
      className={cn('animate-spin', sizes[size], className)}
      fill="none"
      viewBox="0 0 24 24"
      style={{ color: color || 'var(--accent-primary)' }}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  )
}

function LoadingOverlay({ show, message }) {
  if (!show) return null
  return (
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-2xl gap-3">
      <Spinner size="lg" />
      {message && <p className="text-sm text-slate-400 font-body">{message}</p>}
    </div>
  )
}

function LoadingPage({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg-primary)' }}>
      <Spinner size="xl" />
      <p className="text-sm text-slate-400 font-display">{message}</p>
    </div>
  )
}

export { Spinner, LoadingOverlay, LoadingPage }
