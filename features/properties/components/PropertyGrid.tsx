'use client'

import { useState, useEffect } from 'react'
import PropertyCard from './PropertyCard'
import { getProperties, type PropertyFilters } from '../services/propertyService'
import type { Database } from '@/shared/types/database'
import { Label } from '@/shared/components/Label'
import { Input } from '@/shared/components/Input'

type Property = Database['public']['Tables']['properties']['Row']

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<PropertyFilters>({
    property_type: 'all',
    min_price_aed: undefined,
    max_price_aed: undefined,
    bedrooms: undefined,
    location: '',
    golden_visa_eligible: false,
  })

  // Fetch properties
  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        const data = await getProperties(filters)
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters])

  // Handle filter changes
  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <section id="properties" className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Exclusive <span className="text-gradient-gold">Property Collection</span>
          </h2>
          <p className="text-lg text-text-light font-inter max-w-2xl mx-auto">
            Discover ultra-luxury properties in Dubai's most prestigious locations
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 p-6 bg-white rounded-xl shadow-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Property Type Filter */}
            <div>
              <Label htmlFor="property-type" className="mb-2 block">
                Property Type
              </Label>
              <select
                id="property-type"
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-inter text-text focus-visible:outline-none focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20"
                value={filters.property_type || 'all'}
                onChange={(e) =>
                  handleFilterChange('property_type', e.target.value)
                }
              >
                <option value="all">All Types</option>
                <option value="penthouse">Penthouse</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="townhouse">Townhouse</option>
                <option value="off-plan">Off-Plan</option>
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <Label htmlFor="bedrooms" className="mb-2 block">
                Bedrooms
              </Label>
              <select
                id="bedrooms"
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-inter text-text focus-visible:outline-none focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/20"
                value={filters.bedrooms || ''}
                onChange={(e) =>
                  handleFilterChange(
                    'bedrooms',
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              >
                <option value="">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <Label htmlFor="location" className="mb-2 block">
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Palm Jumeirah"
                value={filters.location || ''}
                onChange={(e) =>
                  handleFilterChange('location', e.target.value)
                }
              />
            </div>

            {/* Golden Visa Filter */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer h-12">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary"
                  checked={filters.golden_visa_eligible || false}
                  onChange={(e) =>
                    handleFilterChange('golden_visa_eligible', e.target.checked)
                  }
                />
                <span className="text-sm font-inter text-text">
                  Golden Visa Eligible
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-secondary border-r-transparent" />
            <p className="mt-4 text-text-light font-inter">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-light font-inter text-lg">
              No properties found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && properties.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-text-light font-inter">
              Showing <span className="font-semibold text-secondary">{properties.length}</span>{' '}
              {properties.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
