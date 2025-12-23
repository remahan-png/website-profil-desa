import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Koneksi Supabase gagal: URL atau Key belum diatur di Environment Variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)