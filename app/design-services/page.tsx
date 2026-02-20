import type { Metadata } from 'next'
import StandardPageTemplate from '@/components/layout/StandardPageTemplate'


export const metadata: Metadata = {
  title: 'Design Services',
  description: 'Our bespoke bathroom design service — from initial consultation to final installation.',
}

export default function DesignServicesPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          Design Services
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Coming soon.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
