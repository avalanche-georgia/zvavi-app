'use client'

import { useReportFormState } from '@components/features/admin/shared'
import { useUnsavedChangesWarning } from '@components/hooks'
import type { WeatherStation } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import {
  type WeatherStationFormSchema,
  weatherStationFormSchema,
  type WeatherStationFormValues,
} from './schema'
import useWeatherStationFormSubmit from './useWeatherStationFormSubmit'

type WeatherStationFormProps = {
  // The host sheet renders Cancel / Save itself and submits the form by this id
  formId: string
  onDirtyChange: (isDirty: boolean) => void
  onSubmittingChange: (isSubmitting: boolean) => void
  onSuccess: VoidFunction
  // undefined when adding a station
  station?: WeatherStation
}

const WeatherStationForm = ({
  formId,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
  station,
}: WeatherStationFormProps) => {
  const form = useForm<WeatherStationFormValues, unknown, WeatherStationFormSchema>({
    defaultValues: getInitialFormData(station ?? null),
    resolver: zodResolver(weatherStationFormSchema),
  })
  const { isDirty, isSubmitting } = form.formState

  useUnsavedChangesWarning(isDirty)
  useReportFormState({ isDirty, isSubmitting }, { onDirtyChange, onSubmittingChange })

  const { handleSubmit } = useWeatherStationFormSubmit({ onSuccess, stationId: station?.id })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form
        className="bg-canvas @container flex min-h-full flex-col gap-3 p-3 md:p-4"
        id={formId}
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormFields />
      </form>
    </FormProvider>
  )
}

export default WeatherStationForm
