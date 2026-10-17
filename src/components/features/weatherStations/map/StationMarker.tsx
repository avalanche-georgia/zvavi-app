import { useEffect, useMemo, useRef } from 'react'
import type { WeatherStation } from '@domain/types'
import type { LeafletEventHandlerFnMap, Marker as LeafletMarker } from 'leaflet'
import { Marker, Popup, useMap } from 'react-leaflet'

import stationPinIcon from './stationPinIcon'
import StationPopup from './StationPopup'
import getStationName from '../getStationName'

type StationMarkerProps = {
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
// map pans to the pin and opens the popup.
const StationMarker = ({
  isHighlighted,
  isSelected,
  latitude,
  locale,
  longitude,
  onSelect,
  station,
}: StationMarkerProps) => {
  const map = useMap()
  const markerRef = useRef<LeafletMarker>(null)
  const { altitude, id, url } = station
  const name = getStationName(station, locale)

  // Opening another station's popup closes this one first (popupclose, then the
  // other's popupopen), so the selection always ends on the open one
  const eventHandlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      popupclose: () => onSelect(null),
      popupopen: () => onSelect(id),
    }),
    [id, onSelect],
  )

  useEffect(() => {
    const marker = markerRef.current

    if (!isSelected || !marker || marker.isPopupOpen()) return

    map.panTo([latitude, longitude])
    marker.openPopup()
  }, [isSelected, latitude, longitude, map])

  return (
    <Marker
      ref={markerRef}
      eventHandlers={eventHandlers}
      icon={stationPinIcon(isSelected || isHighlighted)}
      position={[latitude, longitude]}
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
