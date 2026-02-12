'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Skeleton from '@/components/ui/Skeleton'

interface ShopCardProps {
  title: string
  image: string
  href?: string
  showText?: boolean
}

export default function ShopCard({ title, image, href = '#', showText = true }: ShopCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = (
    <div className="group">
      <div className="overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-64 md:h-80 bg-primary-800 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover object-center group-hover:scale-105 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              willChange: imageLoaded ? 'transform' : 'opacity',
              transform: 'translateZ(0)' // GPU acceleration
            }}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)} // Show placeholder even on error
          />
        </div>
        {/* Text */}
        {showText && (
          <div className="p-spacing-md pt-[18px]">
            <p className="font-h2 text-white">
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  )

  if (href === '#') {
    return content
  }

  return <Link href={href}>{content}</Link>
}
