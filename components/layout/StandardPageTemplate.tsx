import Header from './Header'
import Footer from './Footer'
import PageBanner from './PageBanner'

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
