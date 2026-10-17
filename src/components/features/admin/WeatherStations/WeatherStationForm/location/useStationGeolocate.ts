import { useState } from 'react'
import { useToast } from '@components/hooks'
import { countryBounds } from '@components/shared/map'
import type { Map as LeafletMap } from 'leaflet'
import { latLng } from 'leaflet'
import { useTranslations } from 'next-intl'

type UseStationGeolocateParams = {
  map: LeafletMap | null
  onLocationPick: (latitude: number, longitude: number) => void
}

const locatedZoom = 14

// "My location": drop the pin at the device position — only inside Georgia,
// otherwise the pin would land off-map
const useStationGeolocate = ({ map, onLocationPick }: UseStationGeolocateParams) => {
  const t = useTranslations()
  const { toastInfo } = useToast()
  const [isLocating, setIsLocating] = useState(false)

  const handlePosition = ({ coords }: GeolocationPosition) => {
    setIsLocating(false)

    const position = latLng(coords.latitude, coords.longitude)

    if (!countryBounds.contains(position)) {
      toastInfo(t('admin.weatherStations.form.location.outsideGeorgia'))

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
          ? 'observations.form.location.geolocation.denied'
          : 'observations.form.location.geolocation.unavailable',
      ),
    )
  }

  const locate = () => {
    if (!navigator.geolocation) {
      toastInfo(t('observations.form.location.geolocation.unavailable'))

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

export default useStationGeolocate
