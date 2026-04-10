import type { HazardLevelScale } from '@domain/types'

export const hazardColors: Record<HazardLevelScale, string> = {
  1: '#6ac828',
  2: '#f8f024',
  3: '#f88f2c',
  4: '#eb450b',
  5: '#1b1a1e',
}

export const hazardLevelLabels: Record<HazardLevelScale, string> = {
  1: 'Low',
  2: 'Moderate',
  3: 'Considerable',
  4: 'High',
  5: 'Extreme',
}

export const hazardIconFiles: Record<HazardLevelScale, string> = {
  1: 'low',
  2: 'moderate',
  3: 'considerable',
  4: 'high',
  5: 'high',
}

export async function loadFont(): Promise<ArrayBuffer> {
  const css = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@600', {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
    next: { revalidate: 86400 },
  }).then((response) => response.text())

  const url = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1]

  if (!url) throw new Error('Could not parse font URL from Google Fonts')

  return fetch(url, { next: { revalidate: 86400 } }).then((response) => response.arrayBuffer())
}
