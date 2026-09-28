import { createClient } from '@supabase/supabase-js'

import type { Database } from './database.types'

// Server-side client with no session: reads only what anyone may read (RLS
// applies as `anon`). Doesn't touch request cookies, so it can be used inside
// cached functions shared across requests.
export const createAnonymousClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
