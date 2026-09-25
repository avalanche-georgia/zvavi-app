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
  const [panTarget, setPanTarget] = useState<[number, number] | null>(null)

  const requiredMessage = t('observations.submit.location.required')
  const latitudeError = useFormFieldError<ObservationSubmitFormSchema>('latitude', requiredMessage)
  const longitudeError = useFormFieldError<ObservationSubmitFormSchema>(
    'longitude',
    requiredMessage,
  )
  const error = latitudeError ?? longitudeError

  // Re-validates only after a submit attempt, so the error clears as soon as a
  // pin is dropped — but doesn't show before the first attempt
  const setCoordinates = useCallback(
    (nextLatitude: number | null, nextLongitude: number | null) => {
      const options = { shouldDirty: true, shouldValidate: form.formState.isSubmitted }

      form.setValue('latitude', nextLatitude, options)
      form.setValue('longitude', nextLongitude, options)
    },
    [form],
  )

  const handleLocationPick = useCallback(
    (pickedLatitude: number, pickedLongitude: number) =>
      setCoordinates(roundCoordinate(pickedLatitude), roundCoordinate(pickedLongitude)),
    [setCoordinates],
  )

  const handleCoordinatesChange = (typedLatitude: number | null, typedLongitude: number | null) => {
    setCoordinates(typedLatitude, typedLongitude)
    setPanTarget(
      typedLatitude != null && typedLongitude != null ? [typedLatitude, typedLongitude] : null,
    )
  }

  const handleEditingToggle = () => setIsEditingCoordinates((isEditing) => !isEditing)

  return (
    <FormCard
      error={error}
      required
      requiredText={t('common.validation.required')}
      title={t('observations.submit.sections.where')}
    >
      <div className="flex flex-col gap-3">
        <LocationMap
          isExpanded={isExpanded}
          latitude={latitude}
          longitude={longitude}
          onExpandedToggle={toggleExpanded}
          onLocationPick={handleLocationPick}
          panTarget={panTarget}
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
            onCoordinatesChange={handleCoordinatesChange}
          />
        )}
      </div>
    </FormCard>
  )
}

export default LocationSection
