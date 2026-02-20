'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { X, Search, BookOpen, Phone, Palette } from 'lucide-react'
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

  const [menuOpenedScrolled, setMenuOpenedScrolled] = useState(false)

  const openMenu = useCallback(() => {
    setMenuOpenedScrolled(headerStateRef.current.scrolled)
    setShowPanel(true)
  }, [])

  const closeMenu = useCallback(() => {
    setPanelVisible(false)
    setTimeout(() => {
      setShowPanel(false)
    }, 350)
  }, [])

  const toggleMenu = useCallback(() => {
    if (showPanel) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [showPanel, closeMenu, openMenu])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showPanel && panelVisible && window.innerWidth >= 768) {
        const target = e.target as HTMLElement
        const menuPanel = panelRef.current
        const menuButton = document.querySelector('[data-menu-button]')
        
        if (
          menuPanel &&
          !menuPanel.contains(target) &&
          menuButton &&
          !menuButton.contains(target)
        ) {
          closeMenu()
        }
      }
    }

    if (showPanel && panelVisible) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showPanel, panelVisible, closeMenu])

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
        className={`sticky top-0 z-50 ${
          headerState.scrolled ? 'bg-secondary' : 'bg-secondary'
        }`}
        style={{
          transform: headerState.visible || isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease',
          willChange: 'transform',
        }}
      >
        <div
          className="bg-background overflow-hidden transition-all duration-300"
          style={{
            maxHeight: headerState.scrolled ? 0 : 40,
            opacity: headerState.scrolled ? 0 : 1,
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
          <Link href="/" className={`flex items-center ${isMenuOpen ? 'invisible' : ''}`} onClick={closeMenu}>
            <Logo 
              variant="beige"
              width={180} 
              height={54} 
              className="w-36 md:w-40 lg:w-[180px] h-auto transition-opacity duration-300"
            />
          </Link>

          <div className="flex items-center gap-4 lg:gap-6">
            <nav className={`hidden md:flex items-center ${isMenuOpen ? 'md:hidden' : ''}`}>
              <Link
                href="/shop"
                className="font-jost font-light transition-colors duration-300 text-xs lg:text-sm uppercase text-background hover:text-background/70 tracking-widest"
              >
                Online Shop
              </Link>
            </nav>

            <button
              className="hidden md:flex items-center gap-1.5 p-1 transition-colors duration-300 text-background hover:text-background/70"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5px]" />
              <span className="font-jost font-light text-[10px] lg:text-xs uppercase tracking-widest underline underline-offset-2 relative -top-[1px]">Search</span>
            </button>

            <button
              data-menu-button
              onClick={toggleMenu}
              className="flex items-center p-2 -mr-2 transition-colors duration-300"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-8 w-8 md:w-[60px] stroke-[1px] transition-colors duration-300 text-background" />
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
          <div 
            className="fixed inset-0 z-40 pt-20 md:pt-28 lg:pt-[120px] overflow-y-auto md:hidden bg-background"
            onClick={closeMenu}
          >
            <div className="ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 pt-4 md:pt-6">
              <Link href="/" onClick={closeMenu} className="inline-block mb-10">
                <Logo 
                  variant="brown" 
                  width={180} 
                  height={54} 
                  className="w-36 md:w-40 h-auto"
                />
              </Link>
              <nav>
                <div className="mb-10">
                  <Link
                    href="/shop"
                    onClick={closeMenu}
                    className="block text-secondary hover:text-secondary/70 transition-colors"
                    style={{ textDecoration: 'underline', textDecorationThickness: '0.5px', textUnderlineOffset: '2px' }}
                  >
                    <h2 className="text-[20px] font-light">Online Shop</h2>
                  </Link>
                </div>
                
                <div className="space-y-5">
                  {pageLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-secondary hover:text-secondary/70 transition-colors"
                    >
                      <h2 className="text-[20px] font-light">{link.name}</h2>
                    </Link>
                  ))}
                </div>
              </nav>

              <Link
                href="/login"
                onClick={closeMenu}
                className="inline-flex items-center gap-1.5 text-secondary hover:text-secondary/70 transition-colors mt-12"
              >
                <span className="text-[16px] font-light">Login</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>

              <SocialIcons className="mt-6 pb-8" />
            </div>
          </div>

          {typeof window !== 'undefined' && showPanel && createPortal(
            <>
              <div 
                ref={panelRef}
                data-menu-panel
                className="hidden md:block fixed top-0 right-0 h-full w-[340px] lg:w-[380px] z-50 shadow-2xl overflow-y-auto bg-background"
                style={{
                  transform: panelVisible ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeMenu}
                  className="absolute top-4 right-4 p-2 hover:bg-secondary/10 rounded-full transition-colors z-10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-secondary stroke-[1px]" />
                </button>

                <div className="flex flex-col h-full pl-9 lg:pl-10 pr-9 lg:pr-10 pt-[52px] lg:pt-[60px]">
                  <Link href="/" onClick={closeMenu} className="inline-block mb-10 lg:mb-12">
                    <Logo 
                      variant="brown" 
                      width={160} 
                      height={48} 
                      className="w-32 lg:w-[160px] h-auto"
                    />
                  </Link>
                  <nav>
                    <div className="space-y-5">
                      {pageLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeMenu}
                          className="block text-secondary hover:text-secondary/70 transition-colors"
                        >
                          <h2 className="text-[20px] font-light">{link.name}</h2>
                        </Link>
                      ))}
                    </div>
                  </nav>

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-1.5 text-secondary hover:text-secondary/70 transition-colors mt-auto"
                  >
                    <span className="text-[16px] font-light">Login</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>

                  <SocialIcons className="mt-6 pb-10" />
                </div>
              </div>

              <div 
                className="hidden md:block fixed inset-0 z-40 cursor-pointer"
                onClick={closeMenu}
                style={{ pointerEvents: 'auto' }}
              />
            </>,
            document.body
          )}
        </>
      )}
    </>
  )
}

