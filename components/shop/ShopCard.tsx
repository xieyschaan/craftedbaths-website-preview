import Image from 'next/image'
import Link from 'next/link'

interface ShopCardProps {
  title: string
  image: string
  href?: string
  showText?: boolean
}

export default function ShopCard({ title, image, href = '#', showText = true }: ShopCardProps) {
  const content = (
    <div className="group">
      <div className="bg-white overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-64 md:h-80 bg-gray-100 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-[600ms] ease-in-out"
          />
        </div>
        {/* Text */}
        {showText && (
          <div className="p-spacing-md pt-[18px]">
            <p className="font-h2 text-black">
              {title}
            </p>
          </div>
        )}
      </div>
    </div>
  )

  if (href === '#') {
    return content
  }

  return <Link href={href}>{content}</Link>
}
