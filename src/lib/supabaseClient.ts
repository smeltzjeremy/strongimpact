import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvfcoumexlrxwlusrenc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52ZmNvdW1leGxyeHdsdXNyZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NzI5NzYsImV4cCI6MjA5NzQ0ODk3Nn0.xbuKUSgUb3_lTqyt1gx8by22Jon8C2M9Ul2o3dals9I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);