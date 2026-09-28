import { photosNotFoundError, photosUnprocessableError } from '@/api/observations/schema'

// Photo-specific failures get messages that say which action fixes them;
// anything else falls back to the form's own generic error
const getPhotoSubmitErrorKey = <TFallback extends string>(
  error: unknown,
  fallbackKey: TFallback,
) => {
  const message = error instanceof Error ? error.message : undefined

  if (message === photosNotFoundError) return 'observations.form.photos.errors.notFound'
  if (message === photosUnprocessableError) return 'observations.form.photos.errors.unprocessable'

  return fallbackKey
}

export default getPhotoSubmitErrorKey
