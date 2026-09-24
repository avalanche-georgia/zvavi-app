import { GetObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { PhotoUrls } from '@domain/types'

import { createR2Client, observationsBucket } from './client'
import { getPhotoVariantKey } from './photoVariants'

const hourMs = 60 * 60 * 1000

// Signed for two hours from the start of the current hour: every request within
// the same hour gets byte-identical URLs, so browsers can reuse cached images
// instead of re-downloading them whenever the list is refetched. Each URL stays
// valid for at least an hour after it's issued.
const signedUrlExpirySeconds = 2 * 60 * 60

const signKey = (client: S3Client, key: string, signingDate: Date) =>
  getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: observationsBucket,
      Key: key,
      ResponseCacheControl: 'private, max-age=3600',
    }),
    { expiresIn: signedUrlExpirySeconds, signingDate },
  )

// Server-only. Signs the metadata-stripped variants only — never the original,
// which still carries the submitter's EXIF (incl. GPS). Signing is a local
// computation (no request to R2), so it's cheap for a whole list. Variants are
// generated right after submit, so for a few seconds they may not exist yet.
//
// Takes the keys of many photos at once so one client serves a whole response.
const signPhotoUrls = async (keys: string[]): Promise<Map<string, PhotoUrls>> => {
  if (keys.length === 0) return new Map()

  const client = createR2Client()
  const signingDate = new Date(Math.floor(Date.now() / hourMs) * hourMs)

  const entries = await Promise.all(
    keys.map(async (key): Promise<[string, PhotoUrls]> => {
      const [largeUrl, previewUrl, thumbUrl] = await Promise.all([
        signKey(client, getPhotoVariantKey(key, 'large'), signingDate),
        signKey(client, getPhotoVariantKey(key, 'preview'), signingDate),
        signKey(client, getPhotoVariantKey(key, 'thumb'), signingDate),
      ])

      return [key, { id: key.slice(key.lastIndexOf('/') + 1), largeUrl, previewUrl, thumbUrl }]
    }),
  )

  return new Map(entries)
}

export default signPhotoUrls
