import type { HazardLevelScale } from '@domain/types'
import { readFileSync } from 'fs'
import { hasLocale } from 'next-intl'
import { join } from 'path'
import { defaultLocale, locales } from 'src/i18n/config'

export const imageSize = { height: 630, width: 1200 }

// The image is cached for good: its URL changes with what it shows (`v`, `locale`)
export const imageHeaders = { 'Cache-Control': 'public, max-age=86400, immutable' }

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
