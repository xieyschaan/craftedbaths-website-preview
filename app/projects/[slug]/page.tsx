import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

type ProjectRow = {
  title: string
  featured_image: string | null
  category: string | null
  location: string | null
  completed_date: string | null
  description: string | null
  images: string[] | null
  tags: string[] | null
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  const project = data as ProjectRow | null
  if (error || !project) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Image */}
        {project.featured_image && (
          <section className="relative w-full h-[60vh] bg-gray-100">
            <Image
              src={project.featured_image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </section>
        )}

        {/* Content */}
        <section className="bg-white py-section-md">
          <div className="container max-w-content-narrow px-container-base">
            <div className="max-w-text">
              {/* Header */}
              <div className="mb-spacing-lg">
                {project.category && (
                  <span className="inline-block font-body-sm text-gray-500 mb-spacing-sm">
                    {project.category}
                  </span>
                )}
                <h1 className="font-display text-black mb-spacing-md">
                  {project.title}
                </h1>
                {project.location && (
                  <p className="font-body text-gray-600">
                    Location: {project.location}
                  </p>
                )}
                {project.completed_date && (
                  <p className="font-body text-gray-600">
                    Completed: {new Date(project.completed_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div className="prose prose-lg max-w-none mb-spacing-lg">
                  <div 
                    className="font-body text-gray-700 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                </div>
              )}

              {/* Images Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-lg mt-spacing-xl">
                  {project.images.map((image: string, index: number) => (
                    <div key={index} className="relative w-full h-96 bg-gray-100">
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mt-spacing-xl pt-spacing-lg border-t border-gray-200">
                  <h3 className="font-h5 text-black mb-spacing-md">Tags</h3>
                  <div className="flex flex-wrap gap-spacing-sm">
                    {project.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-spacing-md py-spacing-sm bg-gray-100 text-gray-700 font-body-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
