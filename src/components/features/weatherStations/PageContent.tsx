import fetchWeatherStations from '@data/queries/fetchWeatherStations'
import { getLocale, getTranslations } from 'next-intl/server'

import StationsList from './StationsList'

const PageContent = async () => {
  const [t, locale, stations] = await Promise.all([
    getTranslations(),
    getLocale(),
    fetchWeatherStations(),
  ])

  return (
    <>
      <p className="mb-4">{t('weatherStations.description')}</p>
      <StationsList locale={locale} stations={stations} />
    </>
  )
}

export default PageContent
