import { useState, useRef } from 'react'
import { cn } from '../../lib/utils'

function InputOTP({ length = 6, value = '', onChange, className }) {
  const inputs = useRef([])

  function handleChange(i, e) {
    const val = e.target.value.replace(/\D/g, '').slice(-1)
    const chars = value.split('')
    chars[i] = val
    const newVal = chars.join('').slice(0, length)
    onChange?.(newVal)
    if (val && i < length - 1) inputs.current[i + 1]?.focus()
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < length - 1) inputs.current[i + 1]?.focus()
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange?.(pasted)
    const focusIdx = Math.min(pasted.length, length - 1)
    inputs.current[focusIdx]?.focus()
    e.preventDefault()
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            'w-11 h-12 text-center text-lg font-mono font-semibold text-white',
            'bg-slate-900 border-2 rounded-xl outline-none transition-all',
            value[i] ? 'border-sky-500' : 'border-white/15',
            'focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20'
          )}
        />
      ))}
    </div>
  )
}

export { InputOTP }
