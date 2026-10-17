'use client'

import { useMemo, useRef } from 'react'
import { BaseMapLayers, baseMapMaxZoom, countryBounds, FitInCountry } from '@components/shared/map'
import type { WeatherStation } from '@domain/types'
import { latLngBounds, type MarkerClusterGroup as LeafletClusterGroup } from 'leaflet'
import { MapContainer, ZoomControl } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'

import stationClusterIcon from './stationClusterIcon'
import StationMarker from './StationMarker'

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css'

export type StationsMapClientProps = {
  // Station whose list row is hovered
  hoveredId: string | null
  locale: string
  onSelect: (id: string | null) => void
  selectedId: string | null
  stations: WeatherStation[]
}

// Every station with a location; opens fitted to them (Georgia when none has
// one) and never zooms or pans out past Georgia
const StationsMapClient = ({
  hoveredId,
  locale,
  onSelect,
  selectedId,
  stations,
}: StationsMapClientProps) => {
  const located = useMemo(
    () =>
      stations.flatMap(({ latitude, longitude, ...station }) =>
        latitude != null && longitude != null
          ? [{ latitude, longitude, station: { ...station, latitude, longitude } }]
          : [],
      ),
    [stations],
  )
  const clusterRef = useRef<LeafletClusterGroup>(null)
  // Memoised: a new bounds object would refit the map on every selection
  const bounds = useMemo(
    () =>
      located.length
        ? latLngBounds(located.map(({ latitude, longitude }) => [latitude, longitude]))
        : null,
    [located],
  )

  return (
    <MapContainer
      // Initial view only — FitInCountry fits the stations right after mount
      bounds={countryBounds}
      className="bg-map size-full"
      maxBoundsViscosity={1}
      maxZoom={baseMapMaxZoom}
      zoomControl={false}
    >
      <BaseMapLayers />
      <ZoomControl position="topright" />
      <FitInCountry bounds={bounds} />
      {/* Clustered like the observation map; zooming in splits the groups */}
      <MarkerClusterGroup
        ref={clusterRef}
        iconCreateFunction={stationClusterIcon}
        maxClusterRadius={32}
        showCoverageOnHover={false}
      >
        {located.map(({ latitude, longitude, station }) => (
          <StationMarker
            key={station.id}
            clusterRef={clusterRef}
            isHighlighted={station.id === hoveredId}
            isSelected={station.id === selectedId}
            latitude={latitude}
            locale={locale}
            longitude={longitude}
            onSelect={onSelect}
            station={station}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default StationsMapClient
