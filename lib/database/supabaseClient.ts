import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl,supabaseKey)

export const dbName = process.env.NEXT_PUBLIC_DB_NAME!
export const storagePdfs = process.env.NEXT_PUBLIC_DB_STORAGE_PDFS!
export const storageImgs = process.env.NEXT_PUBLIC_DB_STORAGE_IMAGES!