import { createClient } from "@supabase/supabase-js";

function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars missing");
  }
  return createClient(url, key);
}

let _client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!_client) _client = createSupabaseClient();
  return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return getClient()[prop as keyof ReturnType<typeof createClient>];
  },
});
