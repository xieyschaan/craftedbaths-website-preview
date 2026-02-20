import type { Metadata } from 'next'
import StandardPageTemplate from '@/components/layout/StandardPageTemplate'

export const metadata: Metadata = {
  title: 'JTP | Brands',
  description: 'Explore the JTP collection at Crafted Bathrooms — timeless designs in premium finishes for taps, showers, and bathroom accessories.',
}

export default function JTPBrandPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md">
        <h1 className="text-[44px] font-light text-primary-900 mb-6">
          JTP
        </h1>
        <p className="font-body text-primary-900/60 max-w-text">
          Coming soon.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
