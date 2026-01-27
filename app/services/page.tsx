import StandardPageTemplate from '@/components/layout/StandardPageTemplate'

export const runtime = 'edge'

export default function ServicesPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          Services
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Content for Services will be added here.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
