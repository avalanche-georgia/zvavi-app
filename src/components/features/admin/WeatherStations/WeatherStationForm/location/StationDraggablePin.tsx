import { useMemo } from 'react'
import stationPinIcon from '@components/features/weatherStations/map/stationPinIcon'
import type { LeafletEventHandlerFnMap, Marker as LeafletMarker } from 'leaflet'
import { Marker } from 'react-leaflet'

type StationDraggablePinProps = {
  latitude: number
  longitude: number
  onLocationPick: (latitude: number, longitude: number) => void
}

// The station pin from the public map, draggable
const StationDraggablePin = ({ latitude, longitude, onLocationPick }: StationDraggablePinProps) => {
  const eventHandlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      dragend: (event) => {
        const position = (event.target as LeafletMarker).getLatLng()

        onLocationPick(position.lat, position.lng)
      },
    }),
    [onLocationPick],
  )

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      icon={stationPinIcon(true)}
      position={[latitude, longitude]}
    />
  )
}

export default StationDraggablePin
