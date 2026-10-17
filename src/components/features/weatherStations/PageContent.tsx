import fetchWeatherStations from '@data/queries/fetchWeatherStations'
import { getLocale } from 'next-intl/server'

import StationsView from './StationsView'

const PageContent = async () => {
  const [locale, stations] = await Promise.all([getLocale(), fetchWeatherStations()])

  return <StationsView locale={locale} stations={stations} />
}

export default PageContent
