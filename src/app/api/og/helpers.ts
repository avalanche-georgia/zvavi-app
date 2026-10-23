import type { HazardLevelScale } from '@domain/types'
import { readFileSync } from 'fs'
import { hasLocale } from 'next-intl'
import { join } from 'path'
import { defaultLocale, locales } from 'src/i18n/config'

export const imageSize = { height: 630, width: 1200 }

// A forecast's image is cached for good, also by the CDN (s-maxage): its URL changes with what
// it shows (`v`, `locale`)
export const forecastImageHeaders = {
  'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
}
// The site's and regions' images have no version, so a change of wording shows within a day
export const brandImageHeaders = { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' }

const georgianLetters = /[\u10A0-\u10FF]/

export const isGeorgian = (text: string) => georgianLetters.test(text)

// The largest size up to `maxSize` at which one line of `text` fits `width` px — Georgian
// letters run wider than Latin ones
export const fitFontSize = (text: string, width: number, maxSize: number) =>
  Math.min(maxSize, width / (text.length * (isGeorgian(text) ? 0.72 : 0.6)))

export const hazardColors: Record<HazardLevelScale, string> = {
  0: '#9ca3af',
  1: '#6ac828',
  2: '#f8f024',
  3: '#f88f2c',
  4: '#eb450b',
  5: '#1b1a1e',
}

export const hazardIconFiles: Record<HazardLevelScale, string> = {
  0: 'none',
  1: 'low',
  2: 'moderate',
  3: 'considerable',
  4: 'high',
  5: 'high',
}

export const toImageLocale = (locale: string | null) =>
  locale && hasLocale(locales, locale) ? locale : defaultLocale

const readPublicFile = (path: string) => readFileSync(join(process.cwd(), 'public', path))

export const toDataUri = (path: string, type: string) =>
  `data:${type};base64,${readPublicFile(path).toString('base64')}`

export const loadLogo = () => toDataUri('images/logo.png', 'image/png')

// SemiBold, self-hosted like the site font (next/og reads woff, not woff2), from
// @fontsource 5.3.0; licences next to them. Inter has no Georgian letters, so the image
// falls back to Noto Sans Georgian for those.
export const loadFonts = () => [
  {
    data: readPublicFile('og/inter-latin-600-normal.woff'),
    name: 'Inter',
    style: 'normal' as const,
    weight: 600 as const,
  },
  {
    data: readPublicFile('og/noto-sans-georgian-georgian-600-normal.woff'),
    name: 'Noto Sans Georgian',
    style: 'normal' as const,
    weight: 600 as const,
  },
]
