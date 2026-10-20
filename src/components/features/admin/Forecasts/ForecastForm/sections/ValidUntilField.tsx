'use client'

import { useDatePickerText } from '@components/hooks'
import { useFormFieldError } from '@ds/form'
import { ChipGroup, DatePicker, Field } from '@ds/primitives'
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
  const {
    field: { onBlur, onChange, ref, value },
  } = useController<ForecastFormSchema, 'validUntil'>({ name: 'validUntil' })
  const { calendarLabel, locale, placeholder } = useDatePickerText()
  const error = useFormFieldError<ForecastFormSchema>(
    'validUntil',
    t('admin.forecast.editor.general.validUntilRequired'),
  )
  const time = value ? format(value, 'HH:mm') : '18:00'
  const [hours, minutes] = time.split(':').map(Number)

  const selectedQuickDay =
    quickDays.find((days) => value && isSameDay(value, addDays(new Date(), Number(days)))) ?? null

  const handleQuickDay = (days: (typeof quickDays)[number] | null) => {
    if (!days) return

    const date = startOfDay(addDays(new Date(), Number(days)))

    date.setHours(hours, minutes)
    onChange(date)
  }

  return (
    <Field error={error} label={t('admin.forecast.form.general.labels.validUntil')} required>
      <DatePicker
        ref={ref}
        calendarLabel={calendarLabel}
        locale={locale}
        min={format(new Date(), 'yyyy-MM-dd')}
        onBlur={onBlur}
        onValueChange={onChange}
        placeholder={placeholder}
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
