'use client'

import { useLocale } from 'next-intl'

import { getDayPickerLocale } from '@/lib/dayPickerLocale'

// The `locale` a ds Calendar / DatePicker needs, for the page's language
const useDayPickerLocale = () => getDayPickerLocale(useLocale())

export default useDayPickerLocale
