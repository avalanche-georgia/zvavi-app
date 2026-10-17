import { useCallback, useState } from 'react'
import { roundCoordinate } from '@data/helpers'
import { useFormFieldError } from '@ds/form'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import type { WeatherStationFormValues } from '../schema'

// The station's latitude/longitude form fields, set from the map (tap, drag,
// My location) or typed in — typed ones also pan the map there
const useStationCoordinates = () => {
  const t = useTranslations()
  const form = useFormContext<WeatherStationFormValues>()
  const [latitude, longitude] = useWatch({ control: form.control, name: ['latitude', 'longitude'] })
  const [panTarget, setPanTarget] = useState<[number, number] | null>(null)

  const requiredMessage = t('admin.weatherStations.form.location.required')
  const latitudeError = useFormFieldError<WeatherStationFormValues>('latitude', requiredMessage)
  const longitudeError = useFormFieldError<WeatherStationFormValues>('longitude', requiredMessage)

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

  return {
    error: latitudeError ?? longitudeError,
    handleCoordinatesChange,
    handleLocationPick,
    latitude,
    longitude,
    panTarget,
  }
}

export default useStationCoordinates
