import React from 'react'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'outline' | 'secondary'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm md:text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

    const variantClasses = {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-black text-secondary-foreground hover:bg-secondary/80'
    }

    return (
        <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
    )
}