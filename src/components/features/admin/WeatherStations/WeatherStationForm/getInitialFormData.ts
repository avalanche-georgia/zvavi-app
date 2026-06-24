import type { WeatherStation } from '@domain/types'

const getInitialFormData = (station: WeatherStation | null) => {
  if (!station) {
    return { altitude: undefined, nameEn: '', nameKa: '', url: '' }
  }

  return {
    altitude: station.altitude,
    nameEn: station.nameEn,
    nameKa: station.nameKa,
    url: station.url,
  }
}

export default getInitialFormData
