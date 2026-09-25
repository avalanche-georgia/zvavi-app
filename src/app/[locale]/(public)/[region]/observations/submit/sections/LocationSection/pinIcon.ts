import logoMark from '@assets/images/logo-mark.svg'
import L from 'leaflet'

// Brand-blue teardrop with the logo's avalanche mark inside (same mark as the
// observation markers on the map). The teardrop is a square with three rounded
// corners rotated so the sharp one points down; its tip sits √2 × 15 ≈ 21px
// below the 30px box's centre. className cleared — Leaflet's default div-icon
// class adds a white box behind it.
export const pinIcon = L.divIcon({
  className: '',
  html: `<div class="relative size-7.5">
    <div class="absolute inset-0 -rotate-45 rounded-[50%_50%_50%_0] border-2 border-white bg-brand-blue shadow-pin"></div>
    <img alt="" class="absolute inset-0.5 size-6.5" src="${logoMark.src}" />
  </div>`,
  iconAnchor: [15, 36],
  iconSize: [30, 30],
})
