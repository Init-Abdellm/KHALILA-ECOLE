// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://mciluuerecttjhlcfdmr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaWx1dWVyZWN0dGpobGNmZG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwMzQ5NTIsImV4cCI6MjA0ODYxMDk1Mn0.kvv3StNinuJc3pciUBOpFXyEScsxv-Kx9khDYHdCnDQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);