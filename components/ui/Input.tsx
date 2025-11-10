import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
              {icon}
            </div>
          )}
          <input
            className={cn(
              'w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary-lime focus:border-transparent transition-all duration-200',
              icon && 'pl-10',
              error && 'border-primary-coral focus:ring-primary-coral',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-danger">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input