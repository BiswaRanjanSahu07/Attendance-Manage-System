import { cn } from '../../lib/utils'

function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center text-slate-500 mb-4">
          {icon}
        </div>
      )}
      {title && <h3 className="font-display font-semibold text-white mb-1.5">{title}</h3>}
      {description && <p className="text-sm text-slate-500 max-w-xs mb-5">{description}</p>}
      {action}
    </div>
  )
}

export { EmptyState }
