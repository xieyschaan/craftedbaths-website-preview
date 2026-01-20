import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <h1 className="font-display text-black mb-spacing-md">
              About Crafted Bathrooms
            </h1>
            <div className="max-w-text">
              <p className="font-body-lg text-gray-700 mb-spacing-md">
                Creating exceptional bathroom experiences through luxury fittings and timeless design.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-gray-50 py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <div className="max-w-text space-y-spacing-lg">
              <div>
                <h2 className="font-h2 text-black mb-spacing-md">
                  Our Story
                </h2>
                <p className="font-body text-gray-700 mb-spacing-md">
                  Crafted Bathrooms was founded with a vision to transform ordinary 
                  bathrooms into extraordinary spaces. With years of experience in 
                  the luxury bathroom industry, we have established ourselves as a 
                  trusted partner for homeowners, designers, and trade professionals.
                </p>
                <p className="font-body text-gray-700">
                  Our commitment to quality, attention to detail, and exceptional 
                  customer service sets us apart in the industry.
                </p>
              </div>

              <div>
                <h2 className="font-h2 text-black mb-spacing-md">
                  Our Mission
                </h2>
                <p className="font-body text-gray-700">
                  To provide the finest selection of bathroom fittings and fixtures, 
                  backed by expert guidance and unparalleled service, helping our 
                  clients create bathrooms that reflect their unique style and enhance 
                  their daily lives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
