import type { WeatherStation, WeatherStationFormData } from '@domain/types'

const getInitialFormData = (station: WeatherStation | null): WeatherStationFormData => {
  if (!station) {
    return { nameEn: '', nameKa: '', url: '' }
  }

  return {
    nameEn: station.nameEn,
    nameKa: station.nameKa ?? '',
    url: station.url,
  }
}

export default getInitialFormData
