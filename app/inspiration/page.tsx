import type { Metadata } from 'next'
import StandardPageTemplate from '@/components/layout/StandardPageTemplate'


export const metadata: Metadata = {
  title: 'Inspiration',
  description: 'Browse bathroom design inspiration and ideas for your next project.',
}

export default function InspirationPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          Inspiration
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Coming soon.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
