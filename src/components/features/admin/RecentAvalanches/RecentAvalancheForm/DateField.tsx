'use client'

import { InputBlock } from '@components/features/admin/Forecasts/ForecastForm/common'
import { useFieldError } from '@components/hooks'
import { Checkbox, DatePicker } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const today = new Date()

// A date, or "Date unknown" ticked — one of the two is required
const DateField = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const getFieldError = useFieldError<AvalancheFormSchema>()
  const isDateUnknown = form.watch('isDateUnknown')

  return (
    <InputBlock error={getFieldError('date')} label={t('common.labels.date')} labelClassName="w-32">
      <Controller
        control={form.control}
        name="date"
        render={({ field }) => (
          <DatePicker
            className="h-8 w-42"
            disabled={isDateUnknown}
            hasError={!!form.formState.errors.date}
            maxDate={today}
            onChange={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        control={form.control}
        name="isDateUnknown"
        render={({ field }) => (
          <Checkbox
            isChecked={field.value}
            label={t('admin.recentAvalanches.form.labels.isDateUnknown')}
            onChange={field.onChange}
          />
        )}
      />
    </InputBlock>
  )
}

export default DateField
