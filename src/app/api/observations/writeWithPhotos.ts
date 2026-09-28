import { after, NextResponse } from 'next/server'

import createPhotoVariants from './createPhotoVariants'
import { deletePhotos, PhotoProcessingError, promotePhotos, verifyPhotosExist } from './photoKeys'
import { photosNotFoundError, photosUnprocessableError } from './schema'

// Any supabase-js response
type WriteResponse = { error: { message: string } | null }

type WriteWithPhotosParams<TResponse extends WriteResponse> = {
  // Returned (500) when anything but the photos themselves fails
  failureMessage: string
  logLabel: string
  // New uploads, still under `pending/`
  pendingKeys: string[]
  // The DB write, given the new photos' permanent keys
  write: (promotedKeys: string[]) => PromiseLike<TResponse>
}

type WriteWithPhotosResult<TResponse extends WriteResponse> =
  // The write's own response, narrowed to its success shape
  | { ok: true; promotedKeys: string[]; written: Extract<TResponse, { error: null }> }
  | { ok: false; response: NextResponse }

const failure = (error: string, status: number) => ({
  ok: false as const,
  response: NextResponse.json({ error, ok: false }, { status }),
})

// Every path that saves new photos with a record (public submit, admin
// create/edit) runs the same sequence: check the uploads exist → copy them to
// permanent keys → write the record → clean up. A failed write removes the
// copies and keeps the pending uploads, so the same keys can be retried.
// Resized variants are generated after the response is sent.
const writeWithPhotos = async <TResponse extends WriteResponse>({
  failureMessage,
  logLabel,
  pendingKeys,
  write,
}: WriteWithPhotosParams<TResponse>): Promise<WriteWithPhotosResult<TResponse>> => {
  if (!(await verifyPhotosExist(pendingKeys))) return failure(photosNotFoundError, 400)

  let promotedKeys: string[]

  try {
    promotedKeys = await promotePhotos(pendingKeys)
  } catch (error) {
    console.error(`[${logLabel}] promotePhotos failed:`, error)

    if (error instanceof PhotoProcessingError) return failure(photosUnprocessableError, 400)

    return failure(failureMessage, 500)
  }

  const written = await write(promotedKeys)

  if (written.error) {
    console.error(`[${logLabel}] write failed:`, written.error.message)
    await deletePhotos(promotedKeys)

    return failure(failureMessage, 500)
  }

  await deletePhotos(pendingKeys)
  after(() => createPhotoVariants(promotedKeys))

  return { ok: true, promotedKeys, written: written as Extract<TResponse, { error: null }> }
}

export default writeWithPhotos
