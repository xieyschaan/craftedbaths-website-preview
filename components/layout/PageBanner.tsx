import Image from 'next/image'

const FALLBACK_BANNER = '/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp'

interface PageBannerProps {
  /** URL from DB or fallback. Uses hero-assets fallback if null/empty. */
  imageUrl?: string | null
  alt?: string
}

/**
 * Panoramic strip at 20% of hero height (hero = min-h-screen, so 20vh).
 * Full-width; content pages use StandardPageTemplate margins below this.
 */
export default function PageBanner({ imageUrl, alt = 'Page banner' }: PageBannerProps) {
  const src = imageUrl && imageUrl.trim() ? imageUrl : FALLBACK_BANNER
  return (
    <section className="relative w-full h-[20vh] min-h-[120px] bg-gray-100 overflow-hidden" aria-hidden>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </section>
  )
}
