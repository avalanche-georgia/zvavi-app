import { ForecastAreaMap } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type PageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
    description: t('seo.forecastArea.description', { regionName: t(`regions.names.${regionId}`) }),
    title: t('seo.forecastArea.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const ForecastAreaPage = async ({ params }: PageProps) => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return (
    <PageWrapper
      title={t('forecast.forecastAreaPageTitle', { regionName: t(`regions.names.${regionId}`) })}
    >
      <ForecastAreaMap />
    </PageWrapper>
  )
}

export default ForecastAreaPage
