import { useState } from 'react'
import { cn } from '../../lib/utils'

function Accordion({ type = 'single', defaultValue, children, className }) {
  const [open, setOpen] = useState(type === 'single' ? defaultValue : defaultValue || [])

  function toggle(value) {
    if (type === 'single') {
      setOpen(o => o === value ? null : value)
    } else {
      setOpen(o => o.includes(value) ? o.filter(v => v !== value) : [...o, value])
    }
  }

  function isOpen(value) {
    return type === 'single' ? open === value : open.includes(value)
  }

  return (
    <div className={cn('space-y-1', className)}>
      {Array.isArray(children)
        ? children.map(child => child && { ...child, props: { ...child.props, _isOpen: isOpen(child.props.value), _toggle: toggle } })
        : children && { ...children, props: { ...children.props, _isOpen: isOpen(children.props.value), _toggle: toggle } }
      }
    </div>
  )
}

function AccordionItem({ value, trigger, children, _isOpen, _toggle, className }) {
  return (
    <div className={cn('border border-white/10 rounded-xl overflow-hidden', className)}>
      <button
        onClick={() => _toggle(value)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-display font-semibold text-sm text-white hover:bg-white/5 transition-colors"
      >
        {trigger}
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={cn('flex-shrink-0 transition-transform duration-200', _isOpen && 'rotate-180')}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {_isOpen && (
        <div className="px-5 pb-5 text-sm text-slate-300 font-body border-t border-white/8 pt-4 animate-up">
          {children}
        </div>
      )}
    </div>
  )
}

export { Accordion, AccordionItem }
