import Link from 'next/link'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    slug: string
    short_description: string | null
    featured_image: string | null
    category: string | null
    location: string | null
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="bg-white border-2 border-gray-200 overflow-hidden transition-all hover:border-primary-900">
        {/* Image */}
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          {project.featured_image ? (
            <img
              src={project.featured_image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 font-gilroy">No Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-spacing-md">
          {project.category && (
            <span className="inline-block font-body-sm text-gray-500 mb-spacing-sm">
              {project.category}
            </span>
          )}
          <h3 className="font-h4 text-black mb-spacing-sm group-hover:text-gray-800 transition-colors">
            {project.title}
          </h3>
          {project.short_description && (
            <p className="font-body-sm text-gray-600 line-clamp-2">
              {project.short_description}
            </p>
          )}
          {project.location && (
            <p className="font-body-sm text-gray-500 mt-spacing-sm">
              {project.location}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
