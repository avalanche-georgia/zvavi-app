'use client'

import { useTranslations } from 'next-intl'

import useDayPickerLocale from './useDayPickerLocale'

// The translated strings and locale a ds DateRangePicker takes as props (ds
// components don't translate). Callers add their own placeholder and presets.
const useDateRangePickerText = () => {
  const t = useTranslations()
  const locale = useDayPickerLocale()

  return {
    calendarLabel: t('common.dateRangePicker.calendar'),
    clearLabel: t('common.dateRangePicker.clear'),
    doneLabel: t('common.dateRangePicker.done'),
    fromLabel: t('common.words.from'),
    locale,
    presetsLabel: t('common.dateRangePicker.presets'),
    toLabel: t('common.words.to'),
  }
}

export default useDateRangePickerText
