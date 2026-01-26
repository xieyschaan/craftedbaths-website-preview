import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'black' | 'white' | 'with-tagline'
  className?: string
  width?: number
  height?: number
}

export default function Logo({ 
  variant = 'black', 
  className,
  width = 200,
  height = 60
}: LogoProps) {
  const getLogoSrc = () => {
    switch (variant) {
      case 'white':
        return '/assets/logo/Logo-SVG-White.svg'
      case 'with-tagline':
        return '/assets/logo/Logo-Tagline.png'
      case 'black':
      default:
        return '/assets/logo/Logo-SVG-Black.svg'
    }
  }

  return (
    <div className={cn('relative', className)}>
      <Image
        src={getLogoSrc()}
        alt="Crafted Bathrooms Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}

