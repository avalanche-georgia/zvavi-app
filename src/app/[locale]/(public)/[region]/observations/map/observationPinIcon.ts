import logoMark from '@assets/images/logo-mark.svg'
import type { AvalancheSize } from '@domain/types'
import { type DivIcon, divIcon } from 'leaflet'

import './observationPin.css'

// Radius grows with avalanche size; the selected pin is a bit larger still
const getDiameter = (size: AvalancheSize, isSelected: boolean) =>
  (6 + size * 2) * 2 + (isSelected ? 6 : 0)

const iconCache = new Map<string, DivIcon>()

// The logo's avalanche mark on a circle — grey shades by size, brand blue when
// selected (styles in observationPin.css). Cached: one icon per size/state.
const observationPinIcon = (size: AvalancheSize, isSelected = false): DivIcon => {
  const cacheKey = `${size}-${isSelected}`
  const cached = iconCache.get(cacheKey)

  if (cached) return cached

  const diameter = getDiameter(size, isSelected)
  const icon = divIcon({
    className: 'observation-pin',
    html: `<span data-size="${size}"${isSelected ? ' data-selected' : ''}><img alt="" src="${logoMark.src}" /></span>`,
    iconAnchor: [diameter / 2, diameter / 2],
    iconSize: [diameter, diameter],
  })

  iconCache.set(cacheKey, icon)

  return icon
}

export default observationPinIcon
