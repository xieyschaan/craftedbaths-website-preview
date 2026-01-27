import Logo from '@/components/ui/Logo'
import Link from 'next/link'

export default function Footer() {
  return (
      <footer className="bg-white pt-[30px] pb-[15px]">
      <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12 py-spacing-xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-gap-lg w-full">
          {/* Column 1 - Logo */}
          <div>
            <Link href="/">
              <Logo variant="black" width={180} height={54} />
            </Link>
            <div className="mt-spacing-md pt-[20px] font-body font-light text-gray-600">
              <p className="mb-spacing-sm">
                80 St Johns Rd, Huddersfield HD1 5EY
              </p>
              <p className="mb-spacing-sm">
                <a href="mailto:info@craftedbaths.com" className="hover:text-black hover:underline transition-colors">
                  info@craftedbaths.com
                </a>
              </p>
              <p>
                <a href="tel:01484509357" className="hover:text-black hover:underline transition-colors">
                  01484 509357
                </a>
              </p>
            </div>
          </div>

          {/* Column 2 - Empty */}
          <div></div>

          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="font-h6 mb-spacing-md text-black">Quick Links</h3>
            <ul className="space-y-spacing-sm font-body font-light text-gray-600">
              <li>
                <Link href="/about" className="hover:text-black hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-black hover:underline transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/design-services" className="hover:text-black hover:underline transition-colors">
                  Design Services
                </Link>
              </li>
              <li>
                <Link href="/showrooms" className="hover:text-black hover:underline transition-colors">
                  Showrooms
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black hover:underline transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-black hover:underline transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="hover:text-black hover:underline transition-colors">
                  Inspiration
                </Link>
              </li>
              <li>
                <Link href="/brochures" className="hover:text-black hover:underline transition-colors">
                  Brochures
                </Link>
              </li>
              <li>
                <Link href="/match-a-quote" className="hover:text-black hover:underline transition-colors">
                  Match a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-h6 mb-spacing-md text-black">Contact</h3>
            <ul className="space-y-spacing-sm font-body font-light text-gray-600">
              <li>
                <Link href="/contact" className="hover:text-black hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Social Media */}
          <div>
            <h3 className="font-h6 mb-spacing-md text-black">Follow Us</h3>
            <ul className="space-y-spacing-sm font-body font-light text-gray-600">
              <li>
                <Link href="#" className="hover:text-black hover:underline transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black hover:underline transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black hover:underline transition-colors">
                  TikTok
                </Link>
              </li>
            </ul>
          </div>
        </div>

            {/* Copyright */}
            <div className="mt-[84px] py-spacing-xl text-center flex items-center justify-center">
              <p className="text-gray-500 text-xs font-light uppercase">
                © {new Date().getFullYear()} Crafted Bathrooms. All rights reserved.
              </p>
            </div>
      </div>
    </footer>
  )
}

