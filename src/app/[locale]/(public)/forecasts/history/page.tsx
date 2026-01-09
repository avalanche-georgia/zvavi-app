import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { PageWrapper } from 'src/components/layout'

import HistoryContent from './HistoryContent'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.history.description'),
    title: t('seo.history.title'),
  }
}

const HistoryPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.history')}>
      <HistoryContent />
    </PageWrapper>
  )
}

export default HistoryPage
