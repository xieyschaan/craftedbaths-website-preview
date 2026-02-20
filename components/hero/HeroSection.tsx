'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface HeroSlide {
  type: 'image' | 'color'
  src?: string
  bgColor?: string
  text: string | string[]
}

const heroSlides: HeroSlide[] = [
  { type: 'image', src: '/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp', text: 'Sales' },
  { type: 'image', src: '/assets/hero-assets/lotus-design-n-print-Dk_o7KQyGkI-unsplash.webp', text: 'Tiles' },
  { type: 'image', src: '/assets/hero-assets/smart-renovations-qiclFfG4KFM-unsplash.webp', text: 'Bath Craft' },
  { type: 'image', src: '/assets/hero-assets/toa-heftiba-PUMw1z67VmQ-unsplash.webp', text: ['Designed', 'Supplied', 'Installed'] },
  { type: 'image', src: '/assets/hero-assets/zac-gudakov-T5CraEJfXIU-unsplash.webp', text: 'Showroom' },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    heroSlides.map((slide) => slide.type === 'color')
  )

  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsPaused(document.documentElement.hasAttribute('data-menu-open'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-menu-open'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

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
      data-hero-section
      className="relative bg-primary-900 flex items-center page-mx mt-2 md:mt-3 flex-1"
      style={{ 
        minHeight: '300px'
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <div className="relative w-full h-full">
            {!imagesLoaded[0] && heroSlides[0].type === 'image' && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse z-0" />
            )}
            {heroSlides.map((slide, index) => {
              const isReady = slide.type === 'color' || imagesLoaded[index]
              const isVisible = index === currentIndex && isReady
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  style={{ 
                    willChange: index === currentIndex ? 'opacity' : 'auto',
                    transform: 'translateZ(0)',
                    ...(slide.type === 'color' ? { backgroundColor: slide.bgColor } : {}),
                  }}
                >
                  {slide.type === 'image' && slide.src && (
                    <Image
                      src={slide.src}
                      alt={`Hero slide ${index + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index < 2}
                      onLoad={() => handleImageLoad(index)}
                    />
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <div className="relative z-10 container max-w-content w-full h-full flex items-center justify-center pointer-events-none">
        <div className="px-8 md:px-16 lg:px-24 xl:px-32 w-full">
          <div className="max-w-content mx-auto text-center relative">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`font-rexton text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 leading-[1.15] tracking-[-0.02em] font-bold whitespace-normal
                  text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-display
                  ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                {Array.isArray(slide.text)
                  ? slide.text.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))
                  : slide.text
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all cursor-pointer ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
