import { NextResponse } from 'next/server'
import { z } from 'zod'

import { requireStaff, type ServerClient } from '@/lib/auth/requireStaff'

export type RecordRouteContext = { params: Promise<{ id: string }> }

const idSchema = z.coerce.number().int().positive()

type AuthorizedRecord =
  | { error: NextResponse; id?: never; supabase?: never; userId?: never }
  | { error?: never; id: number; supabase: ServerClient; userId: string }

// Admin routes: staff only (see requireStaff)
export const authorizeRequest = requireStaff

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
