import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <h1 className="font-display text-black mb-spacing-md">
              Our Services
            </h1>
            <p className="font-body-lg text-gray-700 max-w-text">
              Bathroom solutions tailored to your needs.
            </p>
          </div>
        </section>

        {/* Services Content */}
        <section className="bg-gray-50 py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-lg">
              {/* Service 1 */}
              <div className="bg-white border-2 border-gray-200 p-spacing-lg">
                <h2 className="font-h3 text-black mb-spacing-md">
                  Product Consultation
                </h2>
                <p className="font-body text-gray-700">
                  Expert guidance to select perfect bathroom fittings for your project.
                </p>
              </div>

              {/* Service 2 */}
              <div className="bg-white border-2 border-gray-200 p-spacing-lg">
                <h2 className="font-h3 text-black mb-spacing-md">
                  Design Support
                </h2>
                <p className="font-body text-gray-700">
                  Professional design assistance for cohesive bathroom layouts.
                </p>
              </div>

              {/* Service 3 */}
              <div className="bg-white border-2 border-gray-200 p-spacing-lg">
                <h2 className="font-h3 text-black mb-spacing-md">
                  Trade Services
                </h2>
                <p className="font-body text-gray-700">
                  Specialized services and pricing for trade professionals.
                </p>
              </div>

              {/* Service 4 */}
              <div className="bg-white border-2 border-gray-200 p-spacing-lg">
                <h2 className="font-h3 text-black mb-spacing-md">
                  Showroom Visits
                </h2>
                <p className="font-body text-gray-700">
                  Visit our showrooms to see products in person.
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
