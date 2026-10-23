import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import ObservationsContent from './ObservationsContent'

import { requireKnownRegion } from '@/lib/regionRouting'
import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

type ObservationsPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: ObservationsPageProps): Promise<Metadata> => {
  const { region: regionId } = await params

  requireKnownRegion(regionId)

  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('seo.observations.description', {
      regionName: t(`regions.names.${regionId}`),
    }),
    locale,
    path: routes.observationsByRegion(regionId).root,
    title: t('seo.observations.title', { regionName: t(`regions.names.${regionId}`) }),
  })
}

// Filters and the open observation are read from the URL on the client
const ObservationsPage = () => (
  <Suspense>
    <ObservationsContent />
  </Suspense>
)

export default ObservationsPage
