import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-card border border-border',
      glass: 'glass',
      elevated: 'bg-card border border-border shadow-lg'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-6',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export default Card