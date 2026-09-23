'use client'

import { InputBlock, TextInput } from '@components/ui'
import { roundCoordinate } from '@data/helpers'
import { useTranslations } from 'next-intl'

type LocationCoordinateFieldsProps = {
  latitude: number | null
  longitude: number | null
  onChange: (lat: number | null, lng: number | null) => void
}

const parseCoordinate = (value: string): number | null => {
  if (value.trim() === '') return null

  const parsed = Number(value)

  return Number.isNaN(parsed) ? null : parsed
}

const LocationCoordinateFields = ({
  latitude,
  longitude,
  onChange,
}: LocationCoordinateFieldsProps) => {
  const t = useTranslations()

  // Rounded on blur, not on every keystroke — rounding while the user is
  // still typing would fight their cursor and cut off digits mid-entry.
  const handleLatitudeBlur = () => {
    if (latitude !== null) onChange(roundCoordinate(latitude), longitude)
  }

  const handleLongitudeBlur = () => {
    if (longitude !== null) onChange(latitude, roundCoordinate(longitude))
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <InputBlock label={t('observations.submit.labels.latitude')}>
        <TextInput
          onBlur={handleLatitudeBlur}
          onChange={(event) => onChange(parseCoordinate(event.target.value), longitude)}
          placeholder={t('observations.submit.placeholders.latitude')}
          step="any"
          type="number"
          value={latitude ?? ''}
        />
      </InputBlock>

      <InputBlock label={t('observations.submit.labels.longitude')}>
        <TextInput
          onBlur={handleLongitudeBlur}
          onChange={(event) => onChange(latitude, parseCoordinate(event.target.value))}
          placeholder={t('observations.submit.placeholders.longitude')}
          step="any"
          type="number"
          value={longitude ?? ''}
        />
      </InputBlock>
    </div>
  )
}

export default LocationCoordinateFields
