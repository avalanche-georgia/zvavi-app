import { useMemo } from 'react'
import type { LeafletEventHandlerFnMap, Marker as LeafletMarker } from 'leaflet'
import { Marker } from 'react-leaflet'

import { pinIcon } from './pinIcon'

type DraggablePinProps = {
  latitude: number
  longitude: number
  onPick: (lat: number, lng: number) => void
}

const DraggablePin = ({ latitude, longitude, onPick }: DraggablePinProps) => {
  const eventHandlers = useMemo<LeafletEventHandlerFnMap>(
    () => ({
      dragend: (event) => {
        const { lat, lng } = (event.target as LeafletMarker).getLatLng()

        onPick(lat, lng)
      },
    }),
    [onPick],
  )

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      icon={pinIcon}
      position={[latitude, longitude]}
    />
  )
}

export default DraggablePin
