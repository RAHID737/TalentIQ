import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseServiceKey = env.server.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseServer =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : (undefined as unknown as ReturnType<typeof createClient>);

