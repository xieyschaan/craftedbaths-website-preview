import type { Metadata } from 'next'
import StandardPageTemplate from '@/components/layout/StandardPageTemplate'


export const metadata: Metadata = {
  title: 'Showrooms',
  description: 'Visit our bathroom showrooms across the UK to experience our products in person.',
}

export default function ShowroomsPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          Showrooms
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Coming soon.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
