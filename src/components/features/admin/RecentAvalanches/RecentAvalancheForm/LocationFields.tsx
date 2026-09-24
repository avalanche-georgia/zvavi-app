'use client'

import { CoordinateFields } from '@components/features/observations'
import { useFieldError } from '@components/hooks'
import { InputBlock, TextInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const LocationFields = ({ isLocationRequired }: { isLocationRequired: boolean }) => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const getFieldError = useFieldError<AvalancheFormSchema>()
  const [latitude, longitude] = form.watch(['latitude', 'longitude'])

  // Blur re-sends the (rounded) value — only a real change dirties the form
  const setCoordinate = (name: 'latitude' | 'longitude', value: number | null) => {
    if (form.getValues(name) === value) return

    form.setValue(name, value, { shouldDirty: true, shouldValidate: form.formState.isSubmitted })
  }

  const handleCoordinatesChange = (lat: number | null, lng: number | null) => {
    setCoordinate('latitude', lat)
    setCoordinate('longitude', lng)
  }

  return (
    <div className="flex flex-col gap-3">
      <InputBlock
        error={getFieldError('location')}
        label={t('admin.recentAvalanches.form.labels.location')}
      >
        <Controller
          control={form.control}
          name="location"
          render={({ field }) => <TextInput onChange={field.onChange} value={field.value ?? ''} />}
        />
      </InputBlock>

      {/* Same inputs as the public submit form — same precision and parsing */}
      <CoordinateFields
        errors={{ latitude: getFieldError('latitude'), longitude: getFieldError('longitude') }}
        isRequired={isLocationRequired}
        latitude={latitude ?? null}
        longitude={longitude ?? null}
        onChange={handleCoordinatesChange}
      />
    </div>
  )
}

export default LocationFields
