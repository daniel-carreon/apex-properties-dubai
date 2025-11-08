import { supabase } from '@/shared/lib/supabase'
import type { Database } from '@/shared/types/database'

type Lead = Database['public']['Tables']['leads']['Row']
type LeadInsert = Database['public']['Tables']['leads']['Insert']

export interface CreateLeadInput {
  fullName: string
  email: string
  phone: string
  countryCode?: string
  budgetMinAed?: number
  budgetMaxAed?: number
  propertyType?: string
  bedrooms?: number
  locationPreference?: string
  timeline: 'urgent' | '1-3 months' | '3-6 months' | '6-12 months' | 'exploring'
  purpose: 'personal residence' | 'investment' | 'golden visa' | 'second home'
  financingNeeded?: boolean
  notes?: string
  source?: string
}

/**
 * Create a new lead in the CRM
 */
export async function createLead(input: CreateLeadInput) {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      country_code: input.countryCode,
      budget_min_aed: input.budgetMinAed,
      budget_max_aed: input.budgetMaxAed,
      property_type: input.propertyType,
      bedrooms: input.bedrooms,
      location_preference: input.locationPreference,
      timeline: input.timeline,
      purpose: input.purpose,
      financing_needed: input.financingNeeded || false,
      notes: input.notes,
      source: input.source || 'chatbot',
      status: 'new',
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    throw error
  }

  return data as Lead
}

/**
 * Get lead by email
 */
export async function getLeadByEmail(email: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned
    console.error('Error fetching lead:', error)
    throw error
  }

  return data as Lead | null
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  leadId: string,
  status: Lead['status']
) {
  const { error } = await supabase
    .from('leads')
    .update({
      status,
      last_contact_date: new Date().toISOString(),
    })
    .eq('id', leadId)

  if (error) {
    console.error('Error updating lead status:', error)
    throw error
  }
}

/**
 * Add notes to a lead
 */
export async function addLeadNotes(leadId: string, notes: string) {
  const { error } = await supabase
    .from('leads')
    .update({
      notes,
      last_contact_date: new Date().toISOString(),
    })
    .eq('id', leadId)

  if (error) {
    console.error('Error adding notes:', error)
    throw error
  }
}

/**
 * Check Golden Visa eligibility
 */
export function checkGoldenVisaEligibility(priceAed: number): boolean {
  return priceAed >= 2000000 // AED 2M minimum
}
