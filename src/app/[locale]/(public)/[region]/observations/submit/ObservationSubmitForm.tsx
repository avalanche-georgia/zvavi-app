'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { useRegionContext } from '@domain/context/RegionContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import useObservationSubmitFormSubmit from './hooks/useObservationSubmitFormSubmit'
import useSubmitAfterPhotoUploads from './hooks/useSubmitAfterPhotoUploads'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import type { ObservationSubmitFormData, ObservationSubmitFormSchema } from './schema'
import { observationSubmitSchema } from './schema'
import SubmitButton from './SubmitButton'

const ObservationSubmitForm = () => {
  const { region } = useRegionContext()

  const form = useForm<ObservationSubmitFormSchema, unknown, ObservationSubmitFormData>({
    defaultValues: getInitialFormData(),
    resolver: zodResolver(observationSubmitSchema),
    // Focus + scroll on error is handled by useScrollToFirstError
    shouldFocusError: false,
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit } = useObservationSubmitFormSubmit({ regionId: region!.id })
  const { formRef, handleFormSubmit, isWaitingForPhotos } = useSubmitAfterPhotoUploads({
    form,
    onValid: handleSubmit,
  })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        ref={formRef}
        className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-sm md:p-6"
        onSubmit={handleFormSubmit}
      >
        <FormFields />

        <SubmitButton isWaitingForPhotos={isWaitingForPhotos} />
      </form>
    </FormProvider>
  )
}

export default ObservationSubmitForm
