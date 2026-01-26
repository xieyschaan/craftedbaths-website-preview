'use client'

import { useState, useEffect } from 'react'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      // Lock body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuCategories = [
    { name: 'Taps', href: '#' },
    { name: 'Showers', href: '#' },
    { name: 'Baths', href: '#' },
    { name: 'Basins', href: '#' },
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

          {/* Right Side - Menu and Online Shop */}
          <div className="flex items-center gap-6">
            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 p-2 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-8 w-[60px] text-black stroke-[1px]" />
              ) : (
                <div className="flex flex-col gap-1.5 w-[30px]">
                  <div className="h-[1px] w-full bg-black"></div>
                  <div className="h-[1px] w-full bg-black"></div>
                  <div className="h-[1px] w-full bg-black"></div>
                </div>
              )}
              {!isMenuOpen && (
                <span className="font-body text-black ml-[10px]">Main Menu</span>
              )}
            </button>

            {/* Online Shop Link */}
            <Link
              href="#"
              className="font-body text-black hover:text-gray-800 hover:underline transition-colors"
              onClick={closeMenu}
            >
              Online Shop
            </Link>
          </div>
        </div>
      </header>

      {/* Full Page Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-white z-40 pt-20 md:pt-28 lg:pt-[120px] overflow-y-auto"
          onClick={closeMenu}
        >
          <div className="container max-w-content px-container-base py-section-md">
            <nav className="space-y-8">
              {menuCategories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={closeMenu}
                  className="block text-black hover:text-gray-800 transition-colors"
                >
                  <h2 className="text-[44px] font-light">{category.name}</h2>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

