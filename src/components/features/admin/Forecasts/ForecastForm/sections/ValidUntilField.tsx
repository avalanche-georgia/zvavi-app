'use client'

import { useDatePickerText, useDateSummary } from '@components/hooks'
import { useFormFieldError } from '@ds/form'
import { QuickDateField } from '@ds/patterns'
import { addDays, isSameDay, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useController } from 'react-hook-form'

import type { ForecastFormSchema } from '../schema'

import {
  atTbilisiTime,
  formatTbilisi,
  getTbilisiToday,
  getTbilisiTodayIso,
  toTbilisiWallClock,
} from '@/lib/tbilisiTime'

const quickDays = ['1', '2', '3']
const defaultTime = '18:00'

// Date + time (default 18:00), with Tomorrow / In 2 days / In 3 days shortcuts
const ValidUntilField = () => {
  const t = useTranslations()
  const {
    field: { onBlur, onChange, ref, value },
  } = useController<ForecastFormSchema, 'validUntil'>({ name: 'validUntil' })
  const { calendarLabel, locale, placeholder } = useDatePickerText()
  const summary = useDateSummary(value, { withTime: true })
  const error = useFormFieldError<ForecastFormSchema>(
    'validUntil',
    t('admin.forecast.editor.general.validUntilRequired'),
  )

  // Days count in Georgia, like everything about a forecast
  const valueDay = value && startOfDay(toTbilisiWallClock(value))
  const selectedQuickDay =
    quickDays.find(
      (days) => valueDay && isSameDay(valueDay, addDays(getTbilisiToday(), Number(days))),
    ) ?? null

  // Keeps the time already set (or 18:00)
  const handleQuickDay = (days: string) => {
    const time = value ? formatTbilisi(value, 'HH:mm') : defaultTime

    onChange(atTbilisiTime(addDays(getTbilisiToday(), Number(days)), time))
  }

  return (
    <QuickDateField
      ref={ref}
      calendarLabel={calendarLabel}
      defaultTime={defaultTime}
      error={error}
      label={t('admin.forecast.form.general.labels.validUntil')}
      locale={locale}
      min={getTbilisiTodayIso()}
      onBlur={onBlur}
      onQuickDateChange={handleQuickDay}
      onValueChange={onChange}
      placeholder={placeholder}
      quickDates={quickDays.map((days) => ({
        label: t(`admin.forecast.editor.general.inDays.${days}`),
        value: days,
      }))}
      quickDatesLabel={t('admin.forecast.editor.general.quickDates')}
      required
      selectedQuickDate={selectedQuickDay}
      summary={summary}
      timeLabel={t('admin.forecast.editor.general.time')}
      value={value}
      withTime
    />
  )
}

export default ValidUntilField
