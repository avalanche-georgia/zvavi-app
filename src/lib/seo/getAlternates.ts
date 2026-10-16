import type { Metadata } from 'next'
import { defaultLocale, locales } from 'src/i18n/config'

import { baseUrl } from '@/routes'

// Self canonical + hreflang for a localized page. `path` is the route without the
// locale ("/gudauri/forecasts/current"). Pages reached through a redirect (`/`)
// must never be the canonical.
const getAlternates = (locale: string, path: string): Metadata['alternates'] => {
  const toUrl = (pageLocale: string) => `${baseUrl}/${pageLocale}${path}`

  return {
    canonical: toUrl(locale),
    languages: {
      ...Object.fromEntries(locales.map((pageLocale) => [pageLocale, toUrl(pageLocale)])),
      'x-default': toUrl(defaultLocale),
    },
  }
}

export default getAlternates
