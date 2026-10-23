import { ForecastContainer, NoForecast } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import fetchCurrentForecastId from '@data/queries/fetchCurrentForecastId'
import { fetchForecastPageData } from '@data/queries/fetchForecastPageData'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import { requireKnownRegion } from '@/lib/regionRouting'
import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

type CurrentForecastPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: CurrentForecastPageProps): Promise<Metadata> => {
  const { region: regionId } = await params

  requireKnownRegion(regionId)

  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.forecastsByRegion(regionId).current),
    description: t('seo.currentForecast.description', {
      regionName: t(`regions.names.${regionId}`),
    }),
    title: t('seo.currentForecast.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const CurrentForecastPage = async ({ params }: CurrentForecastPageProps) => {
  const { region } = await params

  requireKnownRegion(region)

  const forecastId = await fetchCurrentForecastId(region)
  const data =
    forecastId === null ? null : await fetchForecastPageData(forecastId, { isKnownCurrent: true })

  if (!data) {
    return (
      <PageWrapper>
        <NoForecast regionId={region} />
      </PageWrapper>
    )
  }

  return (
    <ForecastContainer
      forecasterProfile={data.forecasterProfile}
      initialForecast={data.initialForecast}
      isCurrentForecast={data.isCurrentForecast}
      nextForecastId={data.nextForecastId}
      previousForecastId={data.previousForecastId}
    />
  )
}

export default CurrentForecastPage
