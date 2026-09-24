'use client'

import { topoMaxZoom, TopoTileLayer } from '@components/shared/map'
import type { AvalancheSize, ObservationPoint } from '@domain/types'
import { CircleMarker, MapContainer, Marker } from 'react-leaflet'

import MapBehavior from '../map/MapBehavior'
import { contextDotColor } from '../map/mapConfig'
import observationPinIcon from '../map/observationPinIcon'

import 'leaflet/dist/leaflet.css'

export type LocationMapClientProps = {
  center: [number, number]
  // Shown as faded dots for context
  points: ObservationPoint[]
  selectedId: number
  size: AvalancheSize
}

const zoom = 14
const noop = () => undefined

const LocationMapClient = ({ center, points, selectedId, size }: LocationMapClientProps) => (
  <MapContainer center={center} className="bg-map size-full" maxZoom={topoMaxZoom} zoom={zoom}>
    <TopoTileLayer />
    <MapBehavior focus={center} onMapClick={noop} />

    {points
      .filter((point) => point.id !== selectedId)
      .map(({ id, latitude, longitude }) => (
        <CircleMarker
          key={id}
          center={[latitude, longitude]}
          interactive={false}
          pathOptions={{
            color: '#fff',
            fillColor: contextDotColor,
            fillOpacity: 0.6,
            weight: 1.5,
          }}
          radius={5}
        />
      ))}

    <Marker
      icon={observationPinIcon(size, true)}
      interactive={false}
      keyboard={false}
      position={center}
      zIndexOffset={1000}
    />
  </MapContainer>
)

export default LocationMapClient
