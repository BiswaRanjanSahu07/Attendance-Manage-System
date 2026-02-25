import { cn } from '../../lib/utils'

function Table({ className, children, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full border-collapse', className)} {...props}>
        {children}
      </table>
    </div>
  )
}

function TableHeader({ className, children, ...props }) {
  return <thead className={className} {...props}>{children}</thead>
}

function TableBody({ className, children, ...props }) {
  return <tbody className={className} {...props}>{children}</tbody>
}

function TableFooter({ className, children, ...props }) {
  return (
    <tfoot className={cn('border-t border-white/8 bg-slate-800/50 font-medium', className)} {...props}>
      {children}
    </tfoot>
  )
}

function TableRow({ className, clickable, ...props }) {
  return (
    <tr
      className={cn(
        'border-b border-white/6 transition-colors duration-100',
        clickable ? 'cursor-pointer hover:bg-white/5' : 'hover:bg-white/3',
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, children, sortable, sorted, ...props }) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-[11px] font-display font-semibold uppercase tracking-widest text-slate-500',
        sortable && 'cursor-pointer hover:text-slate-300 select-none',
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-1.5">
        {children}
        {sorted === 'asc' && <span>↑</span>}
        {sorted === 'desc' && <span>↓</span>}
      </span>
    </th>
  )
}

function TableCell({ className, children, ...props }) {
  return (
    <td className={cn('px-4 py-3.5 text-sm text-slate-300 font-body', className)} {...props}>
      {children}
    </td>
  )
}

function TableCaption({ className, children, ...props }) {
  return (
    <caption className={cn('mt-4 text-sm text-slate-500', className)} {...props}>
      {children}
    </caption>
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }
