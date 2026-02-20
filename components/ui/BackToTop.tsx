'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 300)
        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-50 bg-accent-500 text-primary-900 p-3 md:p-4 rounded-full shadow-lg hover:bg-accent-500/80 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-900"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5 md:h-6 md:w-6" />
    </button>
  )
}
