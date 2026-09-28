'use client'

import { useState } from 'react'
import { useIsClient } from '@components/hooks'
import { useFormFieldError } from '@ds/form'
import { FormCard } from '@ds/patterns'
import { ChipGroup, FieldGroup, TextField } from '@ds/primitives'
import { format, isToday, isYesterday, parse, startOfToday, startOfYesterday } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import { useFormContext, useWatch } from 'react-hook-form'

import type { ObservationFormFields } from '../schema'

import { getDateFnsLocale } from '@/lib/dateFnsLocale'

type DateChoice = 'pick' | 'today' | 'unknown' | 'yesterday'

const dateChoices: DateChoice[] = ['today', 'yesterday', 'pick', 'unknown']
const inputDateFormat = 'yyyy-MM-dd'

// Which chip matches the value the form opens with — an existing record's older
// date opens on "Pick a date" showing it, not on "Today"
const getInitialChoice = (date: Date | null, isDateUnknown: boolean): DateChoice => {
  if (isDateUnknown) return 'unknown'
  if (date && isToday(date)) return 'today'
  if (date && isYesterday(date)) return 'yesterday'

  return 'pick'
}

const WhenSection = () => {
  const t = useTranslations()
  const locale = useLocale()
  const form = useFormContext<ObservationFormFields>()
  // "Today" depends on the device's timezone — the server may be on another day
  const isClient = useIsClient()
  const [date, isDateUnknown] = useWatch({ control: form.control, name: ['date', 'isDateUnknown'] })
  const [choice, setChoice] = useState<DateChoice>(() => getInitialChoice(date, isDateUnknown))
  const error = useFormFieldError<ObservationFormFields>(
    'date',
    t('observations.form.date.pickRequired'),
  )

  const setDate = (nextDate: Date | null, isUnknown: boolean) => {
    const options = { shouldDirty: true, shouldValidate: form.formState.isSubmitted }

    form.setValue('date', nextDate, options)
    form.setValue('isDateUnknown', isUnknown, options)
  }

  const handleChoiceChange = (nextChoice: DateChoice | null) => {
    if (!nextChoice) return

    setChoice(nextChoice)
    if (nextChoice === 'today') setDate(startOfToday(), false)
    if (nextChoice === 'yesterday') setDate(startOfYesterday(), false)
    if (nextChoice === 'pick') setDate(date, false)
    if (nextChoice === 'unknown') setDate(null, true)
  }

  const handleDateInputChange = (value: string) =>
    setDate(value ? parse(value, inputDateFormat, new Date()) : null, false)

  const hint =
    choice === 'unknown'
      ? t('observations.form.date.unknownHint')
      : isClient && date && format(date, 'EEE, d MMMM', { locale: getDateFnsLocale(locale) })

  return (
    <FormCard title={t('observations.form.sections.when')}>
      <FieldGroup
        description={hint}
        error={error}
        isLabelHidden
        label={t('observations.form.date.label')}
      >
        <ChipGroup
          onChange={handleChoiceChange}
          options={dateChoices.map((value) => ({
            label: t(`observations.form.date.${value}`),
            value,
          }))}
          value={choice}
        />
        {choice === 'pick' && (
          <TextField
            aria-label={t('observations.form.date.label')}
            className="max-w-60"
            max={format(new Date(), inputDateFormat)}
            onValueChange={handleDateInputChange}
            type="date"
            value={date ? format(date, inputDateFormat) : ''}
          />
        )}
      </FieldGroup>
    </FormCard>
  )
}

export default WhenSection
