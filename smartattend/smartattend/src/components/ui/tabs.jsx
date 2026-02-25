import { useState, createContext, useContext } from 'react'
import { cn } from '../../lib/utils'

const TabsContext = createContext(null)

function Tabs({ defaultValue, value, onValueChange, children, className }) {
  const [internal, setInternal] = useState(defaultValue)
  const active = value ?? internal

  function handleChange(val) {
    setInternal(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ active, handleChange }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-xl p-1 bg-slate-900 border border-white/8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsTrigger({ value, className, children, ...props }) {
  const { active, handleChange } = useContext(TabsContext)
  const isActive = active === value

  return (
    <button
      onClick={() => handleChange(value)}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-display font-semibold transition-all duration-150 cursor-pointer border-none',
        isActive
          ? 'bg-sky-500 text-white shadow-sm'
          : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/8',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, className, children, ...props }) {
  const { active } = useContext(TabsContext)
  if (active !== value) return null

  return (
    <div className={cn('mt-4 animate-up', className)} {...props}>
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
