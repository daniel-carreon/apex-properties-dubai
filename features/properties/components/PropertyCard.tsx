import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'
import { Badge } from '@/shared/components/Badge'
import { Button } from '@/shared/components/Button'
import { formatPriceAED, formatPriceUSD } from '@/shared/lib/utils'
import type { Database } from '@/shared/types/database'

type Property = Database['public']['Tables']['properties']['Row']

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-luxury transition-all duration-300 hover:shadow-gold-glow hover:scale-[1.02]">
      {/* Property Image */}
      <Link href={`/properties/${property.slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={property.main_image_url || '/placeholder-property.jpg'}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {property.is_featured && (
              <Badge variant="default">FEATURED</Badge>
            )}
            {property.status === 'off-plan' && (
              <Badge variant="secondary">OFF-PLAN</Badge>
            )}
            {property.golden_visa_eligible && (
              <Badge variant="outline">GOLDEN VISA</Badge>
            )}
          </div>
        </div>
      </Link>

      {/* Property Details */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center text-text-light mb-2">
          <MapPin className="h-4 w-4 mr-1 text-secondary" />
          <span className="text-sm font-inter">{property.location}</span>
        </div>

        {/* Title */}
        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-playfair text-xl font-bold text-primary mb-3 hover:text-secondary transition-colors duration-200 line-clamp-2">
            {property.title}
          </h3>
        </Link>

        {/* Specs */}
        <div className="flex items-center gap-4 text-text-light mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-secondary" />
            <span className="text-sm font-inter">{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-secondary" />
            <span className="text-sm font-inter">{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1 text-secondary" />
            <span className="text-sm font-inter">
              {property.size_sqft.toLocaleString()} sqft
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <div className="text-2xl font-orbitron font-bold text-secondary">
              {formatPriceAED(property.price_aed)}
            </div>
            <div className="text-sm text-text-light font-inter">
              {formatPriceUSD(property.price_usd)}
            </div>
          </div>
          <Button variant="dark" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
