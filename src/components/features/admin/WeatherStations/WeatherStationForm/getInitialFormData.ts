import type { WeatherStation } from '@domain/types'

import type { WeatherStationFormValues } from './schema'

const getInitialFormData = (station: WeatherStation | null): WeatherStationFormValues => {
  if (!station) return { altitude: null, nameEn: '', nameKa: '', url: '' }

  const { altitude, nameEn, nameKa, url } = station

  return { altitude, nameEn, nameKa: nameKa ?? '', url }
}

export default getInitialFormData
