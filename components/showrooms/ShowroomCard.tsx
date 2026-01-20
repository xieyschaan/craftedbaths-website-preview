import Link from 'next/link'

interface ShowroomCardProps {
  showroom: {
    id: string
    name: string
    address: string | null
    city: string | null
    state: string | null
    postal_code: string | null
    country: string | null
    phone: string | null
    email: string | null
  }
}

export default function ShowroomCard({ showroom }: ShowroomCardProps) {
  const fullAddress = [
    showroom.address,
    showroom.city,
    showroom.state,
    showroom.postal_code,
    showroom.country,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="bg-white border-2 border-gray-200 p-spacing-lg">
      <h3 className="font-h4 text-black mb-spacing-md">
        {showroom.name}
      </h3>

      {fullAddress && (
        <div className="mb-spacing-md">
          <p className="font-body text-gray-700 whitespace-pre-line">
            {fullAddress}
          </p>
        </div>
      )}

      <div className="space-y-spacing-sm font-body-sm text-gray-600">
        {showroom.phone && (
          <p>
            <strong>Phone:</strong>{' '}
            <a href={`tel:${showroom.phone}`} className="text-black hover:text-gray-800 transition-colors">
              {showroom.phone}
            </a>
          </p>
        )}
        {showroom.email && (
          <p>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${showroom.email}`} className="text-black hover:text-gray-800 transition-colors">
              {showroom.email}
            </a>
          </p>
        )}
      </div>

      <div className="mt-spacing-md">
        <Link
          href={`/contact?showroom=${showroom.id}`}
          className="inline-block font-body-sm text-black hover:text-gray-800 transition-colors"
        >
          Contact this showroom →
        </Link>
      </div>
    </div>
  )
}
