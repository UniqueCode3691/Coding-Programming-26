// SupabaseClient.jsx - Configuration file for Supabase client.
// This file sets up the Supabase client using environment variables for URL and API key.
// The client is used throughout the app to interact with the Supabase database and authentication.

import { createClient } from "@supabase/supabase-js";

// Retrieve Supabase URL and anonymous key from environment variables.
// These are set in the .env file for security.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create and export the Supabase client instance.
// This client handles all database operations and authentication for the app.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)