'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Skeleton from '@/components/ui/Skeleton'

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
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <div className="bg-white border-2 border-gray-200 overflow-hidden transition-all hover:border-primary-900">
        {/* Image */}
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          {project.featured_image ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0">
                  <Skeleton className="w-full h-full" />
                </div>
              )}
              <Image
                src={project.featured_image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-in-out ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            </>
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
