'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Skeleton from '@/components/ui/Skeleton'

interface ShopCardProps {
  title: string
  description?: string
  image: string
  href?: string
  showText?: boolean
}

export default function ShopCard({ title, description, image, href = '#', showText = true }: ShopCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = (
    <div className="group">
      <div className="overflow-hidden">
        <div className="relative w-full h-[333px] md:h-[416px] bg-neutral-200 overflow-hidden">
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
              transform: 'translateZ(0)'
            }}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[6px] group-hover:h-[20px] bg-accent-500 transition-all duration-300 z-10 pointer-events-none" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-accent-500/90 flex flex-col justify-end p-5 transition-all duration-300 translate-y-full group-hover:translate-y-0"
            style={{ height: '30%' }}
          >
            <h3 className="font-jost text-lg text-white tracking-wide mb-2">{title}</h3>
            {description && (
              <p className="font-jost text-sm text-white/80 leading-relaxed">{description}</p>
            )}
          </div>
        </div>
        {showText && (
          <div className="p-spacing-md pt-[18px]">
            <p className="font-h2 text-primary-900">
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
