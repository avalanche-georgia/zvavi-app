'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { useRegionContext } from '@domain/context/RegionContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import useObservationSubmitFormSubmit from './hooks/useObservationSubmitFormSubmit'
import useSubmitAfterPhotoUploads from './hooks/useSubmitAfterPhotoUploads'

import getInitialFormData from './getInitialFormData'
import HoneypotField from './HoneypotField'
import ObservationKindTabs from './ObservationKindTabs'
import type { ObservationSubmitFormData, ObservationSubmitFormSchema } from './schema'
import { observationSubmitSchema } from './schema'
import AboutYouSection from './sections/AboutYouSection'
import AspectsSection from './sections/AspectsSection'
import DescriptionSection from './sections/DescriptionSection'
import LocationSection from './sections/LocationSection'
import PhotosSection from './sections/PhotosSection'
import WhatSection from './sections/WhatSection'
import WhenSection from './sections/WhenSection'
import SubmitBar from './SubmitBar'
import SubmitFinePrint from './SubmitFinePrint'

const ObservationSubmitForm = ({ onSubmitted }: { onSubmitted: () => void }) => {
  const { region } = useRegionContext()

  const form = useForm<ObservationSubmitFormSchema, unknown, ObservationSubmitFormData>({
    defaultValues: getInitialFormData(),
    resolver: zodResolver(observationSubmitSchema),
    // Focus + scroll on error is handled by useScrollToFirstError
    shouldFocusError: false,
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit } = useObservationSubmitFormSubmit({
    onSuccess: onSubmitted,
    regionId: region!.id,
  })
  const { formRef, handleFormSubmit, isWaitingForPhotos } = useSubmitAfterPhotoUploads({
    form,
    onValid: handleSubmit,
  })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form ref={formRef} className="flex flex-col gap-3" noValidate onSubmit={handleFormSubmit}>
        <HoneypotField />
        <ObservationKindTabs />
        <WhenSection />
        <LocationSection />
        <WhatSection />
        <AspectsSection />
        <PhotosSection />
        <DescriptionSection />
        <AboutYouSection />
        <SubmitBar isWaitingForPhotos={isWaitingForPhotos} />
        <SubmitFinePrint />
      </form>
    </FormProvider>
  )
}

export default ObservationSubmitForm
