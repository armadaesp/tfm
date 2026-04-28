import { createClient } from "@supabase/supabase-js";

/** Server-only admin client — use only in API routes, never in browser code */
export function getSupabaseAdmin() {
  const url        = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/** Browser client — insert-only via RLS anon policy */
export function getSupabaseBrowser() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon);
}
