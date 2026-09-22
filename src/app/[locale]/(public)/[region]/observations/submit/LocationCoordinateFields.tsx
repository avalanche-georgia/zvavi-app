'use client'

import { InputBlock, TextInput } from '@components/ui'
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

  return (
    <div className="grid grid-cols-2 gap-3">
      <InputBlock label={t('observations.submit.labels.latitude')}>
        <TextInput
          onChange={(event) => onChange(parseCoordinate(event.target.value), longitude)}
          step="any"
          type="number"
          value={latitude ?? ''}
        />
      </InputBlock>

      <InputBlock label={t('observations.submit.labels.longitude')}>
        <TextInput
          onChange={(event) => onChange(latitude, parseCoordinate(event.target.value))}
          step="any"
          type="number"
          value={longitude ?? ''}
        />
      </InputBlock>
    </div>
  )
}

export default LocationCoordinateFields
