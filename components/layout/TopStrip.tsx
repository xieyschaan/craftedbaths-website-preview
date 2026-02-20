import Link from 'next/link'

export default function TopStrip() {
  return (
    <div data-top-strip className="bg-background">
      <div className="flex items-center justify-end gap-4 md:gap-6 py-2 page-mx">
        <a
          href="tel:01484509357"
          className="font-jost text-[11px] md:text-[13px] transition-colors duration-300 uppercase text-primary-900/70 hover:text-primary-900"
        >
          01484 509357
        </a>
        <Link
          href="/brochures"
          className="font-jost text-[11px] md:text-[13px] transition-colors duration-300 uppercase text-primary-900/70 hover:text-primary-900"
        >
          Request a Brochure
        </Link>
        <Link
          href="/login"
          className="font-jost text-[11px] md:text-[13px] transition-colors duration-300 uppercase text-primary-900/70 hover:text-primary-900"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
