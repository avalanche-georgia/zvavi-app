import { useMemo } from 'react'
import type { LeafletEventHandlerFnMap, Marker as LeafletMarker } from 'leaflet'
import { Marker } from 'react-leaflet'

import { pinIcon } from './pinIcon'

type DraggablePinProps = {
  latitude: number
  longitude: number
  onLocationPick: (latitude: number, longitude: number) => void
}

const DraggablePin = ({ latitude, longitude, onLocationPick }: DraggablePinProps) => {
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
      icon={pinIcon}
      position={[latitude, longitude]}
    />
  )
}

export default DraggablePin
