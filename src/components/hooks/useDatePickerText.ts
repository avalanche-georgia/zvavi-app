'use client'

import { useTranslations } from 'next-intl'

import useDayPickerLocale from './useDayPickerLocale'

// The translated strings and locale a ds DatePicker takes as props (ds components
// don't translate). Callers pass the ones they use: `todayLabel` for a "Today"
// shortcut, `clearLabel` for a × on an optional date.
const useDatePickerText = () => {
  const t = useTranslations()
  const locale = useDayPickerLocale()

  return {
    calendarLabel: t('common.datePicker.calendar'),
    clearLabel: t('common.datePicker.clear'),
    locale,
    placeholder: t('common.datePicker.placeholder'),
    todayLabel: t('common.datePicker.today'),
  }
}

export default useDatePickerText
