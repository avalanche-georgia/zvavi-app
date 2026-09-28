import { useRef, useState } from 'react'
import type { FieldPath, UseFormReturn } from 'react-hook-form'

import useScrollToFirstError from './useScrollToFirstError'
import type { ObservationFormFields, PhotoUpload } from '../schema'

type UseSubmitAfterPhotoUploadsParams<TFieldValues extends ObservationFormFields, TFormData> = {
  form: UseFormReturn<TFieldValues, unknown, TFormData>
  onValid: (formData: TFormData) => Promise<void>
}

const photosField = 'photos' as FieldPath<ObservationFormFields>

const isSettled = (photos: PhotoUpload[]) =>
  photos.every((photo) => photo.status === 'uploaded' || photo.status === 'failed')

// Pressing Submit while photos are still uploading shouldn't be a dead end: the
// rest of the form is validated right away, and if it's fine the submission is
// queued and goes out by itself the moment the last photo finishes.
const useSubmitAfterPhotoUploads = <TFieldValues extends ObservationFormFields, TFormData>({
  form,
  onValid,
}: UseSubmitAfterPhotoUploadsParams<TFieldValues, TFormData>) => {
  const getPhotos = () => form.getValues(photosField as FieldPath<TFieldValues>) as PhotoUpload[]

  const [isWaitingForPhotos, setIsWaitingForPhotos] = useState(false)
  // Set synchronously, unlike state: a double tap during the awaits below must
  // not queue a second submission (a duplicate observation)
  const isHandlingSubmitRef = useRef(false)
  const { formRef, scrollToFirstError } = useScrollToFirstError()

  const waitForPhotoUploads = () =>
    new Promise<void>((resolve) => {
      if (isSettled(getPhotos())) {
        resolve()

        return
      }

      const subscription = form.watch(() => {
        if (!isSettled(getPhotos())) return

        subscription.unsubscribe()
        resolve()
      })
    })

  const submitWhenPhotosSettle = async () => {
    if (!isSettled(getPhotos())) {
      const otherFields = (Object.keys(form.getValues()) as FieldPath<TFieldValues>[]).filter(
        (name) => name !== photosField,
      )
      const areOtherFieldsValid = await form.trigger(otherFields)

      if (!areOtherFieldsValid) {
        scrollToFirstError()

        return
      }

      setIsWaitingForPhotos(true)
      await waitForPhotoUploads()
      setIsWaitingForPhotos(false)
    }

    await form.handleSubmit(onValid, scrollToFirstError)()
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isHandlingSubmitRef.current) return

    isHandlingSubmitRef.current = true

    try {
      await submitWhenPhotosSettle()
    } finally {
      isHandlingSubmitRef.current = false
    }
  }

  return { formRef, handleFormSubmit, isWaitingForPhotos }
}

export default useSubmitAfterPhotoUploads
