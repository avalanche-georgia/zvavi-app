'use client'

import { useFieldError } from '@components/hooks'
import { InputBlock, Spinner } from '@components/ui'
import { roundCoordinate } from '@data/helpers'
import { useRegionContext } from '@domain/context/RegionContext'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import LocationCoordinateFields from './LocationCoordinateFields'
import type { ObservationSubmitFormSchema } from './schema'

const LocationMapFieldClient = dynamic(() => import('./LocationMapFieldClient'), {
  loading: () => (
    <div className="flex h-116 w-full items-center justify-center rounded-xl bg-gray-100">
      <Spinner />
    </div>
  ),
  ssr: false,
})

const LocationMapField = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const getFieldError = useFieldError<ObservationSubmitFormSchema>()
  const latitude = form.watch('latitude')
  const longitude = form.watch('longitude')

  // Re-validates only once the user has tried to submit, so the error clears as
  // soon as a pin is dropped — but doesn't show before the first attempt
  const handleCoordinateChange = (lat: number | null, lng: number | null) => {
    const options = { shouldDirty: true, shouldValidate: form.formState.isSubmitted }

    form.setValue('latitude', lat, options)
    form.setValue('longitude', lng, options)
  }

  const handlePick = (lat: number, lng: number) => {
    handleCoordinateChange(roundCoordinate(lat), roundCoordinate(lng))
  }

  return (
    <InputBlock
      error={getFieldError('latitude') ?? getFieldError('longitude')}
      hint={t('observations.submit.hints.location')}
      label={t('observations.submit.labels.location')}
      required
    >
      <div className="flex flex-col gap-3">
        <LocationMapFieldClient
          latitude={latitude}
          longitude={longitude}
          onChange={handlePick}
          region={region!}
        />
        <LocationCoordinateFields
          latitude={latitude}
          longitude={longitude}
          onChange={handleCoordinateChange}
        />
      </div>
    </InputBlock>
  )
}

export default LocationMapField
