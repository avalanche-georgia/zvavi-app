// One-off: creates the resized, metadata-free WebP variants (thumb, preview, large) for observation
// photos uploaded before variants were generated on submit. Safe to re-run —
// photos that already have every variant are skipped.
//
// Usage (targets whichever bucket R2_BUCKET_OBSERVATIONS points to):
//   node --env-file=.env.local scripts/backfill-photo-variants.mjs
//
// Keep sizes/suffixes in sync with src/lib/r2/photoVariants.ts.
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

const createVariants = async (key, missingVariants) => {
  const original = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  const originalBytes = await original.Body.transformToByteArray()

  for (const variant of missingVariants) {
    const { maxSize } = photoVariants[variant]
    const body = await sharp(originalBytes, { limitInputPixels: 50_000_000 })
      .rotate()
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

    if (missing.length === 0) continue

    try {
      await createVariants(key, missing)
      console.log(`✓ ${key} (${missing.join(', ')})`)
    } catch (error) {
      console.error(`✗ ${key}:`, error.message)
    }
  }

  console.log('Done')
}

main()
