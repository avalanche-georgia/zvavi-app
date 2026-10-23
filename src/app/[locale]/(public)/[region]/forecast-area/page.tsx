import { ForecastAreaMap } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import { requireKnownRegion } from '@/lib/regionRouting'
import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

type PageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { region: regionId } = await params

  requireKnownRegion(regionId)

  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('seo.forecastArea.description', { regionName: t(`regions.names.${regionId}`) }),
    locale,
    path: routes.forecastsByRegion(regionId).forecastArea,
    title: t('seo.forecastArea.title', { regionName: t(`regions.names.${regionId}`) }),
  })
}

const ForecastAreaPage = async ({ params }: PageProps) => {
  const { region: regionId } = await params

  requireKnownRegion(regionId)

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
