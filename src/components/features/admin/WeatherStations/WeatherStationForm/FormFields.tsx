'use client'

/* eslint-disable react/jsx-props-no-spreading */
import { InputBlock, TextInput } from '@components/ui'
import type { WeatherStationFormData } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

const FormFields = () => {
  const t = useTranslations()
  const {
    formState: { errors },
    register,
  } = useFormContext<WeatherStationFormData>()
  const getError = (field: keyof WeatherStationFormData) =>
    errors[field] ? t(`common.validation.${errors[field]?.message}`) : undefined

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <InputBlock
        error={getError('nameEn')}
        label={t('admin.weatherStations.form.labels.nameEn')}
        required
      >
        <TextInput {...register('nameEn')} hasError={!!errors.nameEn} />
      </InputBlock>

      <InputBlock error={getError('nameKa')} label={t('admin.weatherStations.form.labels.nameKa')}>
        <TextInput {...register('nameKa')} />
      </InputBlock>

      <InputBlock
        error={getError('altitude')}
        label={t('admin.weatherStations.form.labels.altitude')}
        required
      >
        <TextInput
          {...register('altitude', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })}
          hasError={!!errors.altitude}
          min={1}
          type="number"
        />
      </InputBlock>

      <InputBlock
        className="md:col-span-2"
        error={getError('url')}
        label={t('admin.weatherStations.form.labels.url')}
        required
      >
        <TextInput {...register('url')} hasError={!!errors.url} />
      </InputBlock>
    </div>
  )
}

export default FormFields
