import { supabase, isSupabaseConfigured } from '@/shared/lib/supabase'
import { mockProperties } from '@/shared/lib/mockData'
import type { Database } from '@/shared/types/database'

type Property = Database['public']['Tables']['properties']['Row']
type PropertyInsert = Database['public']['Tables']['properties']['Insert']

export interface PropertyFilters {
  property_type?: string
  min_price_aed?: number
  max_price_aed?: number
  bedrooms?: number
  location?: string
  golden_visa_eligible?: boolean
  status?: string
}

/**
 * Get all properties with optional filters
 */
export async function getProperties(filters?: PropertyFilters) {
  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    console.log('Using mock property data (Supabase not configured)')
    let filtered = mockProperties.filter(p => p.status === (filters?.status || 'available'))

    if (filters?.property_type && filters.property_type !== 'all') {
      filtered = filtered.filter(p => p.property_type === filters.property_type)
    }

    if (filters?.min_price_aed) {
      filtered = filtered.filter(p => p.price_aed >= filters.min_price_aed!)
    }

    if (filters?.max_price_aed) {
      filtered = filtered.filter(p => p.price_aed <= filters.max_price_aed!)
    }

    if (filters?.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms!)
    }

    if (filters?.location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    if (filters?.golden_visa_eligible) {
      filtered = filtered.filter(p => p.golden_visa_eligible)
    }

    // Sort by featured first, then by created_at
    filtered.sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1
      if (!a.is_featured && b.is_featured) return 1
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    return filtered as any
  }

  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', filters?.status || 'available')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (filters?.property_type && filters.property_type !== 'all') {
    query = query.eq('property_type', filters.property_type)
  }

  if (filters?.min_price_aed) {
    query = query.gte('price_aed', filters.min_price_aed)
  }

  if (filters?.max_price_aed) {
    query = query.lte('price_aed', filters.max_price_aed)
  }

  if (filters?.bedrooms) {
    query = query.eq('bedrooms', filters.bedrooms)
  }

  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`)
  }

  if (filters?.golden_visa_eligible) {
    query = query.eq('golden_visa_eligible', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching properties:', error)
    throw error
  }

  return data as Property[]
}

/**
 * Get a single property by slug
 */
export async function getPropertyBySlug(slug: string) {
  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    const property = mockProperties.find(p => p.slug === slug)
    if (!property) {
      throw new Error('Property not found')
    }
    return property as any
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching property:', error)
    throw error
  }

  return data as Property
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching property:', error)
    throw error
  }

  return data as Property
}

/**
 * Get featured properties
 */
export async function getFeaturedProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('Error fetching featured properties:', error)
    throw error
  }

  return data as Property[]
}

/**
 * Increment property view count
 */
export async function incrementPropertyViews(propertyId: string) {
  const { error } = await supabase.rpc('increment_property_views', {
    p_property_id: propertyId,
  })

  if (error) {
    console.error('Error incrementing views:', error)
  }
}

/**
 * Get similar properties based on location and price range
 */
export async function getSimilarProperties(
  currentPropertyId: string,
  location: string,
  priceAed: number
) {
  const priceRange = priceAed * 0.3 // 30% price range

  // Use mock data if Supabase is not configured
  if (!isSupabaseConfigured()) {
    const similar = mockProperties
      .filter(p =>
        p.status === 'available' &&
        p.id !== currentPropertyId &&
        p.location === location &&
        p.price_aed >= priceAed - priceRange &&
        p.price_aed <= priceAed + priceRange
      )
      .slice(0, 3)
    return similar as any
  }

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'available')
    .neq('id', currentPropertyId)
    .eq('location', location)
    .gte('price_aed', priceAed - priceRange)
    .lte('price_aed', priceAed + priceRange)
    .limit(3)

  if (error) {
    console.error('Error fetching similar properties:', error)
    return []
  }

  return data as Property[]
}

/**
 * Calculate ROI for a property
 */
export function calculateROI(propertyPrice: number, annualRent: number): number {
  return (annualRent / propertyPrice) * 100
}
