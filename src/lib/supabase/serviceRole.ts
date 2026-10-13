import { createClient } from '@supabase/supabase-js'

import type { Database } from './database.types'

import 'server-only'

// Service-role key bypasses RLS entirely — server only (API routes and server
// fetch functions), never reachable from client code.
export const createServiceRoleClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
