import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { createClient } from '@/lib/supabase/server'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, slug, short_description, featured_image, category, location')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <h1 className="font-display text-black mb-spacing-md">
              Our Projects
            </h1>
            <p className="font-body-lg text-gray-700 max-w-text">
              Luxury bathroom projects showcasing exceptional design.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="bg-gray-50 py-section-md">
          <div className="container max-w-content px-container-base">
            <ProjectGrid projects={projects || []} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
