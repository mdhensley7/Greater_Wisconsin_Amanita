// js/supabaseClient.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = "https://dkzveuixfzltrybuwllh.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_i-Z7KaaOQPTwkOtPGWffTg_fqOgZfMX";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);