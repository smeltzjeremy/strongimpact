import { createClient } from '@supabase/supabase-js';

// Your direct live database connections mapped from your dashboard keys
const supabaseUrl = 'https://nvfcoumexlrxwlusrenc.supabase.co';
const supabaseAnonKey = 'Sb_publishable_m0XbJCQuFQW3eHzvVSlL7w__lhHH6AN';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);