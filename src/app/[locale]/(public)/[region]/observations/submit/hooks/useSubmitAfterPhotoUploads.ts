import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import useScrollToFirstError from './useScrollToFirstError'
import type { ObservationSubmitFormData, ObservationSubmitFormSchema, PhotoUpload } from '../schema'

type ObservationForm = UseFormReturn<
  ObservationSubmitFormSchema,
  unknown,
  ObservationSubmitFormData
>

type UseSubmitAfterPhotoUploadsParams = {
  form: ObservationForm
  onValid: (formData: ObservationSubmitFormData) => Promise<void>
}

const isSettled = (photos: PhotoUpload[]) =>
  photos.every((photo) => photo.status === 'uploaded' || photo.status === 'failed')

// Pressing Submit while photos are still uploading shouldn't be a dead end: the
// rest of the form is validated right away, and if it's fine the submission is
// queued and goes out by itself the moment the last photo finishes.
const useSubmitAfterPhotoUploads = ({ form, onValid }: UseSubmitAfterPhotoUploadsParams) => {
  const [isWaitingForPhotos, setIsWaitingForPhotos] = useState(false)
  const { formRef, scrollToFirstError } = useScrollToFirstError()

  const waitForPhotoUploads = () =>
    new Promise<void>((resolve) => {
      if (isSettled(form.getValues('photos'))) {
        resolve()

        return
      }

      const subscription = form.watch(() => {
        if (!isSettled(form.getValues('photos'))) return

        subscription.unsubscribe()
        resolve()
      })
    })

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isWaitingForPhotos) return

    if (!isSettled(form.getValues('photos'))) {
      const otherFields = (
        Object.keys(form.getValues()) as (keyof ObservationSubmitFormSchema)[]
      ).filter((name) => name !== 'photos')
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

  return { formRef, handleFormSubmit, isWaitingForPhotos }
}

export default useSubmitAfterPhotoUploads
