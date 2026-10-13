import { ForecastContainer, NoForecast } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import fetchCurrentForecastId from '@data/queries/fetchCurrentForecastId'
import { fetchForecastPageData } from '@data/queries/fetchForecastPageData'
import type { RegionId } from '@domain/types'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type CurrentForecastPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: CurrentForecastPageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
    description: t('seo.currentForecast.description', {
      regionName: t(`regions.names.${regionId}`),
    }),
    title: t('seo.currentForecast.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const CurrentForecastPage = async ({ params }: CurrentForecastPageProps) => {
  const { region } = await params
  const forecastId = await fetchCurrentForecastId(region as RegionId)
  const data = forecastId === null ? null : await fetchForecastPageData(forecastId)

  if (!data) {
    return (
      <PageWrapper>
        <NoForecast />
      </PageWrapper>
    )
  }

  return (
    <ForecastContainer
      initialForecast={data.initialForecast}
      isCurrentForecast={data.isCurrentForecast}
      nextForecastId={data.nextForecastId}
      previousForecastId={data.previousForecastId}
    />
  )
}

export default CurrentForecastPage
