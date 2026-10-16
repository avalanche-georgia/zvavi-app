'use client'

import { FormTextField } from '@ds/form'
import { Field, Select } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import useForecasterOptions, { otherForecasterValue } from './useForecasterOptions'
import type { ForecastFormSchema } from '../schema'

// A staff member (linked to their profile), or "Other person" with a typed name
const ForecasterField = () => {
  const t = useTranslations()
  const key = 'admin.forecast.editor.general'
  const { setValue } = useFormContext<ForecastFormSchema>()
  const [forecaster, forecasterId] = useWatch<ForecastFormSchema, ['forecaster', 'forecasterId']>({
    name: ['forecaster', 'forecasterId'],
  })
  const { getName, isLoading, options } = useForecasterOptions({ forecaster, forecasterId })
  const isOther = forecasterId === null

  const handleForecasterChange = (value: string) => {
    const isOtherPicked = value === otherForecasterValue
    const setOptions = { shouldDirty: true, shouldValidate: !isOtherPicked }

    // From a profile to "Other": start from an empty name, not the colleague's
    if (isOtherPicked && !isOther) setValue('forecaster', '', setOptions)
    if (!isOtherPicked) setValue('forecaster', getName(value), setOptions)
    setValue('forecasterId', isOtherPicked ? null : value, setOptions)
  }

  return (
    <div className="flex flex-col gap-3">
      <Field label={t('admin.forecast.form.general.labels.forecaster')} required>
        <Select
          disabled={isLoading}
          onValueChange={handleForecasterChange}
          options={options}
          value={isOther ? otherForecasterValue : forecasterId}
        />
      </Field>
      {isOther && (
        <FormTextField
          label={t(`${key}.forecasterName`)}
          name="forecaster"
          placeholder={t(`${key}.forecasterNamePlaceholder`)}
          required
          requiredMessage={t(`${key}.forecasterRequired`)}
        />
      )}
    </div>
  )
}

export default ForecasterField
