import { useState } from 'react'
import { useToast } from '@components/hooks'
import type { LatLngBounds, Map as LeafletMap } from 'leaflet'
import { latLng } from 'leaflet'
import { useTranslations } from 'next-intl'

type UseGeolocatePinParams = {
  bounds: LatLngBounds | null
  map: LeafletMap | null
  onLocationPick: (latitude: number, longitude: number) => void
  regionName: string
}

const locatedZoom = 14

// "My location": drop the pin at the device position — only if it's inside the
// region the map is limited to, otherwise the pin would land off-map.
const useGeolocatePin = ({ bounds, map, onLocationPick, regionName }: UseGeolocatePinParams) => {
  const t = useTranslations()
  const { toastInfo } = useToast()
  const [isLocating, setIsLocating] = useState(false)

  const handlePosition = ({ coords }: GeolocationPosition) => {
    setIsLocating(false)

    const position = latLng(coords.latitude, coords.longitude)

    if (bounds && !bounds.contains(position)) {
      toastInfo(t('observations.submit.location.geolocation.outsideRegion', { regionName }))

      return
    }

    onLocationPick(position.lat, position.lng)
    map?.flyTo(position, locatedZoom)
  }

  const handleError = (error: GeolocationPositionError) => {
    setIsLocating(false)
    toastInfo(
      t(
        error.code === error.PERMISSION_DENIED
          ? 'observations.submit.location.geolocation.denied'
          : 'observations.submit.location.geolocation.unavailable',
      ),
    )
  }

  const locate = () => {
    if (!navigator.geolocation) {
      toastInfo(t('observations.submit.location.geolocation.unavailable'))

      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(handlePosition, handleError, {
      enableHighAccuracy: true,
      timeout: 15000,
    })
  }

  return { isLocating, locate }
}

export default useGeolocatePin
