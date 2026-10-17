import { useEffect, useMemo, useRef } from 'react'
import useClusterHighlight from '@components/shared/map/useClusterHighlight'
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
  latitude: number
  locale: string
  longitude: number
  onSelect: (id: string | null) => void
  station: WeatherStation
}

// The popup is the selection: opening it (tap on the pin) selects the station,
// closing it clears the selection. Selected from outside (its list row), the
// map zooms in until the pin leaves its cluster, then opens the popup.
const StationMarker = ({
  clusterRef,
  isHighlighted,
  isSelected,
  latitude,
  locale,
  longitude,
  onSelect,
  station,
}: StationMarkerProps) => {
  const markerRef = useRef<LeafletMarker>(null)
  const { altitude, id, url } = station
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

  useClusterHighlight({ clusterRef, isActive: isSelected || isHighlighted, markerRef })

  useEffect(() => {
    const marker = markerRef.current

    if (!isSelected || !marker || marker.isPopupOpen()) return

    // Next tick: on mount (selected in the list before the map opened) the cluster
    // group only joins the map after this effect, and zoomToShowLayer needs it there
    const timeout = setTimeout(() =>
      clusterRef.current?.zoomToShowLayer(marker, () => marker.openPopup()),
    )

    return () => clearTimeout(timeout)
  }, [clusterRef, isSelected])

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
