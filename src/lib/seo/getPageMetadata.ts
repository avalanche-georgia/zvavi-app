import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { defaultLocale, type Locale, locales } from 'src/i18n/config'

import getAlternates from './getAlternates'

import { baseUrl } from '@/routes'

export const siteName = 'Avalanche Georgia'

// Every preview image (/api/og) is this size; scrapers lay a preview out sooner when they know it
const imageSize = { height: 630, width: 1200 }

// The site's preview in the page's language, or its region's: a name, never a danger level,
// so it can't go stale in a messenger's cache
export const getBrandImage = (locale: string, regionId?: string) =>
  `/api/og/site?locale=${locale}${regionId ? `&region=${regionId}` : ''}`

// Open Graph wants language_TERRITORY
const ogLocales: Record<Locale, string> = { en: 'en_US', ka: 'ka_GE' }

export const toOgLocale = (locale: string) =>
  ogLocales[hasLocale(locales, locale) ? locale : defaultLocale]

type PageMetadataOptions = {
  description: string
  // An Open Graph image of the page's own (a forecast's); the site's or region's otherwise
  image?: string
  locale: string
  // The route without the locale ("/gudauri/forecasts/current")
  path: string
  // A region's page shows the region's image
  regionId?: string
  title: string
}

// Title, description, canonical + hreflang and the link preview of a localized page.
// A page's `openGraph` replaces the layout's whole, so it is built here in full.
const getPageMetadata = ({
  description,
  image,
  locale,
  path,
  regionId,
  title,
}: PageMetadataOptions): Metadata => {
  const images = [{ ...imageSize, alt: title, url: image ?? getBrandImage(locale, regionId) }]

  return {
    alternates: getAlternates(locale, path),
    description,
    openGraph: {
      alternateLocale: locales
        .filter((pageLocale) => pageLocale !== locale)
        .map((pageLocale) => ogLocales[pageLocale]),
      description,
      images,
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
      images,
      title,
    },
  }
}

export default getPageMetadata
