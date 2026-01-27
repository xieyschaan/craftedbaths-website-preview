'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, position: 0 })
  const positionRef = useRef(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationId: number
    const speed = 0.3 // pixels per frame

    const animate = () => {
      // Only animate if not hovering and not dragging
      if (!isHovered && !isDragging) {
        positionRef.current -= speed
        
        // Reset position when we've scrolled through one set of brands
        const totalWidth = slider.scrollWidth / 2
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = 0
        }
        
        slider.style.transform = `translateX(${positionRef.current}px)`
      }
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isHovered, isDragging])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return

      const deltaX = e.clientX - dragStartRef.current.x
      positionRef.current = dragStartRef.current.position + deltaX
      
      // Keep position within bounds
      const totalWidth = sliderRef.current.scrollWidth / 2
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = positionRef.current % totalWidth
      }
      
      sliderRef.current.style.transform = `translateX(${positionRef.current}px)`
    }

    const handleMouseUp = () => {
      setIsDragging(false)
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
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      position: positionRef.current,
    }
  }

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands]

  return (
    <div 
      className="relative w-full overflow-hidden py-8 cursor-grab active:cursor-grabbing"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsDragging(false)
      }}
      onMouseDown={handleMouseDown}
      style={{ willChange: 'transform' }}
    >
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      {/* Slider container */}
      <div className="flex" ref={sliderRef}>
        {duplicatedBrands.map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className="flex-shrink-0 px-8 md:px-12 lg:px-16 select-none"
          >
            <span className="font-body text-black text-lg md:text-xl lg:text-2xl whitespace-nowrap">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
