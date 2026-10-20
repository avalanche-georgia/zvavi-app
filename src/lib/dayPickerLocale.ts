import type { Locale } from 'react-day-picker'
import { enUS, ka } from 'react-day-picker/locale'

// react-day-picker's locales carry date-fns data plus translated aria labels
const localeMap: Record<string, Locale> = { en: enUS, ka }

export const getDayPickerLocale = (locale: string): Locale => localeMap[locale] ?? enUS
