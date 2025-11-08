import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

export const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
         !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
}
