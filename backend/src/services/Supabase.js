import { createClient } from "@supabase/supabase-js"
export const supabase=createClient(process.env.URL_SUPABASE_CONNECT, process.env.ANON_KEY_SUPABASE)