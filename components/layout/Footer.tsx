import Logo from '@/components/ui/Logo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary pt-[30px] pb-[15px] w-full mt-auto flex-shrink-0 ">
      <div className="page-mx py-spacing-xl pt-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-gap-lg w-full">
          <div>
            <Link href="/">
              <Logo variant="white" width={180} height={54} />
            </Link>
            <div className="mt-spacing-md pt-[20px] font-body font-light text-white/60">
              <p className="mb-spacing-sm">
                80 St Johns Rd, Huddersfield HD1 5EY
              </p>
              <p className="mb-spacing-sm">
                <a href="mailto:info@craftedbaths.com" className="hover:text-white hover:underline transition-colors">
                  info@craftedbaths.com
                </a>
              </p>
              <p>
                <a href="tel:01484509357" className="hover:text-white hover:underline transition-colors">
                  01484 509357
                </a>
              </p>
            </div>
          </div>

          <div className="ml-[100px]">
            <h3 className="font-h6 mb-spacing-md text-white">Brands</h3>
            <ul className="space-y-spacing-sm font-body font-light text-white/60">
              <li>
                <Link href="/brands/jtp" className="hover:text-white hover:underline transition-colors">
                  JTP
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white hover:underline transition-colors">
                  Crosswater
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white hover:underline transition-colors">
                  Roca
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white hover:underline transition-colors">
                  Burlington
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white hover:underline transition-colors">
                  Geberit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-h6 mb-spacing-md text-white">Quick Links</h3>
            <ul className="space-y-spacing-sm font-body font-light text-white/60">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white hover:underline transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/design-services" className="hover:text-white hover:underline transition-colors">
                  Design Services
                </Link>
              </li>
              <li>
                <Link href="/showrooms" className="hover:text-white hover:underline transition-colors">
                  Showrooms
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white hover:underline transition-colors">
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-h6 mb-spacing-md text-white">Contact</h3>
            <ul className="space-y-spacing-sm font-body font-light text-white/60">
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-h6 mb-spacing-md text-white">Follow Us</h3>
            <ul className="space-y-spacing-sm font-body font-light text-white/60">
              <li>
                <Link href="#" className="hover:text-white hover:underline transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline transition-colors">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white hover:underline transition-colors">
                  TikTok
                </Link>
              </li>
            </ul>
          </div>
        </div>

            <div className="mt-[84px] py-spacing-xl text-center flex items-center justify-center">
              <p className="text-white/40 text-xs font-light uppercase">
                © {new Date().getFullYear()} Crafted Bathrooms. All rights reserved.
              </p>
            </div>
      </div>
    </footer>
  )
}

