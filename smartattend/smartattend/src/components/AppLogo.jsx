export default function AppLogo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 28, text: 'text-base' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-3">
      <div
        style={{ width: s.icon, height: s.icon }}
        className="relative flex items-center justify-center rounded-xl bg-sky-500 shadow-lg"
      >
        <svg width={s.icon * 0.55} height={s.icon * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" opacity="0.9"/>
          <circle cx="12" cy="9" r="2.5" fill="#0ea5e9"/>
        </svg>
        <div className="absolute inset-0 rounded-xl bg-sky-400 opacity-20 animate-pulse-slow" />
      </div>
      <div>
        <span className={`font-display font-bold ${s.text} text-white tracking-tight`}>
          Smart<span className="text-sky-400">Attend</span>
        </span>
      </div>
    </div>
  )
}
