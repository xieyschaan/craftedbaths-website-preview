'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const cards = [
  { label: 'Taps', image: '/assets/shop-online/tap.webp' },
  { label: 'Basins', image: '/assets/shop-online/basin.webp' },
  { label: 'Showers', image: '/assets/shop-online/shower.webp' },
  { label: 'Tubs', image: '/assets/hero-assets/smart-renovations-qiclFfG4KFM-unsplash.webp' },
  { label: 'Accessories', image: '/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp' },
  { label: 'Mirrors', image: '/assets/hero-assets/lotus-design-n-print-Dk_o7KQyGkI-unsplash.webp' },
  { label: 'Tiles', image: '/assets/hero-assets/toa-heftiba-PUMw1z67VmQ-unsplash.webp' },
  { label: 'And more', image: '/assets/hero-assets/zac-gudakov-T5CraEJfXIU-unsplash.webp' },
]

const CARD_WIDTH = 360
const VISIBLE_PEEK = 52
const REVEAL_SHIFT = CARD_WIDTH - VISIBLE_PEEK

export default function BuildYourDreamBathroom() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const stackWidth = (cards.length - 1) * VISIBLE_PEEK + CARD_WIDTH

  const handlePointerEnter = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  return (
    <section className="page-mx py-section-xs">
      <div className="overflow-hidden flex flex-col lg:flex-row items-stretch">
        <div
          ref={containerRef}
          className="relative shrink-0 h-[420px]"
          style={{ width: stackWidth }}
          onPointerLeave={handlePointerLeave}
        >
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index
            const activeHover = hoveredIndex !== null && hoveredIndex > 0 ? hoveredIndex : null
            const isLeft = activeHover !== null && index < activeHover
            const isRight = activeHover !== null && index > activeHover

            let tx = 0
            if (activeHover !== null) {
              if (index === activeHover) tx = REVEAL_SHIFT
              else if (isRight) tx = REVEAL_SHIFT
            }

            let zIndex = cards.length - index
            if (activeHover !== null) {
              if (isLeft) zIndex = 100 + (cards.length - index)
              else if (index === activeHover) zIndex = 50
            }

            return (
              <div
                key={card.label}
                className="absolute top-0 h-full rounded overflow-hidden cursor-pointer"
                style={{
                  width: CARD_WIDTH,
                  left: index * VISIBLE_PEEK,
                  zIndex,
                  transform: `translate3d(${tx}px, 0, 0)`,
                  transition: 'transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'transform',
                  border: '2px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
                onPointerEnter={() => handlePointerEnter(index)}
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <span
                  className="absolute flex items-center justify-center rounded-full font-jost text-xs text-white/70 pointer-events-none whitespace-nowrap"
                  style={{
                    top: 16,
                    right: (VISIBLE_PEEK - 28) / 2,
                  }}
                >
                  {isHovered || (index === 0 && hoveredIndex === null) ? `Step ${index + 1}` : index + 1}
                </span>
                <span
                  className="absolute bottom-4 left-4 font-jost text-lg text-white tracking-wide pointer-events-none"
                  style={{
                    opacity: isHovered || (index === 0 && hoveredIndex === null) ? 1 : 0,
                    transition: 'opacity 250ms ease',
                  }}
                >
                  {card.label}
                </span>
              </div>
            )
          })}
        </div>

        <div
          className="flex-1 flex flex-col items-start justify-center px-10 lg:pr-16 py-10"
          style={{
            paddingLeft: hoveredIndex !== null && hoveredIndex > 0 ? REVEAL_SHIFT + 65 : 180,
            transition: 'padding-left 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <h2 className="text-[36px] lg:text-[44px] font-light text-primary-900 leading-tight mb-4">
            Build Your Dream Bathroom
          </h2>
          <p className="font-jost text-base lg:text-lg leading-relaxed text-primary-900/60 mb-8 w-[540px]">
            Craft your perfect space with our guided, step-by-step shopping
            experience. From taps and basins to tiles and accessories, we walk
            you through every detail so you can design with confidence. No
            guesswork, no overwhelm — just a seamless journey from inspiration
            to your dream bathroom.
          </p>
          <Link
            href="#"
            className="group inline-flex items-center gap-3 font-jost text-sm uppercase tracking-widest text-primary-900 hover:text-accent-500 transition-colors duration-300"
          >
            Start Now
            <ArrowRight className="h-4 w-4 stroke-[1.5px] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
