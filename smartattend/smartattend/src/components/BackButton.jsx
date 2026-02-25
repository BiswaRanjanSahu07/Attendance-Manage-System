import { useNavigate } from 'react-router-dom'

export default function BackButton({ to, label = 'Back' }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => to ? navigate(to) : navigate(-1)}
      className="flex items-center gap-2 text-sm transition-colors duration-150"
      style={{ color: 'var(--text-secondary)', fontFamily: 'Syne, sans-serif' }}
      onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m15 18-6-6 6-6"/>
      </svg>
      {label}
    </button>
  )
}
