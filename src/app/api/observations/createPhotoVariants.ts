import { GetObjectCommand, PutObjectCommand, type S3Client } from '@aws-sdk/client-s3'

import { loadImage } from './imageProcessing'

import {
  createR2Client,
  getPhotoVariantKey,
  observationsBucket,
  type PhotoVariant,
  photoVariants,
} from '@/lib/r2'

const webpQuality = 78

const createVariants = async (client: S3Client, key: string) => {
  const original = await client.send(new GetObjectCommand({ Bucket: observationsBucket, Key: key }))
  const originalBytes = await original.Body!.transformToByteArray()

  await Promise.all(
    (Object.keys(photoVariants) as PhotoVariant[]).map(async (variant) => {
      const { maxSize } = photoVariants[variant]

      const body = await loadImage(originalBytes)
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
