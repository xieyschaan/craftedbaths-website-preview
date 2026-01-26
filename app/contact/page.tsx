import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/forms/ContactForm'
import { createClient } from '@/lib/supabase/server'

interface ContactPageProps {
  searchParams: Promise<{ showroom?: string }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolved = await searchParams
  let showroomId: string | undefined
  let showroomName: string | undefined

  if (resolved.showroom) {
    const supabase = await createClient()
    const { data } = await supabase
      .from('showrooms')
      .select('id, name')
      .eq('id', resolved.showroom)
      .eq('is_active', true)
      .single()

    const showroom = data as { id: string; name: string } | null
    if (showroom) {
      showroomId = showroom.id
      showroomName = showroom.name
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <h1 className="font-display text-black mb-spacing-md">
              Contact Us
            </h1>
            <p className="font-body-lg text-gray-700 max-w-text">
              Get in touch. We'd love to help with your bathroom project.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-gray-50 py-section-md">
          <div className="container max-w-content-tight px-container-base">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gap-xl">
              {/* Contact Form */}
              <div className="bg-white border-2 border-gray-200 p-spacing-lg">
                <h2 className="font-h3 text-black mb-spacing-lg">
                  Send us a Message
                </h2>
                {showroomName && (
                  <p className="font-body-sm text-gray-600 mb-spacing-md">
                    Contacting: <strong>{showroomName}</strong>
                  </p>
                )}
                <ContactForm 
                  formType={showroomId ? "showroom" : "general"} 
                  showroomId={showroomId}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-spacing-lg">
                <div>
                  <h2 className="font-h3 text-black mb-spacing-md">
                    Get in Touch
                  </h2>
                  <div className="space-y-spacing-md font-body text-gray-700">
                    <p>
                      <strong>Email:</strong><br />
                      <a href="mailto:info@craftedbaths.com" className="text-black hover:text-gray-800 transition-colors">
                        info@craftedbaths.com
                      </a>
                    </p>
                    <p>
                      <strong>Phone:</strong><br />
                      <a href="tel:+441234567890" className="text-black hover:text-gray-800 transition-colors">
                        +44 (0) 123 456 7890
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-h5 text-black mb-spacing-md">
                    Visit Our Showrooms
                  </h3>
                  <p className="font-body text-gray-700 mb-spacing-md">
                    Visit our showrooms across the UK.
                  </p>
                  <a 
                    href="/showrooms" 
                    className="inline-block font-body text-black hover:text-gray-800 transition-colors"
                  >
                    View Showrooms →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
