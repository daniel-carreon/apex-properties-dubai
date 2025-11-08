export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          slug: string
          property_type: 'penthouse' | 'villa' | 'apartment' | 'townhouse' | 'off-plan'
          price_aed: number
          price_usd: number
          bedrooms: number
          bathrooms: number
          size_sqft: number
          size_sqm: number
          location: string
          neighborhood: string | null
          description: string | null
          features: string[]
          status: 'available' | 'sold' | 'reserved' | 'off-plan'
          completion_date: string | null
          developer: string | null
          payment_plan: string | null
          rental_yield: number | null
          roi_estimate: number | null
          golden_visa_eligible: boolean
          main_image_url: string | null
          gallery_images: string[]
          video_tour_url: string | null
          is_featured: boolean
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          property_type: 'penthouse' | 'villa' | 'apartment' | 'townhouse' | 'off-plan'
          price_aed: number
          price_usd: number
          bedrooms: number
          bathrooms: number
          size_sqft: number
          size_sqm: number
          location: string
          neighborhood?: string | null
          description?: string | null
          features?: string[]
          status?: 'available' | 'sold' | 'reserved' | 'off-plan'
          completion_date?: string | null
          developer?: string | null
          payment_plan?: string | null
          rental_yield?: number | null
          roi_estimate?: number | null
          golden_visa_eligible?: boolean
          main_image_url?: string | null
          gallery_images?: string[]
          video_tour_url?: string | null
          is_featured?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          property_type?: 'penthouse' | 'villa' | 'apartment' | 'townhouse' | 'off-plan'
          price_aed?: number
          price_usd?: number
          bedrooms?: number
          bathrooms?: number
          size_sqft?: number
          size_sqm?: number
          location?: string
          neighborhood?: string | null
          description?: string | null
          features?: string[]
          status?: 'available' | 'sold' | 'reserved' | 'off-plan'
          completion_date?: string | null
          developer?: string | null
          payment_plan?: string | null
          rental_yield?: number | null
          roi_estimate?: number | null
          golden_visa_eligible?: boolean
          main_image_url?: string | null
          gallery_images?: string[]
          video_tour_url?: string | null
          is_featured?: boolean
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          country_code: string | null
          budget_min_aed: number | null
          budget_max_aed: number | null
          property_type: string | null
          bedrooms: number | null
          location_preference: string | null
          timeline: 'urgent' | '1-3 months' | '3-6 months' | '6-12 months' | 'exploring'
          purpose: 'personal residence' | 'investment' | 'golden visa' | 'second home'
          financing_needed: boolean
          source: string
          lead_score: number
          status: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'negotiation' | 'closed' | 'lost'
          notes: string | null
          assigned_agent_id: string | null
          last_contact_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          country_code?: string | null
          budget_min_aed?: number | null
          budget_max_aed?: number | null
          property_type?: string | null
          bedrooms?: number | null
          location_preference?: string | null
          timeline: 'urgent' | '1-3 months' | '3-6 months' | '6-12 months' | 'exploring'
          purpose: 'personal residence' | 'investment' | 'golden visa' | 'second home'
          financing_needed?: boolean
          source?: string
          lead_score?: number
          status?: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'negotiation' | 'closed' | 'lost'
          notes?: string | null
          assigned_agent_id?: string | null
          last_contact_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          country_code?: string | null
          budget_min_aed?: number | null
          budget_max_aed?: number | null
          property_type?: string | null
          bedrooms?: number | null
          location_preference?: string | null
          timeline?: 'urgent' | '1-3 months' | '3-6 months' | '6-12 months' | 'exploring'
          purpose?: 'personal residence' | 'investment' | 'golden visa' | 'second home'
          financing_needed?: boolean
          source?: string
          lead_score?: number
          status?: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'negotiation' | 'closed' | 'lost'
          notes?: string | null
          assigned_agent_id?: string | null
          last_contact_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      viewings: {
        Row: {
          id: string
          lead_id: string
          property_id: string
          viewing_date: string
          viewing_time: string
          viewing_type: 'in-person' | 'virtual' | 'video-call'
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          feedback: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          property_id: string
          viewing_date: string
          viewing_time: string
          viewing_type?: 'in-person' | 'virtual' | 'video-call'
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          feedback?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          property_id?: string
          viewing_date?: string
          viewing_time?: string
          viewing_type?: 'in-person' | 'virtual' | 'video-call'
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          feedback?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      neighborhoods: {
        Row: {
          id: string
          name: string
          slug: string
          category: 'ultra-luxury' | 'luxury' | 'family-friendly' | 'investment' | 'waterfront'
          avg_price_per_sqft_aed: number | null
          avg_roi: number | null
          description: string | null
          amenities: string[]
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          category: 'ultra-luxury' | 'luxury' | 'family-friendly' | 'investment' | 'waterfront'
          avg_price_per_sqft_aed?: number | null
          avg_roi?: number | null
          description?: string | null
          amenities?: string[]
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          category?: 'ultra-luxury' | 'luxury' | 'family-friendly' | 'investment' | 'waterfront'
          avg_price_per_sqft_aed?: number | null
          avg_roi?: number | null
          description?: string | null
          amenities?: string[]
          image_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
