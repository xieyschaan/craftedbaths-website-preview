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
      <div className="bg-white overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
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
            className={`object-cover object-center group-hover:scale-105 transition-transform duration-[600ms] ease-in-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        {/* Text */}
        {showText && (
          <div className="p-spacing-md pt-[18px]">
            <p className="font-h2 text-black">
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
