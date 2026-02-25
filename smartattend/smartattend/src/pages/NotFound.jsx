import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
      <div className="noise-overlay" />
      <div className="relative z-10 text-center animate-up">
        <p className="text-8xl font-display font-black text-sky-500 opacity-20 mb-4">404</p>
        <h1 className="text-2xl font-display font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Go Home</button>
      </div>
    </div>
  )
}
