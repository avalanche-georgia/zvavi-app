import { markerClassName } from '@components/features/observations/map/observationPinIcon'
import { type DivIcon, divIcon } from 'leaflet'

// lucide's ThermometerSnowflake (the Weather Stations nav icon) as plain SVG —
// Leaflet div icons take an HTML string
const iconPaths = [
  'm10 20-1.25-2.5L6 18',
  'M10 4 8.75 6.5 6 6',
  'M10.585 15H10',
  'M2 12h6.5L10 9',
  'M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z',
  'm4 10 1.5 2L4 14',
  'm7 21 3-6-1.5-3',
  'm7 3 3 6h2',
]
const iconMarkup = `<svg aria-hidden="true" class="size-full" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">${iconPaths.map((path) => `<path d="${path}"/>`).join('')}</svg>`

const iconCache = new Map<boolean, DivIcon>()

// The station icon on a white-ringed circle — dark by default, brand blue when
// selected (and a bit larger). Cached: one icon per state.
const stationPinIcon = (isSelected = false): DivIcon => {
  const cached = iconCache.get(isSelected)

  if (cached) return cached

  const diameter = isSelected ? 36 : 30
  const circleClassName = isSelected
    ? 'bg-brand-blue shadow-marker-selected'
    : 'bg-ink shadow-marker'

  const icon = divIcon({
    className: markerClassName,
    html: `<span class="block size-full rounded-full p-1.5 text-white ${circleClassName}">${iconMarkup}</span>`,
    iconAnchor: [diameter / 2, diameter / 2],
    iconSize: [diameter, diameter],
  })

  iconCache.set(isSelected, icon)

  return icon
}

export default stationPinIcon
