import { supabase } from '@/shared/lib/supabase'
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
