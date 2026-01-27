import StandardPageTemplate from '@/components/layout/StandardPageTemplate'

export const runtime = 'edge'

export default function FAQPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          FAQs
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Content for FAQs will be added here.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
