'use client'

import { useDatePickerText, useDateSummary } from '@components/hooks'
import { useFormFieldError } from '@ds/form'
import { FormCard, QuickDateField } from '@ds/patterns'
import { TimeField } from '@ds/primitives'
import { isSameDay, subDays } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import type { ObservationFormFields } from '../schema'
import toObservationDate from '../toObservationDate'

import { getTbilisiToday, getTbilisiTodayIso } from '@/lib/tbilisiTime'

type QuickDate = 'today' | 'unknown' | 'yesterday'

const quickDates: QuickDate[] = ['today', 'yesterday', 'unknown']

// The shortcut matching the form's value; an older date matches none. Today and
// yesterday are Georgia's days.
const getQuickDate = (date: Date | null, isDateUnknown: boolean): QuickDate | null => {
  const today = getTbilisiToday()

  if (isDateUnknown) return 'unknown'
  if (date && isSameDay(date, today)) return 'today'
  if (date && isSameDay(date, subDays(today, 1))) return 'yesterday'

  return null
}

// When the avalanche happened: a date (past only) and an optional time, with
// Today / Yesterday / Not sure — the same field as a forecast's "valid until"
const WhenSection = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationFormFields>()
  const [date, isDateUnknown, time] = useWatch({
    control: form.control,
    name: ['date', 'isDateUnknown', 'time'],
  })
  const { calendarLabel, locale, placeholder } = useDatePickerText()
  const summary = useDateSummary(date && time ? toObservationDate(date, time) : date, {
    withTime: !!time,
  })
  const error = useFormFieldError<ObservationFormFields>(
    'date',
    t('observations.form.date.pickRequired'),
  )

  const options = { shouldDirty: true, shouldValidate: form.formState.isSubmitted }

  const setDate = (nextDate: Date | null, isUnknown: boolean) => {
    form.setValue('date', nextDate, options)
    form.setValue('isDateUnknown', isUnknown, options)
    // No day, no time
    if (isUnknown) form.setValue('time', null, options)
  }

  const handleTimeChange = (nextTime: string | null) => form.setValue('time', nextTime, options)

  const handleQuickDate = (quickDate: string) => {
    if (quickDate === 'today') setDate(getTbilisiToday(), false)
    if (quickDate === 'yesterday') setDate(subDays(getTbilisiToday(), 1), false)
    if (quickDate === 'unknown') setDate(null, true)
  }

  const handleDatePick = (nextDate: Date | null) => setDate(nextDate, false)

  return (
    <FormCard title={t('observations.form.sections.when')}>
      <QuickDateField
        calendarLabel={calendarLabel}
        error={error}
        isLabelHidden
        label={t('observations.form.date.label')}
        locale={locale}
        max={getTbilisiTodayIso()}
        onQuickDateChange={handleQuickDate}
        onValueChange={handleDatePick}
        placeholder={isDateUnknown ? t('observations.form.date.unknown') : placeholder}
        quickDates={quickDates.map((value) => ({
          label: t(`observations.form.date.${value}`),
          value,
        }))}
        quickDatesLabel={t('observations.form.date.quickDates')}
        selectedQuickDate={getQuickDate(date, isDateUnknown)}
        summary={isDateUnknown ? t('observations.form.date.unknownHint') : summary}
        time={
          <TimeField
            ariaLabel={t('observations.form.date.timeLabel')}
            disabled={!date}
            onValueChange={handleTimeChange}
            placeholder={t('observations.form.date.time')}
            value={time}
          />
        }
        value={date}
      />
    </FormCard>
  )
}

export default WhenSection
