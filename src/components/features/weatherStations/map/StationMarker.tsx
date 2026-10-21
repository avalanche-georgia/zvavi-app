import { useMemo, useRef } from 'react'
import useClusterMarker from '@components/shared/map/useClusterMarker'
import type { WeatherStation } from '@domain/types'
import type { LeafletEventHandlerFnMap, Marker as LeafletMarker, MarkerClusterGroup } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'

import stationPinIcon from './stationPinIcon'
import StationPopup from './StationPopup'
import getStationName from '../getStationName'

type StationMarkerProps = {
  // The cluster group the marker lives in
  clusterRef: React.RefObject<MarkerClusterGroup | null>
  // Its list row is hovered
  isHighlighted: boolean
  isSelected: boolean
  locale: string
  onSelect: (id: string | null) => void
  station: WeatherStation
}

// Opening an already open popup is a no-op (selected by a tap on the pin)
const openPopup = (marker: LeafletMarker) => marker.openPopup()

// The popup is the selection: opening it (tap on the pin) selects the station,
// closing it clears the selection. Selected from outside (its list row), the
// map zooms in until the pin leaves its cluster, then opens the popup.
const StationMarker = ({
  clusterRef,
  isHighlighted,
  isSelected,
  locale,
  onSelect,
  station,
}: StationMarkerProps) => {
  const markerRef = useRef<LeafletMarker>(null)
  const { altitude, id, latitude, longitude, url } = station
  const name = getStationName(station, locale)
  // Stable: a new array makes react-leaflet move the marker, which re-lays out
  // (blinks) the open popup on every list hover
  const position = useMemo<[number, number]>(() => [latitude, longitude], [latitude, longitude])

  // Opening another station's popup closes this one first (popupclose, then the
  // other's popupopen), so the selection always ends on the open one
  const eventHandlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      popupclose: () => onSelect(null),
      popupopen: () => onSelect(id),
    }),
    [id, onSelect],
  )

  useClusterMarker({ clusterRef, isHighlighted, isSelected, markerRef, onRevealed: openPopup })

  return (
    <Marker
      ref={markerRef}
      eventHandlers={eventHandlers}
      icon={stationPinIcon(isSelected || isHighlighted)}
      position={position}
      // Accessible name for the focusable pin
      title={name}
      zIndexOffset={isSelected || isHighlighted ? 1000 : 0}
    >
      <Popup className="station-popup" offset={[0, -12]}>
        <StationPopup altitude={altitude} name={name} url={url} />
      </Popup>
    </Marker>
  )
}

export default StationMarker
