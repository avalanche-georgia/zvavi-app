'use client'

import { TileLayer } from 'react-leaflet'

// Transparent ski-piste overlay (OpenSnowMap) — draw above TopoTileLayer
const PisteTileLayer = () => (
  <TileLayer
    attribution='<a href="https://www.opensnowmap.org/">OpenSnowMap</a>'
    url="https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png"
  />
)

export default PisteTileLayer
