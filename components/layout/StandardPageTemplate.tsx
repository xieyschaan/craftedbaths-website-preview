import dynamic from 'next/dynamic'
import PageBanner from '@/components/layout/PageBanner'

// Dynamically import client components to reduce bundle size
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: true,
})
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: true,
})

/**
 * Standard layout for content pages:
 * - Same horizontal margins as homepage: mx-3.5 md:mx-7 lg:mx-9 xl:mx-12
 * - Top panoramic banner 20vh, uses fallback image (no blocking DB query)
 */
export default function StandardPageTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
        <PageBanner imageUrl={null} alt="" />
      </div>
      <main className="flex-grow">
        <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
