import L from 'leaflet'

// Brand-orange teardrop: a square with three rounded corners, rotated so the sharp
// corner points down. Its tip sits ~18px below the 26px box's centre (√2 × 13).
// className cleared — Leaflet's default div-icon class adds a white box behind it.
export const pinIcon = L.divIcon({
  className: '',
  html: '<div class="size-6.5 -rotate-45 rounded-[50%_50%_50%_0] border-3 border-white bg-primary shadow-pin"></div>',
  iconAnchor: [13, 31],
  iconSize: [26, 26],
})
