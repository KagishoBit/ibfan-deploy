import { createClient } from '@supabase/supabase-js';

// Ensure the environment variables are available, or throw an error
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL or anonymous key is not defined in .env.local");
}

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);