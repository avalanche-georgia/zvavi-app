import { Suspense } from 'react'
import { HistoryList } from '@components/features/history'
import { Loading } from '@components/shared'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import fetchHistoryList from './fetchHistoryList'

import { requireKnownRegion } from '@/lib/regionRouting'
import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

type HistoryPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: HistoryPageProps): Promise<Metadata> => {
  const { region: regionId } = await params

  requireKnownRegion(regionId)

  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('seo.history.description', { regionName: t(`regions.names.${regionId}`) }),
    locale,
    path: routes.forecastsByRegion(regionId).history,
    regionId,
    title: t('seo.history.title', { regionName: t(`regions.names.${regionId}`) }),
  })
}

const HistoryPage = async ({ params }: HistoryPageProps) => {
  const { region: regionId } = await params

  requireKnownRegion(regionId)

  const [t, forecasts] = await Promise.all([getTranslations(), fetchHistoryList(regionId)])

  return (
    <div className="bg-canvas text-ink">
      <div className="mx-auto max-w-240 px-4 pt-5 pb-12 sm:px-6 sm:pt-7">
        <h1 className="text-title-lg font-bold">{t('navigation.archive')}</h1>
        {/* The selected season lives in the URL (useSearchParams) */}
        <Suspense fallback={<Loading />}>
          <HistoryList forecasts={forecasts} regionId={regionId} />
        </Suspense>
      </div>
    </div>
  )
}

export default HistoryPage
