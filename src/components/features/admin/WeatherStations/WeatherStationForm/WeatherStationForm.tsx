'use client'

import { useToast } from '@components/hooks'
import { Button } from '@components/ui'
import { useWeatherStationCreate, useWeatherStationUpdate } from '@data/hooks/weatherStations'
import type { WeatherStation } from '@domain/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { FormProvider, useForm } from 'react-hook-form'

import FormFields from './FormFields'
import getInitialFormData from './getInitialFormData'
import type { WeatherStationFormSchema } from './schema'
import { weatherStationFormSchema } from './schema'

type WeatherStationFormProps = {
  onClose: VoidFunction
  station: WeatherStation | null
}

const WeatherStationForm = ({ onClose, station }: WeatherStationFormProps) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createStation } = useWeatherStationCreate()
  const { mutateAsync: updateStation } = useWeatherStationUpdate()

  const form = useForm<WeatherStationFormSchema>({
    defaultValues: getInitialFormData(station),
    resolver: zodResolver(weatherStationFormSchema),
  })

  const handleSubmit = async (fields: WeatherStationFormSchema) => {
    try {
      if (station) {
        await updateStation({ ...fields, id: station.id })
        toastSuccess(t('admin.weatherStations.form.messages.updated'))
      } else {
        await createStation(fields)
        toastSuccess(t('admin.weatherStations.form.messages.created'))
      }

      onClose()
    } catch (error) {
      toastError('WeatherStationForm | handleSubmit', { error })
    }
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="p-4 md:p-6">
          <FormFields />
        </div>

        <footer className="flex h-16 items-center justify-end gap-4 border-t px-4 md:px-6">
          <Button onClick={onClose} type="button" variant="secondary">
            {t('common.actions.cancel')}
          </Button>
          <Button type="submit">{t('common.actions.submit')}</Button>
        </footer>
      </form>
    </FormProvider>
  )
}

export default WeatherStationForm
