import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/hero/HeroSection'
import ShopCard from '@/components/shop/ShopCard'
import BrandSlider from '@/components/brands/BrandSlider'
import { Button } from '@/components/ui'
import { createClient } from '@/lib/supabase/server'
import { ExternalLink } from 'lucide-react'

// OpenNext does not support edge runtime - removed for Cloudflare deployment

export default async function Home() {
  // Fetch featured projects for homepage
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
    // Continue with null featuredProjects - page will render without featured projects section
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section - Full Page with Carousel */}
        <HeroSection />

        {/* Shop Online Section */}
        <section className="py-section-md bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            <h1 className="text-[44px] font-light text-black mb-[60px] text-center">
              Shop Online
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gap-lg">
              <ShopCard
                title="Shop Taps"
                image="/assets/shop-online/tap.webp"
                href="#"
              />
              <ShopCard
                title="Shop Showers"
                image="/assets/shop-online/shower.webp"
                href="#"
              />
              <ShopCard
                title="Shop Baths"
                image="/assets/shop-online/bath.webp"
                href="#"
              />
              <ShopCard
                title="Shop Basins"
                image="/assets/shop-online/basin.webp"
                href="#"
              />
            </div>
            <div className="mt-[60px] text-center">
              <Link href="#">
                <Button 
                  variant="outline" 
                  className="bg-white text-black border border-black hover:bg-gray-50 px-[39px] py-2 uppercase text-[12px]"
                >
                  Shop All
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Cards Section */}
        <section className="py-section-md bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gap-lg w-full">
              {/* Card 1 - Products */}
              <Link
                href="/design-services"
                className="group bg-white border border-black p-8 min-h-[160px] flex flex-col hover:bg-gray-50 transition-all"
              >
                <h3 className="font-h4 text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Expert Consultation
                </h3>
                <p className="font-body text-gray-700 flex-grow">
                  Personalized guidance for your bathroom project.
                </p>
                <span className="mt-6 font-body-sm text-black group-hover:text-gray-800 transition-colors">
                  Learn More →
                </span>
              </Link>

              {/* Card 2 - Showrooms */}
              <Link
                href="/showrooms"
                className="group bg-white border border-black p-8 min-h-[160px] flex flex-col hover:bg-gray-50 transition-all"
              >
                <h3 className="font-h4 text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Visit Our Showrooms
                </h3>
                <p className="font-body text-gray-700 flex-grow">
                  Experience our products in person across the UK.
                </p>
                <span className="mt-6 font-body-sm text-black group-hover:text-gray-800 transition-colors">
                  Find a Showroom →
                </span>
              </Link>

              {/* Card 3 - Projects */}
              <Link
                href="/projects"
                className="group bg-white border border-black p-8 min-h-[160px] flex flex-col hover:bg-gray-50 transition-all"
              >
                <h3 className="font-h4 text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Our Portfolio
                </h3>
                <p className="font-body text-gray-700 flex-grow">
                  Completed projects showcasing exceptional design.
                </p>
                <span className="mt-6 font-body-sm text-black group-hover:text-gray-800 transition-colors">
                  View Projects →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Find All Big Brands Section */}
        <section className="py-section-md bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            {/* Image */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] bg-gray-100 overflow-hidden mb-[90px]">
              <Image
                src="/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp"
                alt="Luxury bathroom brands"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Text Content */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-gap-lg">
              {/* Heading */}
              <div className="flex flex-col items-start min-w-0">
                <h2 className="text-[44px] font-light text-black break-words mb-6">
                  Find All Big Brands With Us
                </h2>
                <Link href="/brands">
                  <Button 
                    variant="outline" 
                    className="bg-white text-black border border-black hover:bg-gray-50 px-[39px] py-2 uppercase text-[12px]"
                  >
                    VIEW BRANDS
                  </Button>
                </Link>
              </div>
              
              {/* Paragraph */}
              <div className="min-w-0">
                <p className="font-body text-gray-700 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  We proudly stock and sell products from all the industry's leading brands, bringing you the finest selection of bathroom fittings and fixtures available. Our carefully curated collection features only the most reputable manufacturers known for their exceptional quality, innovative designs, and unwavering commitment to the highest standards. Each brand we represent has earned its place through years of excellence, rigorous quality control, and dedication to creating products that stand the test of time. When you shop with us, you're choosing from the very best the industry has to offer, ensuring your bathroom project benefits from superior craftsmanship and premium materials.
                </p>
              </div>
            </div>
            
            {/* Brand Slider */}
            <div className="mt-[84px]">
              <BrandSlider />
            </div>
          </div>
        </section>

        {/* Match a Quote Section */}
        <section className="py-section-md bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-gap-lg">
              {/* Left Column - Image */}
              <div className="relative w-full h-[325px] md:h-[390px] lg:h-[455px] bg-gray-100 overflow-hidden">
                <Image
                  src="/assets/hero-assets/smart-renovations-qiclFfG4KFM-unsplash.webp"
                  alt="Get a quote for your bathroom project"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Right Column - Title and Paragraph */}
              <div className="flex flex-col justify-center min-w-0">
                {/* Heading */}
                <h2 className="text-[50px] font-light text-black break-words mb-6">
                  Match a Quote
                </h2>
                
                {/* Paragraph */}
                <p className="font-body text-gray-700 break-words mb-6" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  Found a better price elsewhere? We're confident in our competitive pricing and exceptional service. Simply share your quote with us, and we'll work to match or beat it while ensuring you receive the same high-quality products and expert guidance. Our commitment to value doesn't mean compromising on quality—we'll help you get the best deal on premium bathroom fittings without sacrificing the personalized service and support that sets us apart. Contact us today with your quote, and let's discuss how we can make your bathroom project even more affordable.
                </p>
                
                {/* Button */}
                <div className="mt-5">
                  <Link href="/match-a-quote">
                    <Button 
                      variant="outline" 
                      className="bg-white text-black border border-black hover:bg-gray-50 px-[39px] py-2 uppercase text-[12px]"
                    >
                      Send Quote Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image and Text Section */}
        <section className="py-section-md bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            {/* Image */}
            <div className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] bg-gray-100 overflow-hidden mb-[90px]">
              <Image
                src="/assets/hero-assets/lotus-design-n-print-Dk_o7KQyGkI-unsplash.webp"
                alt="Luxury bathroom design"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Text Content */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-gap-lg">
              {/* Heading */}
              <div className="flex flex-col items-start min-w-0">
                <h2 className="text-[44px] font-light text-black break-words mb-6">
                  Bespoke Design Service
                </h2>
                <Link href="/design-services">
                  <Button 
                    variant="outline" 
                    className="bg-white text-black border border-black hover:bg-gray-50 px-[39px] py-2 uppercase text-[12px]"
                  >
                    Consultation and Design Services
                  </Button>
                </Link>
              </div>
              
              {/* Paragraph */}
              <div className="min-w-0">
                <p className="font-body text-gray-700 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  Our bespoke design service offers a completely personalized approach to creating your dream bathroom. We work closely with you to understand your vision, lifestyle, and preferences, ensuring every detail reflects your unique style. From initial consultation through to final installation, our experienced design team guides you through the entire process, combining luxury fittings with innovative solutions that maximize both form and function. We specialize in creating spaces that are not only beautiful but also perfectly tailored to your specific needs and aesthetic preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shop Online Section (Duplicate) */}
        <section className="py-section-md bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            <h1 className="text-[44px] font-light text-black mb-[60px] text-center">
              View Our Bathroom Inspirations
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gap-lg">
              <ShopCard
                title="Shop Taps"
                image="/assets/shop-online/tap.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Shop Showers"
                image="/assets/shop-online/shower.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Shop Baths"
                image="/assets/shop-online/bath.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Shop Basins"
                image="/assets/shop-online/basin.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Bathroom Design 1"
                image="/assets/hero-assets/dominik-5z7ERdLbJ0U-unsplash.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Bathroom Design 2"
                image="/assets/hero-assets/smart-renovations-qiclFfG4KFM-unsplash.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Bathroom Design 3"
                image="/assets/hero-assets/toa-heftiba-PUMw1z67VmQ-unsplash.webp"
                href="#"
                showText={false}
              />
              <ShopCard
                title="Bathroom Design 4"
                image="/assets/hero-assets/zac-gudakov-T5CraEJfXIU-unsplash.webp"
                href="#"
                showText={false}
              />
            </div>
            <div className="mt-[60px] text-center">
              <Link href="/inspiration">
                <Button 
                  variant="outline" 
                  className="bg-white text-black border border-black hover:bg-gray-50 px-[39px] py-2 uppercase text-[12px]"
                >
                  VIEW MORE
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Brochures and Enquiry Cards Section */}
        <section className="pt-section-sm pb-[180px] bg-white">
          <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gap-lg max-w-[800px] w-full">
              {/* Card 1 - View Our Brochures */}
              <Link
                href="/brochures"
                className="group bg-white border border-black p-8 min-h-[80px] flex flex-col items-center justify-center hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-h4 text-black group-hover:text-gray-800 transition-colors">
                    View Our Brochures
                  </h3>
                  <ExternalLink className="h-5 w-5 text-black group-hover:text-gray-800 transition-colors stroke-[1px]" />
                </div>
              </Link>

              {/* Card 2 - Send an Enquiry */}
              <Link
                href="/contact"
                className="group bg-white border border-black p-8 min-h-[80px] flex flex-col items-center justify-center hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-h4 text-black group-hover:text-gray-800 transition-colors">
                    Send an Enquiry
                  </h3>
                  <ExternalLink className="h-5 w-5 text-black group-hover:text-gray-800 transition-colors stroke-[1px]" />
                </div>
              </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        {featuredProjects && featuredProjects.length > 0 && (
          <section className="py-section-md bg-gray-50">
            <div className="mx-3.5 md:mx-7 lg:mx-9 xl:mx-12">
              <div className="mb-spacing-xl">
                <h2 className="font-h2 text-black mb-spacing-md">
                  Featured Projects
                </h2>
                <p className="font-body-lg text-gray-700 max-w-text">
                  Exceptional bathroom transformations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gap-lg">
                {featuredProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group bg-white border-2 border-gray-200 overflow-hidden hover:border-primary-900 transition-colors"
                  >
                    {project.featured_image && (
                      <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                        <img
                          src={project.featured_image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-spacing-lg">
                      {project.category && (
                        <span className="inline-block font-body-sm text-gray-500 mb-spacing-sm">
                          {project.category}
                        </span>
                      )}
                      <h3 className="font-h5 text-black mb-spacing-sm group-hover:text-gray-800 transition-colors">
                        {project.title}
                      </h3>
                      {project.short_description && (
                        <p className="font-body-sm text-gray-600 line-clamp-2">
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
                  className="inline-block font-body text-black hover:text-gray-800 transition-colors"
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

