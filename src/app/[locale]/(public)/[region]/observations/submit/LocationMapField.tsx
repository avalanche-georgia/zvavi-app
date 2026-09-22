'use client'

import { InputBlock, Spinner } from '@components/ui'
import { useRegionContext } from '@domain/context/RegionContext'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const LocationMapFieldClient = dynamic(() => import('./LocationMapFieldClient'), {
  loading: () => (
    <div className="flex h-80 w-full items-center justify-center rounded-xl bg-gray-100">
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

  return (
    <InputBlock label={t('observations.submit.labels.location')}>
      <LocationMapFieldClient
        latitude={latitude}
        longitude={longitude}
        onChange={handlePick}
        region={region!}
      />
    </InputBlock>
  )
}

export default LocationMapField
