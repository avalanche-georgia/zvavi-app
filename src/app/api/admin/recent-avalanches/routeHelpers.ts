import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createClient } from '@/lib/supabase/server'

export type RecordRouteContext = { params: Promise<{ id: string }> }

const idSchema = z.coerce.number().int().positive()

type AuthorizedRecord =
  | { error: NextResponse; id?: never; supabase?: never }
  | { error?: never; id: number; supabase: Awaited<ReturnType<typeof createClient>> }

// Admin record routes: a signed-in user and a valid record id, or the error
// response to return. Queries then run as that user (RLS applies).
export const authorizeRecordRequest = async ({
  params,
}: RecordRouteContext): Promise<AuthorizedRecord> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: 'unauthorized', ok: false }, { status: 401 }) }
  }

  const parsedId = idSchema.safeParse((await params).id)

  if (!parsedId.success) {
    return { error: NextResponse.json({ error: 'invalid id', ok: false }, { status: 400 }) }
  }

  return { id: parsedId.data, supabase }
}
