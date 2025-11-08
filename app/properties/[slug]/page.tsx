import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPropertyBySlug, getSimilarProperties, incrementPropertyViews } from '@/features/properties/services/propertyService'
import { Badge } from '@/shared/components/Badge'
import { Button } from '@/shared/components/Button'
import { formatPriceAED, formatPriceUSD } from '@/shared/lib/utils'
import { Bed, Bath, Maximize, MapPin, Calendar, TrendingUp, Home } from 'lucide-react'
import PropertyCard from '@/features/properties/components/PropertyCard'

export default async function PropertyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let property

  try {
    property = await getPropertyBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  // Increment view count (fire and forget)
  incrementPropertyViews(property.id)

  // Get similar properties
  const similarProperties = await getSimilarProperties(
    property.id,
    property.location,
    property.price_aed
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image Gallery */}
      <section className="relative h-[60vh] min-h-[500px] w-full">
        <Image
          src={property.main_image_url || '/placeholder-property.jpg'}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Badges Overlay */}
        <div className="absolute top-8 left-8 flex gap-2">
          {property.is_featured && <Badge variant="default">FEATURED</Badge>}
          {property.status === 'off-plan' && <Badge variant="secondary">OFF-PLAN</Badge>}
          {property.golden_visa_eligible && <Badge variant="outline">GOLDEN VISA</Badge>}
        </div>
      </section>

      {/* Property Details */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2">
            {/* Title & Location */}
            <div className="mb-8">
              <div className="flex items-center text-text-light mb-3">
                <MapPin className="h-5 w-5 mr-2 text-secondary" />
                <span className="font-inter text-lg">{property.location}</span>
              </div>
              <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-4">
                {property.title}
              </h1>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-luxury text-center">
                <Bed className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {property.bedrooms}
                </div>
                <div className="text-sm text-text-light font-inter">Bedrooms</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-luxury text-center">
                <Bath className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {property.bathrooms}
                </div>
                <div className="text-sm text-text-light font-inter">Bathrooms</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-luxury text-center">
                <Maximize className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-orbitron font-bold text-primary">
                  {property.size_sqft.toLocaleString()}
                </div>
                <div className="text-sm text-text-light font-inter">sqft</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-luxury text-center">
                <Home className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-orbitron font-bold text-primary capitalize">
                  {property.property_type}
                </div>
                <div className="text-sm text-text-light font-inter">Type</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-8 shadow-luxury mb-8">
              <h2 className="font-playfair text-2xl font-bold text-primary mb-4">
                About This Property
              </h2>
              <p className="text-text font-inter leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-8 shadow-luxury mb-8">
              <h2 className="font-playfair text-2xl font-bold text-primary mb-6">
                Premium Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-secondary rounded-full mr-3" />
                    <span className="text-text font-inter">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment Details */}
            {(property.rental_yield || property.roi_estimate) && (
              <div className="bg-gradient-luxury rounded-xl p-8 shadow-luxury text-white mb-8">
                <h2 className="font-playfair text-2xl font-bold mb-6">
                  Investment Potential
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.rental_yield && (
                    <div className="flex items-start">
                      <TrendingUp className="h-6 w-6 text-secondary mr-3 mt-1" />
                      <div>
                        <div className="text-sm text-gray-300 mb-1">Rental Yield</div>
                        <div className="text-3xl font-orbitron font-bold text-secondary">
                          {property.rental_yield}%
                        </div>
                      </div>
                    </div>
                  )}
                  {property.roi_estimate && (
                    <div className="flex items-start">
                      <TrendingUp className="h-6 w-6 text-secondary mr-3 mt-1" />
                      <div>
                        <div className="text-sm text-gray-300 mb-1">ROI Estimate</div>
                        <div className="text-3xl font-orbitron font-bold text-secondary">
                          {property.roi_estimate}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1">
            {/* Price Card - Sticky */}
            <div className="bg-white rounded-xl p-8 shadow-gold-glow sticky top-24 mb-8">
              <div className="mb-6">
                <div className="text-4xl font-orbitron font-bold text-secondary mb-2">
                  {formatPriceAED(property.price_aed)}
                </div>
                <div className="text-xl text-text-light font-inter">
                  {formatPriceUSD(property.price_usd)}
                </div>
              </div>

              {property.status === 'off-plan' && property.payment_plan && (
                <div className="mb-6 p-4 bg-secondary/10 rounded-lg">
                  <div className="flex items-center text-secondary mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="font-montserrat font-semibold">Payment Plan</span>
                  </div>
                  <p className="text-text font-inter text-sm">{property.payment_plan}</p>
                  {property.completion_date && (
                    <p className="text-text-light font-inter text-sm mt-2">
                      Completion: {new Date(property.completion_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                </div>
              )}

              {property.golden_visa_eligible && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-inter text-sm">
                    ✓ This property qualifies you for UAE's 10-year Golden Visa
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full">
                  Schedule Viewing
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                  Contact Agent
                </Button>
              </div>

              {property.developer && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-text-light font-inter mb-1">Developer</div>
                  <div className="text-text font-montserrat font-semibold">
                    {property.developer}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-playfair text-3xl font-bold text-primary mb-8">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
