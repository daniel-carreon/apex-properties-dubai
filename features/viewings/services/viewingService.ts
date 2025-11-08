import { supabase } from '@/shared/lib/supabase'
import type { Database } from '@/shared/types/database'

type Viewing = Database['public']['Tables']['viewings']['Row']
type ViewingInsert = Database['public']['Tables']['viewings']['Insert']

/**
 * Check available viewing slots for a property on a specific date
 */
export async function checkViewingAvailability(
  propertyId: string,
  date: string
): Promise<string[]> {
  const { data, error } = await supabase.rpc('check_viewing_slots', {
    p_date: date,
    p_property_id: propertyId,
  })

  if (error) {
    console.error('Error checking availability:', error)
    throw error
  }

  return (data as { available_time: string }[]).map((slot) => slot.available_time)
}

/**
 * Schedule a property viewing
 */
export async function scheduleViewing(viewing: {
  leadId: string
  propertyId: string
  viewingDate: string
  viewingTime: string
  viewingType?: 'in-person' | 'virtual' | 'video-call'
}) {
  const { data, error } = await supabase
    .from('viewings')
    .insert({
      lead_id: viewing.leadId,
      property_id: viewing.propertyId,
      viewing_date: viewing.viewingDate,
      viewing_time: viewing.viewingTime,
      viewing_type: viewing.viewingType || 'in-person',
      status: 'scheduled',
    })
    .select()
    .single()

  if (error) {
    console.error('Error scheduling viewing:', error)
    throw error
  }

  return data as Viewing
}

/**
 * Get viewings for a specific lead
 */
export async function getLeadViewings(leadId: string) {
  const { data, error } = await supabase
    .from('viewings')
    .select(`
      *,
      properties (
        title,
        location,
        main_image_url
      )
    `)
    .eq('lead_id', leadId)
    .order('viewing_date', { ascending: true })

  if (error) {
    console.error('Error fetching viewings:', error)
    throw error
  }

  return data
}

/**
 * Cancel a viewing
 */
export async function cancelViewing(viewingId: string) {
  const { error } = await supabase
    .from('viewings')
    .update({ status: 'cancelled' })
    .eq('id', viewingId)

  if (error) {
    console.error('Error cancelling viewing:', error)
    throw error
  }
}
