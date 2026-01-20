import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ShowroomCard from '@/components/showrooms/ShowroomCard'
import { createClient } from '@/lib/supabase/server'

export default async function ShowroomsPage() {
  const supabase = await createClient()
  const { data: showrooms, error } = await supabase
    .from('showrooms')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching showrooms:', error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <h1 className="font-display text-black mb-spacing-md">
              Our Showrooms
            </h1>
            <p className="font-body-lg text-gray-700 max-w-text">
              Visit our showrooms to see products in person.
            </p>
          </div>
        </section>

        {/* Showrooms Grid */}
        <section className="bg-gray-50 py-section-md">
          <div className="container max-w-content px-container-base">
            {showrooms && showrooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gap-lg">
                {showrooms.map((showroom) => (
                  <ShowroomCard key={showroom.id} showroom={showroom} />
                ))}
              </div>
            ) : (
              <div className="text-center py-section-md">
                <p className="font-body text-gray-600">
                  No showrooms available at the moment. Please check back later.
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
