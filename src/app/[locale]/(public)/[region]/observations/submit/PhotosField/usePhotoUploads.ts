import { useCallback, useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import preparePhoto from './preparePhoto'
import uploadPhoto from './uploadPhoto'
import type { ObservationSubmitFormSchema, PhotoUpload } from '../schema'

const createPhotoId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

// Photo state lives in the form's `photos` field (so the schema can block
// submit until every upload finishes), while in-flight requests are tracked
// here so a removed photo's upload is actually cancelled.
const usePhotoUploads = ({
  onPhotoUnreadable,
}: {
  onPhotoUnreadable: (fileName: string) => void
}) => {
  // Only the stable methods — the context object itself is a new reference on
  // every form render (FormProvider is fed a spread), which would otherwise
  // re-run the unmount cleanup below and kill in-flight uploads.
  const { control, getFieldState, getValues, setValue } =
    useFormContext<ObservationSubmitFormSchema>()
  const photos = useWatch({ control, name: 'photos' })
  const abortControllers = useRef(new Map<string, AbortController>())

  const setPhotos = useCallback(
    (update: (current: PhotoUpload[]) => PhotoUpload[]) =>
      setValue('photos', update(getValues('photos')), {
        shouldDirty: true,
        // Re-check only once an error is showing (e.g. after a submit attempt),
        // so it clears as soon as uploads finish — never pre-emptively.
        shouldValidate: getFieldState('photos').invalid,
      }),
    [getFieldState, getValues, setValue],
  )

  const updatePhoto = useCallback(
    (id: string, patch: Partial<PhotoUpload>) =>
      setPhotos((current) =>
        current.map((photo) => (photo.id === id ? { ...photo, ...patch } : photo)),
      ),
    [setPhotos],
  )

  const removePhoto = useCallback(
    (id: string) => {
      abortControllers.current.get(id)?.abort()

      setPhotos((current) => {
        const removed = current.find((photo) => photo.id === id)

        if (removed) URL.revokeObjectURL(removed.previewUrl)

        return current.filter((photo) => photo.id !== id)
      })
    },
    [setPhotos],
  )

  const startUpload = useCallback(
    async ({ file, id }: PhotoUpload) => {
      const controller = new AbortController()

      abortControllers.current.set(id, controller)
      updatePhoto(id, { progress: 0, status: 'preparing' })

      try {
        let blob: Blob

        try {
          blob = await preparePhoto(file)
        } catch {
          // Not a network hiccup — retrying can't help, so drop the tile
          // and tell the submitter instead of offering a dead-end Retry.
          removePhoto(id)
          onPhotoUnreadable(file.name)

          return
        }

        if (controller.signal.aborted) return

        // Show the prepared JPEG from now on — the original may not be
        // displayable (HEIC outside Safari) and is much heavier to render.
        const previousPreviewUrl = getValues('photos').find((photo) => photo.id === id)?.previewUrl

        updatePhoto(id, { previewUrl: URL.createObjectURL(blob), status: 'uploading' })

        if (previousPreviewUrl) URL.revokeObjectURL(previousPreviewUrl)

        const key = await uploadPhoto(blob, {
          onProgress: (progress) => updatePhoto(id, { progress }),
          signal: controller.signal,
        })

        updatePhoto(id, { key, progress: 1, status: 'uploaded' })
      } catch (error) {
        if (controller.signal.aborted) return

        console.error('usePhotoUploads | startUpload', error)
        updatePhoto(id, { status: 'failed' })
      } finally {
        abortControllers.current.delete(id)
      }
    },
    [getValues, onPhotoUnreadable, removePhoto, updatePhoto],
  )

  const addPhotos = useCallback(
    (files: File[]) => {
      const newPhotos: PhotoUpload[] = files.map((file) => ({
        file,
        id: createPhotoId(),
        key: null,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: 'preparing',
      }))

      setPhotos((current) => [...current, ...newPhotos])
      newPhotos.forEach(startUpload)
    },
    [setPhotos, startUpload],
  )

  const retryPhoto = useCallback(
    (id: string) => {
      const photo = getValues('photos').find((item) => item.id === id)

      if (photo) startUpload(photo)
    },
    [getValues, startUpload],
  )

  useEffect(() => {
    const controllers = abortControllers.current

    return () => {
      controllers.forEach((controller) => controller.abort())
      getValues('photos')?.forEach((photo) => URL.revokeObjectURL(photo.previewUrl))
    }
  }, [getValues])

  return { addPhotos, photos, removePhoto, retryPhoto }
}

export default usePhotoUploads
