import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import CurrentForecastContent from './CurrentForecastContent'

type Props = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
    description: t('seo.currentForecast.description', {
      regionName: t(`regions.names.${regionId}`),
    }),
    title: t('seo.currentForecast.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const CurrentForecastPage = () => <CurrentForecastContent />

export default CurrentForecastPage
