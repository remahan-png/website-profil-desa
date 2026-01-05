import { supabase } from './supabase.js'

// Set cache option for all data fetching (Next.js 13+ Server Components)
// By default, this data is cached until revalidated.

export async function getProfilDesa() {
  const { data, error } = await supabase
    .from('profil_desa')
    .select('*')
    .single()
  
  if (error) {
    console.error('Error fetching profil_desa:', error)
    return null
  }
  return data
}

export async function getStatistik() {
  // Statistik should be an array of key-value pairs (e.g., [{ key: 'populasi', value: 12000 }, ...])
  // Or, if it's a single row, we just fetch one. Assuming a single row for simplicity.
  const { data, error } = await supabase
    .from('statistik')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching statistik:', error)
    return null
  }
  return data
}

export async function getPotensi() {
  const { data, error } = await supabase
    .from('potensi')
    .select('*')

  if (error) {
    console.error('Error fetching potensi:', error)
    return []
  }
  return data
}

export async function getBerita(limit = 10) {
  const { data, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching berita:', error)
    return []
  }
  return data
}

export async function getAllDataForHomepage() {
  // Fetch all data concurrently
  const [profil, statistik, potensi, berita] = await Promise.all([
    getProfilDesa(),
    getStatistik(),
    getPotensi(),
    getBerita(3), // Limit berita to 3 for homepage
  ])

  return {
    profil,
    statistik,
    potensi,
    berita,
  }
}
