import logoMark from '@assets/images/logo-mark.svg'
import { markerClassName } from '@components/shared/map/markerClassName'
import type { AvalancheSize } from '@domain/types'
import { type DivIcon, divIcon } from 'leaflet'

// Grey shades by avalanche size, lightest → darkest
const shadeClassNames: Record<AvalancheSize, string> = {
  1: 'bg-pin-1',
  2: 'bg-pin-2',
  3: 'bg-pin-3',
  4: 'bg-pin-4',
  5: 'bg-pin-5',
}

// Radius grows with avalanche size; the selected pin is a bit larger still
const getDiameter = (size: AvalancheSize, isSelected: boolean) =>
  (6 + size * 2) * 2 + (isSelected ? 6 : 0)

const iconCache = new Map<string, DivIcon>()

// The logo's avalanche mark on a circle — grey shades by size, brand blue when
// selected. Cached: one icon per size/state.
const observationPinIcon = (size: AvalancheSize, isSelected = false): DivIcon => {
  const cacheKey = `${size}-${isSelected}`
  const cached = iconCache.get(cacheKey)

  if (cached) return cached

  const diameter = getDiameter(size, isSelected)
  const circleClassName = isSelected
    ? 'bg-brand-blue shadow-marker-selected'
    : `${shadeClassNames[size]} shadow-marker`

  const icon = divIcon({
    className: markerClassName,
    html: `<span class="block size-full rounded-full ${circleClassName}"><img alt="" class="block size-full" src="${logoMark.src}" /></span>`,
    iconAnchor: [diameter / 2, diameter / 2],
    iconSize: [diameter, diameter],
  })

  iconCache.set(cacheKey, icon)

  return icon
}

export default observationPinIcon
