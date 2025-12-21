import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CurrentForecastContent from './CurrentForecastContent'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.currentForecast.description'),
    title: t('seo.currentForecast.title'),
  }
}

const CurrentForecastPage = () => <CurrentForecastContent />

export default CurrentForecastPage
