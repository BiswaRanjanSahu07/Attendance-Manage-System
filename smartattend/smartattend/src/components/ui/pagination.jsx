import { cn } from '../../lib/utils'

function Pagination({ page, totalPages, onPageChange, className, showInfo, total, perPage }) {
  const pages = getPageRange(page, totalPages)

  return (
    <div className={cn('flex items-center gap-3 flex-wrap', className)}>
      {showInfo && total && (
        <p className="text-xs text-slate-500 mr-auto">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
        </p>
      )}
      <div className="flex items-center gap-1">
        <PagBtn onClick={() => onPageChange(1)} disabled={page === 1} aria-label="First">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
        </PagBtn>
        <PagBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Prev">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
        </PagBtn>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-slate-500 text-sm">…</span>
          ) : (
            <PagBtn key={p} active={p === page} onClick={() => onPageChange(p)}>{p}</PagBtn>
          )
        )}
        <PagBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </PagBtn>
        <PagBtn onClick={() => onPageChange(totalPages)} disabled={page === totalPages} aria-label="Last">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
        </PagBtn>
      </div>
    </div>
  )
}

function PagBtn({ children, active, disabled, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-display font-medium transition-all',
        active ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white',
        'disabled:opacity-30 disabled:cursor-not-allowed border-none cursor-pointer'
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function getPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

export { Pagination }
