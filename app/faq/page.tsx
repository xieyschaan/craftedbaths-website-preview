import type { Metadata } from 'next'
import StandardPageTemplate from '@/components/layout/StandardPageTemplate'


export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about our bathroom products, services, and showrooms.',
}

export default function FAQPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          FAQs
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Coming soon.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
