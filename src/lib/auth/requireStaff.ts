import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase/server'

export type ServerClient = Awaited<ReturnType<typeof createClient>>

export type StaffAuthorization =
  | { error: NextResponse; supabase?: never; userId?: never }
  | { error?: never; supabase: ServerClient; userId: string }

// Admin and notify routes: a signed-in admin or forecaster, or the error
// response to return. "Signed in" alone never means "team". Queries then run
// as that user (RLS applies).
export const requireStaff = async (): Promise<StaffAuthorization> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: 'unauthorized', ok: false }, { status: 401 }) }
  }

  const { data: isStaff, error } = await supabase.rpc('is_staff')

  if (error || !isStaff) {
    return { error: NextResponse.json({ error: 'forbidden', ok: false }, { status: 403 }) }
  }

  return { supabase, userId: user.id }
}
