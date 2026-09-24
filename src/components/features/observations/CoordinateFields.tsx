'use client'

import { useRef } from 'react'
import { InputBlock, TextInput } from '@components/ui'
import { roundCoordinate } from '@data/helpers'
import { useTranslations } from 'next-intl'

type CoordinateFieldsProps = {
  // Translated messages, shown under each field (admin form)
  errors?: { latitude?: string; longitude?: string }
  isRequired?: boolean
  latitude: number | null
  longitude: number | null
  onChange: (lat: number | null, lng: number | null) => void
}

const parseCoordinate = (value: string): number | null => {
  if (value.trim() === '') return null

  const parsed = Number(value)

  return Number.isNaN(parsed) ? null : parsed
}

// Latitude / longitude, shared by the public submit form and the admin form so
// both accept and store coordinates the same way (rounded to the same precision)
const CoordinateFields = ({
  errors,
  isRequired = false,
  latitude,
  longitude,
  onChange,
}: CoordinateFieldsProps) => {
  const t = useTranslations()
  // Only what the user typed gets rounded — merely tabbing through a stored
  // (possibly more precise) value must not change it
  const editedRef = useRef({ latitude: false, longitude: false })

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editedRef.current.latitude = true
    onChange(parseCoordinate(event.target.value), longitude)
  }

  const handleLongitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editedRef.current.longitude = true
    onChange(latitude, parseCoordinate(event.target.value))
  }

  // Rounded on blur, not on every keystroke — rounding while the user is
  // still typing would fight their cursor and cut off digits mid-entry.
  const handleLatitudeBlur = () => {
    if (!editedRef.current.latitude || latitude === null) return

    editedRef.current.latitude = false
    onChange(roundCoordinate(latitude), longitude)
  }

  const handleLongitudeBlur = () => {
    if (!editedRef.current.longitude || longitude === null) return

    editedRef.current.longitude = false
    onChange(latitude, roundCoordinate(longitude))
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <InputBlock
        error={errors?.latitude}
        label={t('observations.submit.labels.latitude')}
        required={isRequired}
      >
        <TextInput
          hasError={!!errors?.latitude}
          onBlur={handleLatitudeBlur}
          onChange={handleLatitudeChange}
          placeholder={t('observations.submit.placeholders.latitude')}
          step="any"
          type="number"
          value={latitude ?? ''}
        />
      </InputBlock>

      <InputBlock
        error={errors?.longitude}
        label={t('observations.submit.labels.longitude')}
        required={isRequired}
      >
        <TextInput
          hasError={!!errors?.longitude}
          onBlur={handleLongitudeBlur}
          onChange={handleLongitudeChange}
          placeholder={t('observations.submit.placeholders.longitude')}
          step="any"
          type="number"
          value={longitude ?? ''}
        />
      </InputBlock>
    </div>
  )
}

export default CoordinateFields
