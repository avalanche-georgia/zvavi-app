'use client'

import { useDatePickerText, useDateSummary } from '@components/hooks'
import { useFormFieldError } from '@ds/form'
import { FormCard, QuickDateField } from '@ds/patterns'
import { format, isToday, isYesterday, startOfToday, startOfYesterday } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import type { ObservationFormFields } from '../schema'

type QuickDate = 'today' | 'unknown' | 'yesterday'

const quickDates: QuickDate[] = ['today', 'yesterday', 'unknown']

// The shortcut matching the form's value; an older date matches none
const getQuickDate = (date: Date | null, isDateUnknown: boolean): QuickDate | null => {
  if (isDateUnknown) return 'unknown'
  if (date && isToday(date)) return 'today'
  if (date && isYesterday(date)) return 'yesterday'

  return null
}

// When the avalanche happened: a date (past only) with Today / Yesterday / Not sure,
// the same field as a forecast's "valid until"
const WhenSection = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationFormFields>()
  const [date, isDateUnknown] = useWatch({ control: form.control, name: ['date', 'isDateUnknown'] })
  const { calendarLabel, locale, placeholder } = useDatePickerText()
  const summary = useDateSummary(date)
  const error = useFormFieldError<ObservationFormFields>(
    'date',
    t('observations.form.date.pickRequired'),
  )

  const setDate = (nextDate: Date | null, isUnknown: boolean) => {
    const options = { shouldDirty: true, shouldValidate: form.formState.isSubmitted }

    form.setValue('date', nextDate, options)
    form.setValue('isDateUnknown', isUnknown, options)
  }

  const handleQuickDate = (quickDate: string) => {
    if (quickDate === 'today') setDate(startOfToday(), false)
    if (quickDate === 'yesterday') setDate(startOfYesterday(), false)
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
        max={format(new Date(), 'yyyy-MM-dd')}
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
        value={date}
      />
    </FormCard>
  )
}

export default WhenSection
