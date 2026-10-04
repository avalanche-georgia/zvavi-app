'use client'

import { useFormFieldError } from '@ds/form'
import { ChipGroup, DateField, Field } from '@ds/primitives'
import { addDays, format, isSameDay, startOfDay } from 'date-fns'
import { useFormatter, useNow, useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'

import type { ForecastFormSchema } from '../schema'

const quickDays = ['1', '2', '3'] as const

// Date + time (default 18:00), with Tomorrow / In 2 days / In 3 days shortcuts
const ValidUntilField = () => {
  const t = useTranslations()
  const formatter = useFormatter()
  // Re-renders every minute so "in 22 hours" stays current
  const now = useNow({ updateInterval: 60_000 })
  const { field } = useController<ForecastFormSchema, 'validUntil'>({ name: 'validUntil' })
  const error = useFormFieldError<ForecastFormSchema>(
    'validUntil',
    t('admin.forecast.editor.general.validUntilRequired'),
  )
  const value = field.value
  const time = value ? format(value, 'HH:mm') : '18:00'
  const [hours, minutes] = time.split(':').map(Number)

  const selectedQuickDay =
    quickDays.find((days) => value && isSameDay(value, addDays(new Date(), Number(days)))) ?? null

  const handleQuickDay = (days: (typeof quickDays)[number] | null) => {
    if (!days) return

    const date = startOfDay(addDays(new Date(), Number(days)))

    date.setHours(hours, minutes)
    field.onChange(date)
  }

  return (
    <Field error={error} label={t('admin.forecast.form.general.labels.validUntil')} required>
      <DateField
        min={format(new Date(), 'yyyy-MM-dd')}
        onValueChange={field.onChange}
        required
        timeLabel={t('admin.forecast.editor.general.time')}
        value={value}
        withTime
      />
      <ChipGroup
        ariaLabel={t('admin.forecast.editor.general.quickDates')}
        className="[&>*]:text-copy-sm [&>*]:h-8"
        onChange={handleQuickDay}
        options={quickDays.map((days) => ({
          label: t(`admin.forecast.editor.general.inDays.${days}`),
          value: days,
        }))}
        value={selectedQuickDay}
      />
      {value && (
        <p className="text-caption text-muted">
          {formatter.dateTime(value, { day: 'numeric', month: 'short', weekday: 'short' })} · {time}{' '}
          · {formatter.relativeTime(value, now)}
        </p>
      )}
    </Field>
  )
}

export default ValidUntilField
