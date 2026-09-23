import { HeadObjectCommand } from '@aws-sdk/client-s3'
import { observationPhotoLimits } from '@domain/constants'
import { format } from 'date-fns'

import { createR2Client, observationsBucket } from '@/lib/r2'

const extensionsByContentType = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
} as const

export type ObservationPhotoContentType = keyof typeof extensionsByContentType

// Keys are namespaced by month + a random UUID — see photoKeyPattern in ./schema.
export const createPhotoKey = (contentType: ObservationPhotoContentType): string =>
  `observations/${format(new Date(), 'yyyy-MM')}/${crypto.randomUUID()}.${extensionsByContentType[contentType]}`

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
