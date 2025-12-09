import { notFound } from 'next/navigation'
import type { AbstractIntlMessages } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { type Locale, locales } from './config'
import { routing } from './routing'

// Whitelist of the message file imports to prevent path traversal
const messageFiles = {
  en: () => import('../../messages/en.json'),
  ka: () => import('../../messages/ka.json'),
} as const

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  if (!locales.includes(locale as Locale)) return notFound()

  try {
    const messages = (await messageFiles[locale as Locale]())
      .default as unknown as AbstractIntlMessages

    return {
      locale,
      messages,
      timeZone: 'Asia/Tbilisi',
    }
  } catch {
    return notFound()
  }
})
