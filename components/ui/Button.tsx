import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary text-foreground hover:bg-primary/80 focus:ring-primary',
      secondary: 'bg-secondary text-foreground hover:bg-secondary/80 focus:ring-secondary',
      outline: 'border border-primary text-primary hover:bg-primary hover:text-foreground focus:ring-primary',
      ghost: 'text-primary hover:bg-primary/10 focus:ring-primary'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="loading-dots mr-2">
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button