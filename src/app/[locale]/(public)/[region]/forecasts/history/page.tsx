import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageWrapper } from 'src/components/layout'

import HistoryContent from './HistoryContent'

type HistoryPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: HistoryPageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
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
