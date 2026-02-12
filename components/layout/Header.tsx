'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function Header() {
  // showPanel: controls whether the panel DOM is rendered
  // panelVisible: controls the slide-in/out transition (toggled one frame after mount)
  const [showPanel, setShowPanel] = useState(false)
  const [panelVisible, setPanelVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const isMenuOpen = showPanel

  // Lock/unlock body scroll
  useEffect(() => {
    if (showPanel) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showPanel])

  // When showPanel becomes true, wait one frame then trigger the slide-in
  useEffect(() => {
    if (showPanel) {
      // Force a layout read, then set visible on the next frame
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
    // Start slide-out transition
    setPanelVisible(false)
    // After transition ends, unmount the panel
    setTimeout(() => {
      setShowPanel(false)
    }, 350) // Slightly longer than transition duration to ensure it completes
  }, [])

  const toggleMenu = useCallback(() => {
    if (showPanel) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [showPanel, closeMenu, openMenu])

  // Handle click outside menu panel (desktop only)
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

  const shopLinks = [
    { name: 'Shop Bathroom', href: '/shop-bathroom' },
    { name: 'Shop Tiles', href: '/shop-tiles' },
    { name: 'Shop Bespoke', href: '/shop-bespoke' },
  ]

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
      <header className="bg-primary-900 relative z-50">
        {/* Top strip */}
        <div className="flex items-center justify-end gap-4 md:gap-6 pt-[20px] pb-2 ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 mr-3.5 md:mr-7 lg:mr-9 xl:mr-12 ">
          <a
            href="tel:01484509357"
            className="font-gilroy text-[11px] md:text-[14px] text-white/70 hover:text-white transition-colors"
          >
            01484 509357
          </a>
          <Link
            href="/brochures"
            className="font-gilroy text-[11px] md:text-[14px] text-white/70 hover:text-white transition-colors"
          >
            Request a Brochure
          </Link>
        </div>

        {/* Main header */}
        <div className="relative flex items-center justify-between pt-2 pb-4 md:pt-3 md:pb-6 lg:pt-4 lg:pb-8 ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 mr-3.5 md:mr-7 lg:mr-9 xl:mr-12">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Logo 
              variant="white" 
              width={180} 
              height={54} 
              className="w-36 md:w-40 lg:w-[180px] h-auto"
            />
          </Link>

          {/* Right side: Nav links + Menu icon */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Shop Navigation Links - Desktop Only, Hidden when menu is open */}
            <nav className={`hidden md:flex items-center gap-6 lg:gap-8 ${isMenuOpen ? 'md:hidden' : ''}`}>
              <Link
                href="/shop-bathroom"
                className="font-gilroy text-white hover:text-white/70 transition-colors text-sm lg:text-base"
              >
                Shop Bathroom
              </Link>
              <Link
                href="/shop-tiles"
                className="font-gilroy text-white hover:text-white/70 transition-colors text-sm lg:text-base"
              >
                Shop Tiles
              </Link>
              <Link
                href="/shop-bespoke"
                className="font-gilroy text-white hover:text-white/70 transition-colors text-sm lg:text-base"
              >
                Shop Bespoke
              </Link>
            </nav>

            {/* Menu Icon - Rightmost */}
            <button
              data-menu-button
              onClick={toggleMenu}
              className="flex items-center p-2 -mr-2 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-8 w-8 md:w-[60px] text-white stroke-[1px]" />
              ) : (
                <div className="flex flex-col gap-1 w-5 md:w-6">
                  <div className="h-[1px] w-full bg-white" />
                  <div className="h-[1px] w-full bg-white" />
                  <div className="h-[1px] w-full bg-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay - Full screen on mobile, left panel on desktop */}
      {isMenuOpen && (
        <>
          {/* Mobile: Full screen overlay */}
          <div 
            className="fixed inset-0 bg-primary-900 z-40 pt-20 md:pt-28 lg:pt-[120px] overflow-y-auto md:hidden"
            onClick={closeMenu}
          >
            <div className="ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 pt-4 md:pt-6">
              <nav>
                {/* Shop Links - Standout at top */}
                <div className="mb-10 space-y-3">
                  {shopLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-white hover:text-white/70 transition-colors"
                      style={{ textDecoration: 'underline', textDecorationThickness: '0.5px', textUnderlineOffset: '2px' }}
                    >
                      <h2 className="text-[20px] font-light">{link.name}</h2>
                    </Link>
                  ))}
                </div>
                
                {/* Menu Items */}
                <div className="space-y-5">
                  {pageLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-white hover:text-white/70 transition-colors"
                    >
                      <h2 className="text-[20px] font-light">{link.name}</h2>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Desktop: Right side panel - Render via portal */}
          {typeof window !== 'undefined' && showPanel && createPortal(
            <>
              <div 
                ref={panelRef}
                data-menu-panel
                className="hidden md:block fixed top-0 right-0 h-full w-[340px] lg:w-[380px] bg-primary-900 z-50 shadow-2xl overflow-y-auto"
                style={{
                  transform: panelVisible ? 'translateX(0)' : 'translateX(100%)',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Collapse Button - Top Left of Panel */}
                <button
                  onClick={closeMenu}
                  className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white stroke-[1px]" />
                </button>

                <div className="pl-9 lg:pl-10 pr-9 lg:pr-10 pt-20 lg:pt-24">
                  <nav>
                    {/* Menu Items */}
                    <div className="space-y-5">
                      {pageLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeMenu}
                          className="block text-white hover:text-white/70 transition-colors"
                        >
                          <h2 className="text-[20px] font-light">{link.name}</h2>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>

              {/* Desktop: Overlay backdrop */}
              <div 
                className="hidden md:block fixed inset-0 z-40 cursor-pointer"
                onClick={closeMenu}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  opacity: panelVisible ? 1 : 0,
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'auto',
                }}
              />
            </>,
            document.body
          )}
        </>
      )}
    </>
  )
}

