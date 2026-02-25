import { cn } from '../../lib/utils'

function Breadcrumb({ children, className }) {
  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1.5 text-sm font-body">
        {children}
      </ol>
    </nav>
  )
}

function BreadcrumbItem({ children, current, href, className }) {
  return (
    <li className={cn('flex items-center gap-1.5', className)}>
      {href && !current ? (
        <a href={href} className="text-slate-400 hover:text-white transition-colors">{children}</a>
      ) : (
        <span className={current ? 'text-white font-medium' : 'text-slate-400'}>{children}</span>
      )}
    </li>
  )
}

function BreadcrumbSeparator({ className }) {
  return (
    <li className={cn('text-slate-600 select-none', className)} aria-hidden>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </li>
  )
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator }
