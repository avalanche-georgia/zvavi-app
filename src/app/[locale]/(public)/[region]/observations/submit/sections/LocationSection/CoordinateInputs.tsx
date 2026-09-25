import { avalancheFieldLimits } from '@domain/constants'
import { Field, NumberField } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type CoordinateInputsProps = {
  latitude: number | null
  longitude: number | null
  onChange: (lat: number | null, lng: number | null) => void
}

const coordinateFormat: Intl.NumberFormatOptions = { maximumFractionDigits: 6, useGrouping: false }

const CoordinateInputs = ({ latitude, longitude, onChange }: CoordinateInputsProps) => {
  const t = useTranslations()

  const handleLatitudeChange = (value: number | null) => onChange(value, longitude)
  const handleLongitudeChange = (value: number | null) => onChange(latitude, value)

  return (
    <div className="grid grid-cols-2 gap-2.5">
      <Field label={t('observations.submit.labels.latitude')}>
        <NumberField
          format={coordinateFormat}
          max={avalancheFieldLimits.latitude.max}
          min={avalancheFieldLimits.latitude.min}
          onValueChange={handleLatitudeChange}
          placeholder={t('observations.submit.placeholders.latitude')}
          value={latitude}
        />
      </Field>
      <Field label={t('observations.submit.labels.longitude')}>
        <NumberField
          format={coordinateFormat}
          max={avalancheFieldLimits.longitude.max}
          min={avalancheFieldLimits.longitude.min}
          onValueChange={handleLongitudeChange}
          placeholder={t('observations.submit.placeholders.longitude')}
          value={longitude}
        />
      </Field>
    </div>
  )
}

export default CoordinateInputs
