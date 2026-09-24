// One-off for observation photos stored before submit started processing them:
//   1. strips metadata (EXIF incl. GPS, XMP) from originals that still have it
//   2. creates missing resized WebP variants (thumb, preview, large)
// Safe to re-run — clean originals and existing variants are skipped.
//
// Usage (targets whichever bucket R2_BUCKET_OBSERVATIONS points to):
//   node --env-file=.env.local scripts/backfill-observation-photos.mjs
//
// Keep in sync with src/lib/r2/photoVariants.ts and
// src/app/api/observations/imageProcessing.ts.
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import sharp from 'sharp'

const photoVariants = {
  large: { maxSize: 2048, suffix: '_large.webp' },
  preview: { maxSize: 1280, suffix: '_preview.webp' },
  thumb: { maxSize: 320, suffix: '_thumb.webp' },
}

const bucket = process.env.R2_BUCKET_OBSERVATIONS
const prefix = 'observations/'

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'auto',
})

const variantKey = (key, variant) => key.replace(/\.[^./]+$/, '') + photoVariants[variant].suffix
const isVariant = (key) => Object.values(photoVariants).some(({ suffix }) => key.endsWith(suffix))

const listAllKeys = async () => {
  const keys = []
  let continuationToken

  do {
    const page = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: continuationToken, Prefix: prefix }),
    )

    keys.push(...(page.Contents ?? []).map((object) => object.Key))
    continuationToken = page.NextContinuationToken
  } while (continuationToken)

  return keys
}

const loadImage = (bytes) => sharp(bytes, { limitInputPixels: 50_000_000 }).rotate()

const stripMetadata = async (key, bytes) => {
  const { exif, format, icc, xmp } = await sharp(bytes).metadata()

  if (!exif && !xmp && !icc) return false

  const isPng = format === 'png'
  const image = loadImage(bytes)
  const body = await (isPng ? image.png() : image.jpeg({ mozjpeg: true, quality: 90 })).toBuffer()

  await client.send(
    new PutObjectCommand({
      Body: body,
      Bucket: bucket,
      ContentType: isPng ? 'image/png' : 'image/jpeg',
      Key: key,
    }),
  )

  return true
}

const createVariants = async (originalBytes, key, missingVariants) => {
  for (const variant of missingVariants) {
    const { maxSize } = photoVariants[variant]
    const body = await loadImage(originalBytes)
      .resize({ fit: 'inside', height: maxSize, width: maxSize, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer()

    await client.send(
      new PutObjectCommand({
        Body: body,
        Bucket: bucket,
        CacheControl: 'private, max-age=31536000, immutable',
        ContentType: 'image/webp',
        Key: variantKey(key, variant),
      }),
    )
  }
}

const main = async () => {
  if (!bucket) throw new Error('R2_BUCKET_OBSERVATIONS is not set')

  const keys = await listAllKeys()
  const existing = new Set(keys)
  const originals = keys.filter((key) => !isVariant(key))

  console.log(`Bucket ${bucket}: ${originals.length} photos`)

  for (const key of originals) {
    const missing = Object.keys(photoVariants).filter((variant) => !existing.has(variantKey(key, variant)))

    try {
      const original = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
      const originalBytes = await original.Body.transformToByteArray()
      const done = []

      if (await stripMetadata(key, originalBytes)) done.push('metadata stripped')
      if (missing.length > 0) {
        await createVariants(originalBytes, key, missing)
        done.push(...missing)
      }

      if (done.length > 0) console.log(`✓ ${key} (${done.join(', ')})`)
    } catch (error) {
      console.error(`✗ ${key}:`, error.message)
    }
  }

  console.log('Done')
}

main()
