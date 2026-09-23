import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageWrapper } from 'src/components/layout'

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

const ObservationsPage = async ({ params }: ObservationsPageProps) => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return (
    <PageWrapper
      title={t('observations.pageTitle', { regionName: t(`regions.names.${regionId}`) })}
    >
      <ObservationsContent />
    </PageWrapper>
  )
}

export default ObservationsPage
