import { createClient } from '@supabase/supabase-js'

import type { Database } from './database.types'

// Service-role key bypasses RLS entirely — never expose to the client, never
// import this outside API routes that need to call service_role-only RPCs.
export const createServiceRoleClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
