import type { WeatherStation } from '@domain/types'

import type { WeatherStationFormValues } from './schema'

const getInitialFormData = (station: WeatherStation | null): WeatherStationFormValues => {
  if (!station) {
    return { altitude: null, latitude: null, longitude: null, nameEn: '', nameKa: '', url: '' }
  }

  const { altitude, latitude, longitude, nameEn, nameKa, url } = station

  return { altitude, latitude, longitude, nameEn, nameKa: nameKa ?? '', url }
}

export default getInitialFormData
