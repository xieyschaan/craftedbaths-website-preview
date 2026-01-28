'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const heroImages = [
  '/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp',
  '/assets/hero-assets/lotus-design-n-print-Dk_o7KQyGkI-unsplash.webp',
  '/assets/hero-assets/smart-renovations-qiclFfG4KFM-unsplash.webp',
  '/assets/hero-assets/toa-heftiba-PUMw1z67VmQ-unsplash.webp',
  '/assets/hero-assets/zac-gudakov-T5CraEJfXIU-unsplash.webp',
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroImages.length).fill(false))
  const [heroHeight, setHeroHeight] = useState<number | null>(null)

  // Calculate hero section height dynamically based on viewport
  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight
      const width = window.innerWidth
      
      // Get header height dynamically
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight : 0
      
      // Calculate bottom margin to match horizontal margins (responsive)
      let bottomMargin = 14 // Mobile: mx-3.5 = 14px
      if (width >= 1280) {
        bottomMargin = 48 // xl: mx-12 = 48px
      } else if (width >= 1024) {
        bottomMargin = 36 // lg: mx-9 = 36px
      } else if (width >= 768) {
        bottomMargin = 28 // md: mx-7 = 28px
      }
      
      // Hero height = viewport height - header height - bottom margin
      const calculatedHeight = viewportHeight - headerHeight - bottomMargin
      setHeroHeight(calculatedHeight)
    }

    // Calculate on mount (with slight delay to ensure header is rendered)
    const timer = setTimeout(calculateHeight, 0)

    // Recalculate on resize
    window.addEventListener('resize', calculateHeight)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateHeight)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section 
      className="relative bg-white flex items-center mx-3.5 md:mx-7 lg:mx-9 xl:mx-12"
      style={{ 
        height: heroHeight ? `${heroHeight}px` : '60vh',
        minHeight: '400px' // Minimum height fallback
      }}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          {/* Images */}
          <div className="relative w-full h-full">
            {/* Loading placeholder - show until first image loads */}
            {!imagesLoaded[0] && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse z-0" />
            )}
            {heroImages.map((image, index) => {
              const isVisible = index === currentIndex && imagesLoaded[index]
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  style={{ 
                    willChange: index === currentIndex ? 'opacity' : 'auto',
                    transform: 'translateZ(0)' // GPU acceleration
                  }}
                >
                  <Image
                    src={image}
                    alt={`Hero image ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index < 2}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              )
            })}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content - Centered within hero section */}
      <div className="relative z-10 container max-w-content w-full h-full flex items-center justify-center">
        <div className="px-8 md:px-16 lg:px-24 xl:px-32 w-full">
          <div className="max-w-content mx-auto text-center relative">
            {heroImages.map((_, index) => {
              const slideTexts = [
                'New Year New Bathroom Sale Now On',
                'January Sale Begins 27th December 2025',
                'Slide 3',
                'Slide 4',
                'Slide 5',
              ]
              return (
                <p
                  key={index}
                  className={`font-rexton text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 leading-[1.15] tracking-[-0.02em] font-bold whitespace-normal
                    text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-display
                    ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                  {slideTexts[index]}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
