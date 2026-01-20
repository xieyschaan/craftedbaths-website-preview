import ProjectCard from './ProjectCard'

interface Project {
  id: string
  title: string
  slug: string
  short_description: string | null
  featured_image: string | null
  category: string | null
  location: string | null
}

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-section-md">
        <p className="font-body text-gray-600">No projects found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gap-lg">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
