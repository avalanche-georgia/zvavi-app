import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { PageWrapper } from 'src/components/layout'

import HistoryContent from './HistoryContent'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

type HistoryPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: HistoryPageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.forecastsByRegion(regionId).history),
    description: t('seo.history.description', { regionName: t(`regions.names.${regionId}`) }),
    title: t('seo.history.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const HistoryPage = async ({ params }: HistoryPageProps) => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return (
    <PageWrapper
      title={t('forecast.historyPageTitle', { regionName: t(`regions.names.${regionId}`) })}
    >
      <HistoryContent />
    </PageWrapper>
  )
}

export default HistoryPage
