'use client'

import { FormNumberField, FormTextField } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import LocationCard from './location/LocationCard'
import type { WeatherStationFormValues } from './schema'

const altitudeFormat: Intl.NumberFormatOptions = { useGrouping: false }

const FormFields = () => {
  const t = useTranslations()
  const labelKey = 'admin.weatherStations.form.labels'

  return (
    <>
      <FormCard title={t('admin.weatherStations.form.section')}>
        <div className="grid gap-4 @sm:grid-cols-2">
          <FormTextField<WeatherStationFormValues>
            label={t(`${labelKey}.nameEn`)}
            name="nameEn"
            required
          />
          <FormTextField<WeatherStationFormValues>
            hint={t('admin.weatherStations.form.optional')}
            label={t(`${labelKey}.nameKa`)}
            name="nameKa"
          />
        </div>
        <FormNumberField<WeatherStationFormValues>
          className="@sm:max-w-1/2"
          format={altitudeFormat}
          label={t(`${labelKey}.altitude`)}
          min={1}
          name="altitude"
          required
          unit={t('admin.weatherStations.form.altitudeUnit')}
        />
        <FormTextField<WeatherStationFormValues>
          description={t('admin.weatherStations.form.hints.url')}
          label={t(`${labelKey}.url`)}
          name="url"
          placeholder="https://"
          required
        />
      </FormCard>
      <LocationCard />
    </>
  )
}

export default FormFields
