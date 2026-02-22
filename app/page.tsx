import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/hero/HeroSection'
import ShopCard from '@/components/shop/ShopCard'
import InteractiveBrands from '@/components/brands/InteractiveBrands'
import BuildYourDreamBathroom from '@/components/sections/BuildYourDreamBathroom'
import { Button } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'
import { ExternalLink } from 'lucide-react'

export default async function Home() {
  let featuredProjects: Array<{
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    featured_image: string | null;
    category: string | null;
  }> | null = null

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('projects')
      .select('id, title, slug, short_description, featured_image, category')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(3)
    featuredProjects = data
  } catch (error) {
    console.error('Error fetching featured projects:', error)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-secondary flex flex-col" style={{ height: 'calc(100vh - var(--header-h, 110px))' }}>
        <div className="flex-1 min-h-0 pb-3.5 md:pb-7 lg:pb-9 xl:pb-12 flex flex-col">
          <HeroSection />
        </div>
      </div>
      <div className="bg-secondary h-[50px]" />

      <main className="flex-grow">

        <div className="mt-[110px]">
          <InteractiveBrands />
        </div>

        <div className="mt-[100px]">
          <BuildYourDreamBathroom />
        </div>

        <section className="py-section-md">
          <div className="page-mx">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gap-lg w-full">
              <Link
                href="/design-services"
                className="group relative bg-transparent border border-primary-900/20 p-8 min-h-[160px] flex flex-col hover:border-accent-500 transition-all overflow-hidden"
              >
                <span className="absolute bottom-0 left-0 right-0 h-0 bg-accent-500 transition-all duration-300 group-hover:h-[6px]" />
                <h3 className="font-h4 text-primary-900 mb-4 transition-colors">
                  Expert Consultation
                </h3>
                <p className="font-body text-primary-900/60 flex-grow">
                  Personalized guidance for your bathroom project.
                </p>
                <span className="mt-6 font-body-sm text-primary-900 transition-colors">
                  Learn More →
                </span>
              </Link>

              <Link
                href="/showrooms"
                className="group relative bg-transparent border border-primary-900/20 p-8 min-h-[160px] flex flex-col hover:border-accent-500 transition-all overflow-hidden"
              >
                <span className="absolute bottom-0 left-0 right-0 h-0 bg-accent-500 transition-all duration-300 group-hover:h-[6px]" />
                <h3 className="font-h4 text-primary-900 mb-4 transition-colors">
                  Visit Our Showrooms
                </h3>
                <p className="font-body text-primary-900/60 flex-grow">
                  Experience our products in person across the UK.
                </p>
                <span className="mt-6 font-body-sm text-primary-900 transition-colors">
                  Find a Showroom →
                </span>
              </Link>

              <Link
                href="/projects"
                className="group relative bg-transparent border border-primary-900/20 p-8 min-h-[160px] flex flex-col hover:border-accent-500 transition-all overflow-hidden"
              >
                <span className="absolute bottom-0 left-0 right-0 h-0 bg-accent-500 transition-all duration-300 group-hover:h-[6px]" />
                <h3 className="font-h4 text-primary-900 mb-4 transition-colors">
                  Our Portfolio
                </h3>
                <p className="font-body text-primary-900/60 flex-grow">
                  Completed projects showcasing exceptional design.
                </p>
                <span className="mt-6 font-body-sm text-primary-900 transition-colors">
                  View Projects →
                </span>
              </Link>

              <Link
                href="/match-a-quote"
                className="group relative bg-transparent border border-primary-900/20 p-8 min-h-[160px] flex flex-col hover:border-accent-500 transition-all overflow-hidden"
              >
                <span className="absolute bottom-0 left-0 right-0 h-0 bg-accent-500 transition-all duration-300 group-hover:h-[6px]" />
                <h3 className="font-h4 text-primary-900 mb-4 transition-colors">
                  Match a Quote
                </h3>
                <p className="font-body text-primary-900/60 flex-grow">
                  Found a better price? Share it and we'll match or beat it.
                </p>
                <span className="mt-6 font-body-sm text-primary-900 transition-colors">
                  Get a Match →
                </span>
              </Link>
            </div>
          </div>
        </section>


        <section className="py-section-md">
          <div className="page-mx">
            <h2 className="text-[44px] font-light text-primary-900 mb-[60px] text-center">
              View Our Bathroom Inspirations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gap-lg">
              <ShopCard
                title="Taps"
                description="Premium taps to complement any basin or bath."
                image="/assets/shop-online/tap.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Showers"
                description="Luxurious shower systems for the perfect start to your day."
                image="/assets/shop-online/shower.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Baths"
                description="Freestanding and built-in baths crafted for relaxation."
                image="/assets/shop-online/bath.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Basins"
                description="Elegant basins in a range of styles and finishes."
                image="/assets/shop-online/basin.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Contemporary"
                description="Clean lines and modern aesthetics for today's homes."
                image="/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Classic"
                description="Timeless designs that bring warmth and character."
                image="/assets/hero-assets/smart-renovations-qiclFfG4KFM-unsplash.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Minimalist"
                description="Understated elegance with a focus on simplicity."
                image="/assets/hero-assets/toa-heftiba-PUMw1z67VmQ-unsplash.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Spa-Inspired"
                description="Transform your bathroom into a personal retreat."
                image="/assets/hero-assets/zac-gudakov-T5CraEJfXIU-unsplash.webp"
                href="#"
                showText={false}
              />
            </div>
            <div className="mt-[60px] text-center">
              <Link href="/inspiration">
                <Button variant="outline-dark" className="border-primary-900/20 py-2 text-xs">
                  VIEW MORE
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="pt-section-sm pb-[180px]">
          <div className="page-mx">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-lg max-w-[800px] w-full">
              <Link
                href="/brochures"
                className="group bg-transparent border border-primary-900/20 p-8 min-h-[80px] flex flex-col items-center justify-center hover:bg-accent-500 hover:border-accent-500 transition-all"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-h4 text-primary-900 group-hover:text-white transition-colors">
                    View Our Brochures
                  </h3>
                  <ExternalLink className="h-5 w-5 text-primary-900 group-hover:text-white transition-colors stroke-[1px]" />
                </div>
              </Link>

              <Link
                href="/contact"
                className="group bg-transparent border border-primary-900/20 p-8 min-h-[80px] flex flex-col items-center justify-center hover:bg-accent-500 hover:border-accent-500 transition-all"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-h4 text-primary-900 group-hover:text-white transition-colors">
                    Send an Enquiry
                  </h3>
                  <ExternalLink className="h-5 w-5 text-primary-900 group-hover:text-white transition-colors stroke-[1px]" />
                </div>
              </Link>
              </div>
            </div>
          </div>
        </section>

        {featuredProjects && featuredProjects.length > 0 && (
          <section className="py-section-md">
            <div className="page-mx">
              <div className="mb-spacing-xl">
                <h2 className="font-h2 text-primary-900 mb-spacing-md">
                  Featured Projects
                </h2>
                <p className="font-body-lg text-primary-900/60 max-w-text">
                  Exceptional bathroom transformations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gap-lg">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group bg-white border border-primary-900/10 overflow-hidden hover:border-primary-900/30 transition-colors"
                  >
                    {project.featured_image && (
                      <div className="relative w-full h-64 bg-neutral-200 overflow-hidden">
                        <img
                          src={project.featured_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-spacing-lg">
                      {project.category && (
                        <span className="inline-block font-body-sm text-primary-900/50 mb-spacing-sm">
                          {project.category}
                        </span>
                      )}
                      <h3 className="font-h5 text-primary-900 mb-spacing-sm group-hover:text-primary-900/80 transition-colors">
                        {project.title}
                      </h3>
                      {project.short_description && (
                        <p className="font-body-sm text-primary-900/50 line-clamp-2">
                          {project.short_description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-spacing-xl text-center">
                <Link
                  href="/projects"
                  className="inline-block font-body text-primary-900 hover:text-primary-900/70 transition-colors"
                >
                  View All Projects →
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

