import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  type S3Client,
} from '@aws-sdk/client-s3'
import { observationPhotoLimits } from '@domain/constants'
import { format } from 'date-fns'

import { stripMetadata } from './imageProcessing'
import { pendingPhotoKeyPrefix } from './schema'

import { createR2Client, getPhotoVariantKey, observationsBucket, photoVariants } from '@/lib/r2'

const extensionsByContentType = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
} as const

export type ObservationPhotoContentType = keyof typeof extensionsByContentType

// Uploads land under `pending/` — an R2 lifecycle rule expires that prefix
// after a day, so photos from abandoned forms clean themselves up. Only a
// successful submission promotes them to their permanent key.
export const createPendingPhotoKey = (contentType: ObservationPhotoContentType): string =>
  `${pendingPhotoKeyPrefix}${crypto.randomUUID()}.${extensionsByContentType[contentType]}`

const toPermanentKey = (pendingKey: string): string =>
  `observations/${format(new Date(), 'yyyy-MM')}/${pendingKey.slice(pendingPhotoKeyPrefix.length)}`

// A submitter could send any pattern-matching key without uploading anything —
// confirm every object really exists (and is within the size cap) before the
// keys are persisted.
export const verifyPhotosExist = async (photoKeys: string[]): Promise<boolean> => {
  if (photoKeys.length === 0) return true

  const client = createR2Client()

  try {
    const heads = await Promise.all(
      photoKeys.map((key) =>
        client.send(new HeadObjectCommand({ Bucket: observationsBucket, Key: key })),
      ),
    )

    return heads.every((head) => (head.ContentLength ?? 0) <= observationPhotoLimits.maxSizeBytes)
  } catch (error) {
    console.error('[verifyPhotosExist] HeadObject failed:', error)

    return false
  }
}

const deleteObjects = (client: S3Client, keys: string[]) =>
  Promise.all(
    keys.map((key) =>
      client.send(new DeleteObjectCommand({ Bucket: observationsBucket, Key: key })),
    ),
  )

// Best effort — whatever isn't deleted here is still removed by the lifecycle
// rule (pending keys) or is harmless to retry.
export const deletePhotos = async (keys: string[]): Promise<void> => {
  if (keys.length === 0) return

  try {
    await deleteObjects(createR2Client(), keys)
  } catch (error) {
    console.error('[deletePhotos] DeleteObject failed:', error)
  }
}

// A stored photo is its original plus every resized variant
export const deleteStoredPhotos = (keys: string[]): Promise<void> =>
  deletePhotos(
    keys.flatMap((key) => [
      key,
      ...Object.keys(photoVariants).map((variant) =>
        getPhotoVariantKey(key, variant as keyof typeof photoVariants),
      ),
    ]),
  )

// The photo itself is the problem (not storage) — see photosUnprocessableError
export class PhotoProcessingError extends Error {
  constructor(key: string, cause: unknown) {
    super(`failed to process ${key}`, { cause })
  }
}

const contentTypesByExtension: Record<string, ObservationPhotoContentType> = {
  jpg: 'image/jpeg',
  png: 'image/png',
}

// Stored photos never carry metadata: the client re-encode usually strips it
// already, but a raw original can still arrive (fallback upload, direct API
// call), so every photo is re-written without it on the way to its permanent key
const promotePhoto = async (client: S3Client, pendingKey: string, permanentKey: string) => {
  const pending = await client.send(
    new GetObjectCommand({ Bucket: observationsBucket, Key: pendingKey }),
  )
  const contentType = contentTypesByExtension[pendingKey.split('.').pop() ?? ''] ?? 'image/jpeg'
  const bytes = await pending.Body!.transformToByteArray()
  let body: Buffer

  try {
    body = await stripMetadata(bytes, contentType)
  } catch (error) {
    throw new PhotoProcessingError(pendingKey, error)
  }

  await client.send(
    new PutObjectCommand({
      Body: body,
      Bucket: observationsBucket,
      ContentType: contentType,
      Key: permanentKey,
    }),
  )
}

// Writes metadata-free copies of pending uploads to their permanent keys.
// Pending objects are left in place — the caller deletes them once the
// observation is saved, so a failed save can be retried with the same keys.
export const promotePhotos = async (pendingKeys: string[]): Promise<string[]> => {
  const client = createR2Client()
  const permanentKeys = pendingKeys.map(toPermanentKey)

  // allSettled, not all: every write must have finished before cleaning up, or
  // a write still in flight would outlive the delete and leave an orphan
  const results = await Promise.allSettled(
    pendingKeys.map((pendingKey, index) => promotePhoto(client, pendingKey, permanentKeys[index])),
  )
  const failure = results.find((result) => result.status === 'rejected')

  if (failure) {
    await deletePhotos(permanentKeys)
    throw failure.reason
  }

  return permanentKeys
}
