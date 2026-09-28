'use client'

import { TileLayer } from 'react-leaflet'

// OpenTopoMap only serves tiles up to zoom 17 — past that it shows blank
// "max zoom layer = 17" placeholders. Pass as the MapContainer's maxZoom too.
export const baseMapMaxZoom = 17

// The app's base map, used by every map: OpenTopoMap (contours, peaks, huts —
// suits avalanche terrain) with the OpenSnowMap overlay for resort pistes.
const BaseMapLayers = () => (
  <>
    <TileLayer
      attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>, <a href="https://www.openstreetmap.org/copyright">OSM</a>'
      maxNativeZoom={baseMapMaxZoom}
      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    />
    <TileLayer
      attribution='<a href="https://www.opensnowmap.org/">OpenSnowMap</a>'
      url="https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png"
    />
  </>
)

export default BaseMapLayers
