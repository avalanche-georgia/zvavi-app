import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import HistoryContent from './HistoryContent'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.history.description'),
    title: t('seo.history.title'),
  }
}

const HistoryPage = () => <HistoryContent />

export default HistoryPage
