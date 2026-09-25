'use client'

import { useCallback, useState } from 'react'
import { useBoolean } from '@components/hooks'
import { roundCoordinate } from '@data/helpers'
import { useRegionContext } from '@domain/context/RegionContext'
import { useFormFieldError } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import CoordinateInputs from './CoordinateInputs'
import CoordinatesRow from './CoordinatesRow'
import LocationMap from './LocationMap'
import type { ObservationSubmitFormSchema } from '../../schema'

const LocationSection = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const [latitude, longitude] = useWatch({ control: form.control, name: ['latitude', 'longitude'] })
  const [isExpanded, { toggle: toggleExpanded }] = useBoolean(false)
  const [isEditingCoordinates, setIsEditingCoordinates] = useState(false)

  const requiredMessage = t('observations.submit.location.required')
  const latitudeError = useFormFieldError<ObservationSubmitFormSchema>('latitude', requiredMessage)
  const longitudeError = useFormFieldError<ObservationSubmitFormSchema>(
    'longitude',
    requiredMessage,
  )
  const error = latitudeError ?? longitudeError

  // Re-validates only after a submit attempt, so the error clears as soon as a
  // pin is dropped — but doesn't show before the first attempt
  const handleCoordinateChange = useCallback(
    (lat: number | null, lng: number | null) => {
      const options = { shouldDirty: true, shouldValidate: form.formState.isSubmitted }

      form.setValue('latitude', lat, options)
      form.setValue('longitude', lng, options)
    },
    [form],
  )

  const handlePick = useCallback(
    (lat: number, lng: number) =>
      handleCoordinateChange(roundCoordinate(lat), roundCoordinate(lng)),
    [handleCoordinateChange],
  )

  const handleEditingToggle = () => setIsEditingCoordinates((isEditing) => !isEditing)

  return (
    <FormCard isInvalid={!!error} required title={t('observations.submit.sections.where')}>
      <div className="flex flex-col gap-3">
        <LocationMap
          isExpanded={isExpanded}
          latitude={latitude}
          longitude={longitude}
          onExpandedToggle={toggleExpanded}
          onPick={handlePick}
          region={region!}
          regionName={t(`regions.names.${region!.id}`)}
        />
        <CoordinatesRow
          isEditing={isEditingCoordinates}
          latitude={latitude}
          longitude={longitude}
          onEditingToggle={handleEditingToggle}
        />
        {isEditingCoordinates && (
          <CoordinateInputs
            latitude={latitude}
            longitude={longitude}
            onChange={handleCoordinateChange}
          />
        )}
      </div>
      {error && (
        <p className="text-copy-sm text-danger" data-field-error>
          {error}
        </p>
      )}
    </FormCard>
  )
}

export default LocationSection
