import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { defaultLocale, type Locale, locales } from 'src/i18n/config'

import getAlternates from './getAlternates'

import { baseUrl } from '@/routes'

export const siteName = 'Avalanche Georgia'

// A page's own `openGraph` hides the root opengraph-image, so it is named again here
const siteImage = '/opengraph-image'
// Both the site image and a forecast's /api/og are this size; scrapers lay a preview out sooner
// when they know it
const imageSize = { height: 630, width: 1200 }

// Open Graph wants language_TERRITORY
const ogLocales: Record<Locale, string> = { en: 'en_US', ka: 'ka_GE' }

export const toOgLocale = (locale: string) =>
  ogLocales[hasLocale(locales, locale) ? locale : defaultLocale]

type PageMetadataOptions = {
  description: string
  // An Open Graph image of the page's own; the site-wide one otherwise
  image?: string
  locale: string
  // The route without the locale ("/gudauri/forecasts/current")
  path: string
  title: string
}

// Title, description, canonical + hreflang and the link preview of a localized page.
// A page's `openGraph` replaces the layout's whole, so it is built here in full.
const getPageMetadata = ({
  description,
  image = siteImage,
  locale,
  path,
  title,
}: PageMetadataOptions): Metadata => ({
  alternates: getAlternates(locale, path),
  description,
  openGraph: {
    alternateLocale: locales
      .filter((pageLocale) => pageLocale !== locale)
      .map((pageLocale) => ogLocales[pageLocale]),
    description,
    images: [{ ...imageSize, alt: title, url: image }],
    locale: toOgLocale(locale),
    siteName,
    title,
    type: 'website',
    url: `${baseUrl}/${locale}${path}`,
  },
  title,
  twitter: {
    card: 'summary_large_image',
    description,
    images: [{ ...imageSize, alt: title, url: image }],
    title,
  },
})

export default getPageMetadata
