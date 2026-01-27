import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageBanner from '@/components/layout/PageBanner'
import { getRandomBannerImage } from '@/lib/banner'

/**
 * Standard layout for content pages:
 * - Same horizontal margins as homepage: mx-3.5 md:mx-7 lg:mx-9 xl:mx-12
 * - Top panoramic banner 20vh, filled with a random project image from DB (or fallback)
 */
export default async function StandardPageTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  const bannerImage = await getRandomBannerImage()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
        <PageBanner imageUrl={bannerImage} alt="" />
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
