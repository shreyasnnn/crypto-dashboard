// src/components/atoms/Badge.tsx

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'danger' | 'neutral' | 'primary'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge = ({ 
  children, 
  variant = 'neutral',
  size = 'md',
  className = '' 
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-md'
  
  const variants = {
    success: 'bg-success-50 text-success-700 border border-success-200',
    danger: 'bg-danger-50 text-danger-700 border border-danger-200',
    neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
    primary: 'bg-primary-50 text-primary-700 border border-primary-200',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}
