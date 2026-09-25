import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import ObservationsContent from './ObservationsContent'

type ObservationsPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: ObservationsPageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
    description: t('seo.observations.description', {
      regionName: t(`regions.names.${regionId}`),
    }),
    title: t('seo.observations.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

// Filters and the open observation are read from the URL on the client
const ObservationsPage = () => (
  <Suspense>
    <ObservationsContent />
  </Suspense>
)

export default ObservationsPage
