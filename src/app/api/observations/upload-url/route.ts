import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { observationPhotoContentTypes, observationPhotoLimits } from '@domain/constants'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { createPendingPhotoKey } from '../photoKeys'

import { createR2Client, observationsBucket } from '@/lib/r2'

const uploadUrlExpirySeconds = 5 * 60

const uploadUrlRequestSchema = z.object({
  contentType: z.enum(observationPhotoContentTypes),
  size: z.number().int().positive().max(observationPhotoLimits.maxSizeBytes),
})

// Issues a presigned PUT URL so the browser uploads straight to R2 — photos are
// never proxied through this server. Content-Type and Content-Length are part
// of the signature, so the upload must match exactly what was validated here.
export const POST = async (request: Request) => {
  let rawBody: unknown

  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON body', ok: false }, { status: 400 })
  }

  const parsed = uploadUrlRequestSchema.safeParse(rawBody)

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid photo', ok: false }, { status: 400 })
  }

  const { contentType, size } = parsed.data
  const key = createPendingPhotoKey(contentType)

  try {
    const uploadUrl = await getSignedUrl(
      createR2Client(),
      new PutObjectCommand({
        Bucket: observationsBucket,
        ContentLength: size,
        ContentType: contentType,
        Key: key,
      }),
      { expiresIn: uploadUrlExpirySeconds, signableHeaders: new Set(['content-type']) },
    )

    return NextResponse.json({ key, ok: true, uploadUrl })
  } catch (error) {
    console.error('[POST /api/observations/upload-url] presign failed:', error)

    return NextResponse.json({ error: 'failed to create upload URL', ok: false }, { status: 500 })
  }
}
