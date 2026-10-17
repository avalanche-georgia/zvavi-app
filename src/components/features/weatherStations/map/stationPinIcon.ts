import { createElement } from 'react'
import { markerClassName } from '@components/features/observations/map/observationPinIcon'
import { type DivIcon, divIcon } from 'leaflet'
import { ThermometerSnowflake } from 'lucide-react'
import { renderToStaticMarkup } from 'react-dom/server'

// Same icon as the Weather Stations item in the nav menu
const iconMarkup = renderToStaticMarkup(
  createElement(ThermometerSnowflake, { 'aria-hidden': true, className: 'size-full' }),
)

const iconCache = new Map<boolean, DivIcon>()

// The station icon on a white-ringed circle — dark by default, brand blue when
// selected (and a bit larger). Cached: one icon per state.
const stationPinIcon = (isSelected = false): DivIcon => {
  const cached = iconCache.get(isSelected)

  if (cached) return cached

  const diameter = isSelected ? 36 : 30
  const circleClassName = isSelected
    ? 'bg-brand-blue shadow-[0_0_0_3px_#fff,0_2px_6px_rgb(0_0_0/.35)]'
    : 'bg-ink shadow-[0_0_0_2px_#fff,0_1px_3px_rgb(0_0_0/.3)]'

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
