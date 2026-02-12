import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'black' | 'white' | 'beige' | 'brown' | 'tagline-black' | 'tagline-white'
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
        return '/assets/logo/Logo SVG-White.svg'
      case 'beige':
        return '/assets/logo/Logo SVG-Beige.svg'
      case 'brown':
        return '/assets/logo/Logo SVG-Brown.svg'
      case 'tagline-black':
        return '/assets/logo/Logo + Tagline-SVG-Black.svg'
      case 'tagline-white':
        return '/assets/logo/Logo + Tagline-SVG-White.svg'
      case 'black':
      default:
        return '/assets/logo/Logo SVG-Black.svg'
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

