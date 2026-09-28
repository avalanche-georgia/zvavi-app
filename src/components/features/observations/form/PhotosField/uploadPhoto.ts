type UploadPhotoOptions = {
  onProgress: (progress: number) => void
  signal: AbortSignal
}

type UploadUrlResponse = { key: string; uploadUrl: string }

const requestUploadUrl = async (blob: Blob, signal: AbortSignal): Promise<UploadUrlResponse> => {
  const response = await fetch('/api/observations/upload-url', {
    body: JSON.stringify({ contentType: blob.type, size: blob.size }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    signal,
  })

  const result = await response.json()

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to get upload URL')

  return { key: result.key, uploadUrl: result.uploadUrl }
}

// XHR rather than fetch — fetch still has no upload progress events.
const putWithProgress = (
  uploadUrl: string,
  blob: Blob,
  { onProgress, signal }: UploadPhotoOptions,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open('PUT', uploadUrl)
    request.setRequestHeader('Content-Type', blob.type)

    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(event.loaded / event.total)
    }

    request.onload = () =>
      request.status < 300 ? resolve() : reject(new Error(`upload failed: ${request.status}`))
    request.onerror = () => reject(new Error('upload failed: network error'))
    request.onabort = () => reject(new DOMException('upload aborted', 'AbortError'))

    signal.addEventListener('abort', () => request.abort(), { once: true })
    request.send(blob)
  })

// Fire-and-forget: a removed photo is dropped from storage right away instead
// of waiting for the pending-upload lifecycle rule. Failures are harmless —
// that rule still expires it.
export const discardUploadedPhoto = (key: string) => {
  fetch('/api/observations/pending-photos', {
    body: JSON.stringify({ key }),
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    method: 'DELETE',
  }).catch((error) => console.error('discardUploadedPhoto', error))
}

// Uploads straight to R2 through a short-lived presigned URL and returns the
// object key — the only thing the observation itself stores.
const uploadPhoto = async (blob: Blob, options: UploadPhotoOptions): Promise<string> => {
  const { key, uploadUrl } = await requestUploadUrl(blob, options.signal)

  await putWithProgress(uploadUrl, blob, options)

  return key
}

export default uploadPhoto
