'use client'

import type { AvalancheSize, PublicObservation } from '@domain/types'
import { CircleMarker, MapContainer, Marker, TileLayer } from 'react-leaflet'

import hasCoordinates from '../helpers/hasCoordinates'
import MapBehavior from '../map/MapBehavior'
import { contextDotColor, maxZoom, topoTiles } from '../map/mapConfig'
import observationPinIcon from '../map/observationPinIcon'

import 'leaflet/dist/leaflet.css'

export type LocationMapClientProps = {
  center: [number, number]
  // Shown as faded dots for context
  observations: PublicObservation[]
  selectedId: number
  size: AvalancheSize
}

const zoom = 14
const noop = () => undefined

const LocationMapClient = ({ center, observations, selectedId, size }: LocationMapClientProps) => (
  <MapContainer center={center} className="bg-map size-full" maxZoom={maxZoom} zoom={zoom}>
    <TileLayer attribution={topoTiles.attribution} maxNativeZoom={maxZoom} url={topoTiles.url} />
    <MapBehavior focus={center} onMapClick={noop} />

    {observations
      .filter((observation) => observation.id !== selectedId)
      .filter(hasCoordinates)
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
