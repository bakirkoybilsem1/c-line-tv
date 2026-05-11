import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://ppbmdnnnlleoptdinzsn.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Supabase URL:', supabaseUrl)
