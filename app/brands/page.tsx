import StandardPageTemplate from '@/components/layout/StandardPageTemplate'

// OpenNext does not support edge runtime - removed for Cloudflare deployment

export default function BrandsPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          Brands
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Content for Brands will be added here.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
