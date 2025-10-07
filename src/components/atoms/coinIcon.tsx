// src/components/atoms/CoinIcon.tsx
import { ImgHTMLAttributes, useState } from 'react'

interface CoinIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

export const CoinIcon = ({ 
  size = 'md', 
  fallback = '💰',
  alt = 'Coin',
  className = '',
  ...props 
}: CoinIconProps) => {
  const [imageError, setImageError] = useState(false)

  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }

  if (imageError) {
    return (
      <div className={`${sizes[size]} rounded-full bg-primary-100 flex items-center justify-center text-xl ${className}`}>
        {fallback}
      </div>
    )
  }

  return (
    <img
      className={`${sizes[size]} rounded-full object-cover ${className}`}
      alt={alt}
      onError={() => setImageError(true)}
      {...props}
    />
  )
}
