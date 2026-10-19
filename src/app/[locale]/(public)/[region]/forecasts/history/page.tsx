import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

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

const HistoryPage = async () => {
  const t = await getTranslations()

  return (
    <div className="bg-canvas text-ink">
      <div className="mx-auto max-w-240 px-4 pt-5 pb-12 sm:px-6 sm:pt-7">
        <h1 className="text-title-lg font-bold">{t('navigation.archive')}</h1>
        {/* The selected season lives in the URL (useSearchParams) */}
        <Suspense>
          <HistoryContent />
        </Suspense>
      </div>
    </div>
  )
}

export default HistoryPage
