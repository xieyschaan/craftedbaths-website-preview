import type { Metadata } from 'next'
import StandardPageTemplate from '@/components/layout/StandardPageTemplate'


export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse our portfolio of completed luxury bathroom projects and transformations.',
}

export default function ProjectsPage() {
  return (
    <StandardPageTemplate>
      <section className="py-section-md bg-white">
        <h1 className="text-[44px] font-light text-black mb-6">
          Projects
        </h1>
        <p className="font-body text-gray-700 max-w-text">
          Coming soon.
        </p>
      </section>
    </StandardPageTemplate>
  )
}
