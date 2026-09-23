import { observationPhotoContentTypes, observationPhotoLimits } from '@domain/constants'

import { convertHeicToJpeg, copyGpsFromHeic, isHeicFile } from './heicPhoto'

export type PhotoRejectionReason = 'tooLarge' | 'unsupported'

// Limit on the picked original, not on what's uploaded (compressed to ≤2 MB).
// Covers every default phone camera mode incl. 48 MP shots (~5–15 MB), while
// rejecting files big enough to risk crashing a mobile tab while decoding.
export const maxSourceSizeMb = 20
const maxSourceSizeBytes = maxSourceSizeMb * 1024 * 1024

const compressionOptions = {
  fileType: 'image/jpeg',
  initialQuality: 0.85,
  maxSizeMB: 2,
  maxWidthOrHeight: 2048,
  // Keeps GPS/camera EXIF of JPEG sources (orientation excluded — pixels are
  // already rotated). Mobile OSes may strip GPS before the browser sees it.
  preserveExif: true,
  useWebWorker: true,
}

const isAllowedContentType = (type: string) =>
  (observationPhotoContentTypes as readonly string[]).includes(type)

// Checked before anything is queued, so the submitter gets immediate feedback
// instead of a tile that fails a few seconds later.
export const getPhotoRejectionReason = (file: File): PhotoRejectionReason | null => {
  if (!file.type.startsWith('image/') && !isHeicFile(file)) return 'unsupported'
  if (file.size > maxSourceSizeBytes) return 'tooLarge'

  return null
}

const compressPhoto = async (source: File): Promise<Blob> => {
  const { default: imageCompression } = await import('browser-image-compression')

  return imageCompression(source, compressionOptions)
}

// Always ends up as a JPEG — HEIC is never stored, since most browsers
// (incl. the admin's) couldn't display it later.
const prepareHeic = async (file: File): Promise<Blob> => {
  // Native decode first (Safari) — only fetch libheif when that fails
  const jpeg = await compressPhoto(file).catch(async () =>
    compressPhoto(await convertHeicToJpeg(file)),
  )

  return copyGpsFromHeic(file, jpeg)
}

// Re-encodes to a ≤2 MB JPEG. If a JPEG/PNG can't be re-encoded (e.g. too
// big for the device's canvas), the original is uploaded as long as the
// server would accept it.
const preparePhoto = async (file: File): Promise<Blob> => {
  if (isHeicFile(file)) return prepareHeic(file)

  try {
    return await compressPhoto(file)
  } catch (error) {
    if (isAllowedContentType(file.type) && file.size <= observationPhotoLimits.maxSizeBytes) {
      return file
    }

    throw error
  }
}

export default preparePhoto
