import type { Locale } from 'date-fns'
import { enUS, ka } from 'date-fns/locale'

const localeMap: Record<string, Locale> = { en: enUS, ka }

export const getDateFnsLocale = (locale: string): Locale => localeMap[locale] ?? enUS
