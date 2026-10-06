import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createClient } from '@/lib/supabase/server'

export type RecordRouteContext = { params: Promise<{ id: string }> }

const idSchema = z.coerce.number().int().positive()

type ServerClient = Awaited<ReturnType<typeof createClient>>

type Authorized =
  | { error: NextResponse; supabase?: never; userId?: never }
  | { error?: never; supabase: ServerClient; userId: string }

type AuthorizedRecord =
  | { error: NextResponse; id?: never; supabase?: never; userId?: never }
  | { error?: never; id: number; supabase: ServerClient; userId: string }

// Admin routes: a signed-in user, or the error response to return. Queries then
// run as that user (RLS applies).
export const authorizeRequest = async (): Promise<Authorized> => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: 'unauthorized', ok: false }, { status: 401 }) }
  }

  return { supabase, userId: user.id }
}

// Admin record routes: as above, plus a valid record id
export const authorizeRecordRequest = async ({
  params,
}: RecordRouteContext): Promise<AuthorizedRecord> => {
  const { error, supabase, userId } = await authorizeRequest()

  if (error) return { error }

  const parsedId = idSchema.safeParse((await params).id)

  if (!parsedId.success) {
    return { error: NextResponse.json({ error: 'invalid id', ok: false }, { status: 400 }) }
  }

  return { id: parsedId.data, supabase, userId }
}

// Parsed JSON body, or null when it isn't valid JSON
export const readJsonBody = async (request: Request): Promise<unknown> => {
  try {
    return await request.json()
  } catch {
    return null
  }
}
