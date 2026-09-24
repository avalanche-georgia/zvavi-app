import logoMark from '@assets/images/logo-mark.svg'
import type { AvalancheSize } from '@domain/types'
import { type DivIcon, divIcon } from 'leaflet'

// Grey shades by avalanche size, lightest → darkest
const shadeClassNames: Record<AvalancheSize, string> = {
  1: 'bg-[#8a8f99]',
  2: 'bg-[#6b707a]',
  3: 'bg-[#4a4e57]',
  4: 'bg-[#2c2e33]',
  5: 'bg-[#111]',
}

// Leaflet adds the icon's className to its own marker element. Drops the
// browser's square focus ring after a tap (keyboard focus still shows one).
export const markerClassName = 'focus:not-focus-visible:outline-hidden'

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
    ? 'bg-brand-blue shadow-[0_0_0_3px_#fff,0_2px_6px_rgb(0_0_0/.35)]'
    : `${shadeClassNames[size]} shadow-[0_0_0_2px_#fff,0_1px_3px_rgb(0_0_0/.3)]`

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
