import { GetObjectCommand, PutObjectCommand, type S3Client } from '@aws-sdk/client-s3'
import sharp from 'sharp'

import {
  createR2Client,
  getPhotoVariantKey,
  observationsBucket,
  type PhotoVariant,
  photoVariants,
} from '@/lib/r2'

const webpQuality = 78

// Uploads are untrusted — refuse to decode anything bigger than ~50 MP (a phone
// camera is 12–48 MP) so a decompression bomb can't exhaust memory
const limitInputPixels = 50_000_000

const createVariants = async (client: S3Client, key: string) => {
  const original = await client.send(new GetObjectCommand({ Bucket: observationsBucket, Key: key }))
  const originalBytes = await original.Body!.transformToByteArray()

  await Promise.all(
    (Object.keys(photoVariants) as PhotoVariant[]).map(async (variant) => {
      const { maxSize } = photoVariants[variant]

      // rotate() applies the EXIF orientation before metadata is dropped —
      // sharp strips EXIF (incl. GPS) from its output by default.
      const body = await sharp(originalBytes, { limitInputPixels })
        .rotate()
        .resize({ fit: 'inside', height: maxSize, width: maxSize, withoutEnlargement: true })
        .webp({ quality: webpQuality })
        .toBuffer()

      await client.send(
        new PutObjectCommand({
          Body: body,
          Bucket: observationsBucket,
          CacheControl: 'private, max-age=31536000, immutable',
          ContentType: 'image/webp',
          Key: getPhotoVariantKey(key, variant),
        }),
      )
    }),
  )
}

// Best effort, run after the response is sent — a missing variant only means
// clients fall back to the next larger image. Never throws.
const createPhotoVariants = async (keys: string[]): Promise<void> => {
  if (keys.length === 0) return

  const client = createR2Client()

  const results = await Promise.allSettled(keys.map((key) => createVariants(client, key)))

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`[createPhotoVariants] failed for ${keys[index]}:`, result.reason)
    }
  })
}

export default createPhotoVariants
