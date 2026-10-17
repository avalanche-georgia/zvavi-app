import type { WeatherStation } from '@domain/types'

// Georgian name on the Georgian site when there is one, English otherwise
const getStationName = ({ nameEn, nameKa }: WeatherStation, locale: string): string =>
  locale === 'ka' && nameKa ? nameKa : nameEn

export default getStationName
