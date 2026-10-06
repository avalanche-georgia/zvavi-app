import { NextResponse } from 'next/server'
import { z } from 'zod'

import { deletePhotos } from '../photoKeys'
import { pendingPhotoKeyPattern } from '../schema'

const deleteRequestSchema = z.object({ key: z.string().regex(pendingPhotoKeyPattern) })

// Called when a submitter removes an already-uploaded photo, so it doesn't sit
// in storage until the `pending/` lifecycle rule expires it. Only pending keys
// are accepted — a submitted observation's photos can never be deleted here,
// and pending keys are random UUIDs only their uploader knows.
export const DELETE = async (request: Request) => {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body', ok: false }, { status: 400 })
  }

  const parsed = deleteRequestSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid key', ok: false }, { status: 400 })
  }

  await deletePhotos([parsed.data.key])

  return NextResponse.json({ ok: true })
}
