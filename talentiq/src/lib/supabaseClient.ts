import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const supabaseUrl = env.client.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.client.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (undefined as unknown as ReturnType<typeof createClient>);

