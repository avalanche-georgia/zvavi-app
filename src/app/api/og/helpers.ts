import type { HazardLevelScale } from '@domain/types'
import { readFileSync } from 'fs'
import { join } from 'path'

export const hazardColors: Record<HazardLevelScale, string> = {
  0: '#9ca3af',
  1: '#6ac828',
  2: '#f8f024',
  3: '#f88f2c',
  4: '#eb450b',
  5: '#1b1a1e',
}

export const hazardLevelLabels: Record<HazardLevelScale, string> = {
  0: 'No Rating',
  1: 'Low',
  2: 'Moderate',
  3: 'Considerable',
  4: 'High',
  5: 'Extreme',
}

export const hazardIconFiles: Record<HazardLevelScale, string> = {
  0: 'none',
  1: 'low',
  2: 'moderate',
  3: 'considerable',
  4: 'high',
  5: 'high',
}

// Inter SemiBold, self-hosted like the site font: next/og reads woff, not woff2.
// From @fontsource/inter 5.3.0; licence in public/og/Inter-OFL.txt.
export const loadFont = () =>
  readFileSync(join(process.cwd(), 'public/og/inter-latin-600-normal.woff'))
