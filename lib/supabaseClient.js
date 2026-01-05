"use client";

import { createClient } from "@supabase/supabase-js";

// Digunakan di Client Components
export const supabase = createClient(
  // Ganti 'supabaseClient' jadi 'supabase'
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
