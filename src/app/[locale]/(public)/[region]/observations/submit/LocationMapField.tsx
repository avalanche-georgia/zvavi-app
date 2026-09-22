'use client'

import { InputBlock, Spinner } from '@components/ui'
import { useRegionContext } from '@domain/context/RegionContext'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import LocationCoordinateFields from './LocationCoordinateFields'
import type { ObservationSubmitFormSchema } from './schema'

const LocationMapFieldClient = dynamic(() => import('./LocationMapFieldClient'), {
  loading: () => (
    <div className="flex h-[28.8rem] w-full items-center justify-center rounded-xl bg-gray-100">
      <Spinner />
    </div>
  ),
  ssr: false,
})

const LocationMapField = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const latitude = form.watch('latitude')
  const longitude = form.watch('longitude')

  const handlePick = (lat: number, lng: number) => {
    form.setValue('latitude', lat, { shouldDirty: true })
    form.setValue('longitude', lng, { shouldDirty: true })
  }

  const handleCoordinateChange = (lat: number | null, lng: number | null) => {
    form.setValue('latitude', lat, { shouldDirty: true })
    form.setValue('longitude', lng, { shouldDirty: true })
  }

  return (
    <InputBlock
      hint={t('observations.submit.hints.location')}
      label={t('observations.submit.labels.location')}
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
