'use client'

import { useUnsavedChangesWarning } from '@components/hooks'
import { Button } from '@components/ui'
import { useRegionContext } from '@domain/context/RegionContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import useObservationSubmitFormSubmit from './hooks/useObservationSubmitFormSubmit'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import { type ObservationSubmitFormSchema, observationSubmitSchema } from './schema'

const ObservationSubmitForm = () => {
  const t = useTranslations()
  const { region } = useRegionContext()

  const form = useForm<ObservationSubmitFormSchema>({
    defaultValues: getInitialFormData(),
    resolver: zodResolver(observationSubmitSchema),
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const { handleSubmit } = useObservationSubmitFormSubmit({ regionId: region!.id })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-6 rounded-lg bg-white p-4 shadow-sm md:p-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormFields />

        <Button disabled={form.formState.isSubmitting} type="submit">
          {t('observations.submit.submit')}
        </Button>
      </form>
    </FormProvider>
  )
}

export default ObservationSubmitForm
