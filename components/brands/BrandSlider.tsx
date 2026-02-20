'use client'

import { useState, useEffect, useRef } from 'react'

const brands = [
  'VADO',
  'FLOVA',
  'SCUDO',
  'TAVISTOCK',
  'ACQUABELLA',
  'CALYPSO',
  'ROCA',
  'VELDEAU',
  'BURLINGTON',
  'KARTELL',
  'GEBERIT',
  'BC DESIGNS',
  'CROSSWATER',
  'DEKTON',
  'SILESTONE',
  'CARRON',
  'LAKES',
  'JTP',
  'NUIE',
  'KERAKOLL',
  'RAK',
  'BIHUI',
  'RUBI',
  'SIGMA',
]

export default function BrandSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, position: 0 })
  const positionRef = useRef(0)
  const pausedRef = useRef(false)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const speed = 0.3

    const animate = () => {
      if (!pausedRef.current && slider) {
        positionRef.current -= speed
        const totalWidth = slider.scrollWidth / 2
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = 0
        }
        slider.style.transform = `translateX(${positionRef.current}px)`
      }
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return

      const deltaX = e.clientX - dragStartRef.current.x
      positionRef.current = dragStartRef.current.position + deltaX

      const totalWidth = sliderRef.current.scrollWidth / 2
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = positionRef.current % totalWidth
      }

      sliderRef.current.style.transform = `translateX(${positionRef.current}px)`
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      pausedRef.current = false
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    
    e.preventDefault()
    pausedRef.current = true
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      position: positionRef.current,
    }
  }

  const duplicatedBrands = [...brands, ...brands]

  return (
    <div 
      className="relative w-full overflow-hidden py-8 cursor-grab active:cursor-grabbing"
      ref={containerRef}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => {
        pausedRef.current = false
        setIsDragging(false)
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="flex" ref={sliderRef}>
        {duplicatedBrands.map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className="flex-shrink-0 px-8 md:px-12 lg:px-16 select-none"
          >
            <span className="font-body text-primary-900 text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
