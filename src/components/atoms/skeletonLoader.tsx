// src/components/atoms/SkeletonLoader.tsx

interface SkeletonLoaderProps {
  variant?: 'text' | 'circle' | 'rectangle'
  width?: string
  height?: string
  className?: string
}

export const SkeletonLoader = ({ 
  variant = 'text', 
  width,
  height,
  className = '' 
}: SkeletonLoaderProps) => {
  const baseStyles = 'animate-pulse bg-neutral-200'
  
  const variants = {
    text: 'rounded h-4',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  }

  const style = {
    width: width || (variant === 'circle' ? '40px' : '100%'),
    height: height || (variant === 'circle' ? '40px' : undefined),
  }

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  )
}
