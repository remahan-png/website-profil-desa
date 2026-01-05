import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This client is for Server-Side use (e.g., fetching data in Server Components or Route Handlers)
// It uses the public keys as requested, which is generally fine for read-only data fetching.
// If you need to perform privileged operations, you would use a service role key, but this is sufficient for the current task.
export const createFrontendClient = () =>
  createClient(supabaseUrl, supabaseAnonKey);
