'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { X, Search, BookOpen, Phone, Palette, ShoppingBag } from 'lucide-react'
import SocialIcons from '@/components/ui/SocialIcons'

export default function Header() {
  const [showPanel, setShowPanel] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      const h = headerRef.current.offsetHeight
      document.documentElement.style.setProperty('--header-h', `${h}px`)
    }
  }, [])

  const [headerState, setHeaderState] = useState({ visible: true, scrolled: false })
  const headerStateRef = useRef(headerState)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    headerStateRef.current = headerState
  }, [headerState])

  const isMenuOpen = showPanel

  useEffect(() => {
    const SCROLL_DOWN_THRESHOLD = 50
    const SCROLL_UP_THRESHOLD = 10
    const HIDE_AFTER = 100

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const prev = headerStateRef.current

        let nextScrolled: boolean
        if (currentScrollY > SCROLL_DOWN_THRESHOLD) {
          nextScrolled = true
        } else if (currentScrollY <= SCROLL_UP_THRESHOLD) {
          nextScrolled = false
        } else {
          nextScrolled = prev.scrolled
        }

        let nextVisible = prev.visible
        const delta = currentScrollY - lastScrollY.current
        if (delta > 8 && currentScrollY > HIDE_AFTER) {
          nextVisible = false
        } else if (delta < -8) {
          nextVisible = true
        }

        lastScrollY.current = currentScrollY

        if (nextVisible !== prev.visible || nextScrolled !== prev.scrolled) {
          setHeaderState({ visible: nextVisible, scrolled: nextScrolled })
        }

        ticking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (showPanel) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.documentElement.setAttribute('data-menu-open', 'true')
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
      document.documentElement.removeAttribute('data-menu-open')
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
      document.documentElement.removeAttribute('data-menu-open')
    }
  }, [showPanel])

  useEffect(() => {
    if (showPanel) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPanelVisible(true)
        })
      })
    }
  }, [showPanel])

  const openMenu = useCallback(() => {
    setShowPanel(true)
  }, [])

  const closeMenu = useCallback(() => {
    setPanelVisible(false)
    setTimeout(() => {
      setShowPanel(false)
    }, 480)
  }, [])

  const toggleMenu = useCallback(() => {
    if (showPanel) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [showPanel, closeMenu, openMenu])

  const pageLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Design Services', href: '/design-services' },
    { name: 'Showrooms', href: '/showrooms' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Brands', href: '/brands' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Inspiration', href: '/inspiration' },
    { name: 'Brochures', href: '/brochures' },
    { name: 'Match a Quote', href: '/match-a-quote' },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50"
        style={{
          backgroundColor: panelVisible ? '#fcfbfa' : undefined,
          transform: headerState.visible || isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s ease',
          willChange: 'transform',
        }}
      >
        {!panelVisible && <div className="absolute inset-0 bg-secondary" />}
        <div
          className="relative bg-accent-2 overflow-hidden transition-all duration-300"
          style={{
            maxHeight: headerState.scrolled && !panelVisible ? 0 : 40,
            opacity: headerState.scrolled && !panelVisible ? 0 : 1,
          }}
        >
          <div className="flex items-center justify-end gap-5 md:gap-7 py-2 page-mx">
            <a
              href="tel:01484509357"
              className="inline-flex items-center gap-1.5 font-jost text-[11px] md:text-[13px] transition-colors duration-300 uppercase text-primary-900/70 hover:text-primary-900"
            >
              <Phone className="w-3.5 h-3.5 stroke-[1.5px]" />
              01484 509357
            </a>
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 font-jost text-[11px] md:text-[13px] transition-colors duration-300 uppercase text-primary-900/70 hover:text-primary-900"
            >
              <Palette className="w-3.5 h-3.5 stroke-[1.5px]" />
              Moodboard
            </Link>
            <Link
              href="/brochures"
              className="inline-flex items-center gap-1.5 font-jost text-[11px] md:text-[13px] transition-colors duration-300 uppercase text-primary-900/70 hover:text-primary-900"
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[1.5px]" />
              Brochures
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-between pt-5 pb-3 md:pt-6 md:pb-4 lg:pt-7 lg:pb-5 ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 mr-3.5 md:mr-7 lg:mr-9 xl:mr-12">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Logo 
              variant={panelVisible ? 'brown' : 'beige'}
              width={180} 
              height={54} 
              className="w-36 md:w-40 lg:w-[180px] h-auto transition-opacity duration-300"
            />
          </Link>

          <div className="flex items-center gap-4 lg:gap-6">
            <nav className="hidden md:flex items-center">
              <Link
                href="/shop"
                className={`inline-flex items-center gap-1.5 font-jost font-light transition-colors duration-300 text-xs lg:text-sm uppercase tracking-widest ${
                  panelVisible ? 'text-secondary hover:text-secondary/70' : 'text-background hover:text-background/70'
                }`}
              >
                <ShoppingBag className="w-[16px] h-[16px] stroke-[1.5px]" />
                Online Shop
              </Link>
            </nav>

            <button
              className={`hidden md:flex items-center gap-1.5 p-1 transition-colors duration-300 ${
                panelVisible ? 'text-secondary hover:text-secondary/70' : 'text-background hover:text-background/70'
              }`}
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5px]" />
              <span className="font-jost font-light text-xs lg:text-sm uppercase tracking-widest">Search</span>
            </button>

            <button
              data-menu-button
              onClick={toggleMenu}
              className="flex items-center p-2 -mr-2 transition-colors duration-300"
              aria-label={panelVisible ? 'Close menu' : 'Open menu'}
            >
              {panelVisible ? (
                <X className="h-6 w-6 stroke-[1.5px] transition-colors duration-300 text-secondary" />
              ) : (
                <div className="flex flex-col gap-1 w-5 md:w-6">
                  <div className="h-[1px] w-full bg-background" />
                  <div className="h-[1px] w-full bg-background" />
                  <div className="h-[1px] w-full bg-background" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <>
          {/* Mobile: full screen overlay */}
          <div 
            className="fixed inset-0 z-40 pt-20 overflow-y-auto md:hidden bg-background"
            onClick={closeMenu}
            style={{
              clipPath: panelVisible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
              opacity: panelVisible ? 1 : 0,
              transition: 'clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
              willChange: 'clip-path, opacity',
            }}
          >
            <div className="ml-3.5 pt-4">
              <Link href="/" onClick={closeMenu} className="inline-block mb-10">
                <Logo 
                  variant="brown" 
                  width={180} 
                  height={54} 
                  className="w-36 h-auto"
                />
              </Link>
              <nav>
                <div className="mb-10">
                  <Link
                    href="/shop"
                    onClick={closeMenu}
                    className="block text-secondary"
                    style={{ textDecoration: 'underline', textDecorationThickness: '0.5px', textUnderlineOffset: '2px' }}
                  >
                    <h2 className="font-jost text-[24px] font-normal">Online Shop</h2>
                  </Link>
                </div>
                <div className="space-y-5">
                  {pageLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-secondary"
                    >
                      <h2 className="font-jost text-[24px] font-normal menu-link">{link.name}</h2>
                    </Link>
                  ))}
                </div>
              </nav>
              <SocialIcons className="mt-12 pb-8" />
            </div>
          </div>

          {/* Desktop: full-width dropdown panel + blur overlay */}
          {typeof window !== 'undefined' && showPanel && createPortal(
            <>
              <div
                className="hidden md:block fixed inset-0 z-40"
                style={{
                  backgroundColor: 'rgba(252, 251, 250, 0.6)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  opacity: panelVisible ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
                onClick={closeMenu}
              />
              <div
                ref={panelRef}
                data-menu-panel
                className="hidden md:block fixed left-0 right-0 z-50 bg-background overflow-y-auto"
                style={{
                  top: 'var(--header-h, 110px)',
                  height: `calc(100vh - var(--header-h, 110px))`,
                  clipPath: panelVisible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                  opacity: panelVisible ? 1 : 0,
                  transition: 'clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
                  willChange: 'clip-path, opacity',
                  borderTop: '1px solid rgba(38, 30, 26, 0.1)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="page-mx pt-12 pb-16">
                  <nav>
                    <div className="space-y-5">
                      {pageLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeMenu}
                          className="block text-secondary"
                        >
                          <span className="font-jost text-[24px] font-normal menu-link">{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </nav>

                  <SocialIcons className="mt-12" />
                </div>
              </div>
            </>,
            document.body
          )}
        </>
      )}
    </>
  )
}

