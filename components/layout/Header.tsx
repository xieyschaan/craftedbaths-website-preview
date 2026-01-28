'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isMenuOpen && !isClosing) {
      // Lock body scroll when menu is open
      document.body.style.overflow = 'hidden'
      
      // On desktop, add class to html to shift main content
      if (window.innerWidth >= 768) {
        document.documentElement.classList.add('menu-open-desktop')
      }
    } else if (!isMenuOpen && !isClosing) {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset'
      document.documentElement.classList.remove('menu-open-desktop')
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.classList.remove('menu-open-desktop')
    }
  }, [isMenuOpen, isClosing])

  // Handle click outside menu panel (desktop only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && !isClosing && window.innerWidth >= 768) {
        const target = e.target as HTMLElement
        const menuPanel = document.querySelector('[data-menu-panel]')
        const menuButton = document.querySelector('[data-menu-button]')
        
        // Close if clicking outside menu panel and not on menu button
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

    if (isMenuOpen && !isClosing) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen, isClosing])

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Start closing animation
      setIsClosing(true)
      setTimeout(() => {
        setIsMenuOpen(false)
        setIsClosing(false)
      }, 300) // Match animation duration
    } else {
      setIsMenuOpen(true)
      setIsClosing(false)
    }
  }

  const closeMenu = () => {
    if (isMenuOpen) {
      // Start closing animation
      setIsClosing(true)
      setTimeout(() => {
        setIsMenuOpen(false)
        setIsClosing(false)
      }, 300) // Match animation duration
    }
  }

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
      <header className="bg-white relative z-50">
        <div className="relative flex items-center justify-between h-20 md:h-28 lg:h-header ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 mr-3.5 md:mr-7 lg:mr-9 xl:mr-12">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Logo 
              variant="black" 
              width={180} 
              height={54} 
              className="w-36 md:w-40 lg:w-[180px] h-auto"
            />
          </Link>

          {/* Right side: Desktop - Main Menu + Shop Online, Mobile - menu icon only */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Main Menu Button - Desktop shows icon + text, Mobile shows icon only */}
            <button
              data-menu-button
              onClick={toggleMenu}
              className="flex items-center gap-3 md:gap-[18px] p-2 -mr-2 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Menu Icon */}
              {isMenuOpen ? (
                <X className="h-8 w-8 md:w-[60px] text-black stroke-[1px]" />
              ) : (
                <div className="flex flex-col gap-1.5 w-6 md:w-[30px]">
                  <div className="h-[1px] w-full bg-black" />
                  <div className="h-[1px] w-full bg-black" />
                  <div className="h-[1px] w-full bg-black" />
                </div>
              )}
              
              {/* Main Menu Text - Desktop Only, Hidden when menu is open */}
              {!isMenuOpen && (
                <span className="hidden md:block font-gilroy text-black text-sm lg:text-base">
                  Main Menu
                </span>
              )}
            </button>

            {/* Online Shop Link - Desktop Only, Hidden when menu is open */}
            {!isMenuOpen && (
              <Link
                href="#"
                className="hidden md:block font-gilroy text-black hover:text-gray-800 transition-colors text-sm lg:text-base"
              >
                Online Shop
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Menu Overlay - Full screen on mobile, left panel on desktop */}
      {isMenuOpen && (
        <>
          {/* Mobile: Full screen overlay */}
          <div 
            className="fixed inset-0 bg-white z-40 pt-20 md:pt-28 lg:pt-[120px] overflow-y-auto md:hidden"
            onClick={closeMenu}
          >
            <div className="ml-3.5 md:ml-7 lg:ml-9 xl:ml-12 pt-4 md:pt-6">
              <nav>
                {/* Online Shop Link - Standout at top */}
                <Link
                  href="#"
                  onClick={closeMenu}
                  className="block text-black hover:text-gray-800 transition-colors mb-12 md:mb-16"
                  style={{ textDecoration: 'underline', textDecorationThickness: '0.5px', textUnderlineOffset: '2px' }}
                >
                  <h2 className="text-[20px] font-light">Online Shop</h2>
                </Link>
                
                {/* Menu Items */}
                <div className="space-y-8">
                  {pageLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block text-black hover:text-gray-800 transition-colors"
                    >
                      <h2 className="text-[20px] font-light">{link.name}</h2>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Desktop: Left side panel - Render via portal to avoid transform */}
          {typeof window !== 'undefined' && (isMenuOpen || isClosing) && createPortal(
            <>
              <div 
                data-menu-panel
                className={`hidden md:block fixed top-0 left-0 h-full w-[340px] lg:w-[380px] bg-white z-50 shadow-2xl overflow-y-auto ${isClosing ? 'closing' : 'opening'}`}
                style={{ 
                  margin: 0, 
                  padding: 0
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Collapse Button - Top Right of Panel */}
                <button
                  onClick={closeMenu}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-black stroke-[1px]" />
                </button>

                <div className="pl-9 lg:pl-10 pr-4 lg:pr-5 pt-20 lg:pt-24">
                  <nav>
                    {/* Online Shop Link - Standout at top */}
                    <Link
                      href="#"
                      onClick={closeMenu}
                      className="block text-black hover:text-gray-800 transition-colors mb-12 md:mb-16"
                      style={{ textDecoration: 'underline', textDecorationThickness: '0.5px', textUnderlineOffset: '2px' }}
                    >
                      <h2 className="text-[20px] font-light">Online Shop</h2>
                    </Link>
                    
                    {/* Menu Items */}
                    <div className="space-y-8">
                      {pageLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={closeMenu}
                          className="block text-black hover:text-gray-800 transition-colors"
                        >
                          <h2 className="text-[20px] font-light">{link.name}</h2>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>

              {/* Desktop: Overlay backdrop that prevents interaction with shifted content */}
              <div 
                className={`hidden md:block fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 cursor-pointer ${isClosing ? 'opacity-0' : 'opacity-100'}`}
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

