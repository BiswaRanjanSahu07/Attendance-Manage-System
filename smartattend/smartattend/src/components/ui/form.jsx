import { createContext, useContext } from 'react'
import { cn } from '../../lib/utils'

const FormContext = createContext({})

function Form({ onSubmit, children, className }) {
  return (
    <form onSubmit={onSubmit} className={cn('space-y-5', className)} noValidate>
      {children}
    </form>
  )
}

function FormField({ name, label, required, error, hint, children, className }) {
  return (
    <FormContext.Provider value={{ name, error }}>
      <div className={cn('space-y-1.5', className)}>
        {label && (
          <label
            htmlFor={name}
            className="block text-xs font-display font-semibold uppercase tracking-wider text-slate-400"
          >
            {label}
            {required && <span className="text-rose-400 ml-1">*</span>}
          </label>
        )}
        {children}
        {error && <p className="text-xs text-rose-400">{error}</p>}
        {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    </FormContext.Provider>
  )
}

function FormSection({ title, description, children, className }) {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="pb-3 border-b border-white/8">
          {title && <h3 className="font-display font-semibold text-sm text-white">{title}</h3>}
          {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

function FormActions({ children, className }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 pt-2', className)}>
      {children}
    </div>
  )
}

export { Form, FormField, FormSection, FormActions }
