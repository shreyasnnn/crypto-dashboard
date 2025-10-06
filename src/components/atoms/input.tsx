// src/components/atoms/Input.tsx
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ReactNode
}

export const Input = ({ 
  error, 
  icon,
  className = '',
  ...props 
}: InputProps) => {
  const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2'
  const normalStyles = 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/20'
  const errorStyles = 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/20'

  return (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </div>
        )}
        <input
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  )
}
