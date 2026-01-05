import { supabase } from "./supabase.js";

// Set cache option for all data fetching (Next.js 13+ Server Components)
// By default, this data is cached until revalidated.

export async function getProfilDesa() {
  const { data, error } = await supabase
    .from("profil_desa")
    .select("*")
    .single();

  if (error) {
    console.error("Error fetching profil_desa:", error);
    return null;
  }
  return data;
}

export async function getStatistik() {
  // Statistik should be an array of key-value pairs (e.g., [{ key: 'populasi', value: 12000 }, ...])
  // Or, if it's a single row, we just fetch one. Assuming a single row for simplicity.
  const { data, error } = await supabase.from("statistik").select("*").single();

  if (error) {
    console.error("Error fetching statistik:", error);
    return null;
  }
  return data;
}

export async function getPotensi() {
  const { data, error } = await supabase.from("potensi").select("*");

  if (error) {
    console.error("Error fetching potensi:", error);
    return [];
  }
  return data;
}

export async function getBerita(limit = 10) {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching berita:", error);
    return [];
  }
  return data;
}

export async function getAllDataForHomepage() {
  const [profil, statistik, potensi, news, gallery] = await Promise.all([
    supabase.from("profil_desa").select("*").single(),
    supabase.from("statistik").select("*"),
    supabase.from("potensi").select("*"),
    supabase
      .from("news")
      .select("*")
      .limit(3)
      .order("created_at", { ascending: false }),
    supabase.from("gallery").select("*").limit(6),
  ]);

  return {
    profil: profil.data,
    statistik: statistik.data,
    potensi: potensi.data || [],
    berita: news.data || [],
    galeri: gallery.data || [],
  };
}
