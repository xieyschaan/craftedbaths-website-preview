import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FAQItem from '@/components/faq/FAQItem'
import { createClient } from '@/lib/supabase/server'

export default async function FAQPage() {
  const supabase = await createClient()
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching FAQs:', error)
  }

  // Group FAQs by category if they have categories
  const faqsByCategory = faqs?.reduce((acc: Record<string, typeof faqs>, faq) => {
    const category = faq.category || 'General'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {}) || {}

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <h1 className="font-display text-black mb-spacing-md">
              Frequently Asked Questions
            </h1>
            <p className="font-body-lg text-gray-700 max-w-text">
              Answers to common questions about our products and services.
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-gray-50 py-section-md">
          <div className="container max-w-content-tight px-container-base">
            {Object.keys(faqsByCategory).length > 0 ? (
              <div className="space-y-spacing-xl">
                {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
                  <div key={category}>
                    {Object.keys(faqsByCategory).length > 1 && (
                      <h2 className="font-h3 text-black mb-spacing-lg">
                        {category}
                      </h2>
                    )}
                    <div className="space-y-spacing-sm">
                      {categoryFaqs.map((faq) => (
                        <FAQItem
                          key={faq.id}
                          question={faq.question}
                          answer={faq.answer}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-section-md">
                <p className="font-body text-gray-600">
                  No FAQs available at the moment. Please check back later.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
