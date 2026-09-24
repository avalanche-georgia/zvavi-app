'use client'

import { useFieldError } from '@components/hooks'
import { Checkbox, DatePicker, InputBlock } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const today = new Date()

const DateField = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const getFieldError = useFieldError<ObservationSubmitFormSchema>()
  const isDateUnknown = form.watch('isDateUnknown')

  return (
    <InputBlock error={getFieldError('date')} label={t('observations.submit.labels.date')}>
      <div className="flex items-center gap-3">
        <Controller
          control={form.control}
          name="date"
          render={({ field }) => (
            <DatePicker
              className="h-9 w-42"
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
              label={t('observations.submit.labels.dateUnknown')}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </InputBlock>
  )
}

export default DateField
