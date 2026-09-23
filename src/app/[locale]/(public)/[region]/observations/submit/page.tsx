import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageWrapper } from 'src/components/layout'

import ObservationSubmitForm from './ObservationSubmitForm'

type ObservationSubmitPageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({
  params,
}: ObservationSubmitPageProps): Promise<Metadata> => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return {
    title: t('observations.submit.title', { regionName: t(`regions.names.${regionId}`) }),
  }
}

const ObservationSubmitPage = async ({ params }: ObservationSubmitPageProps) => {
  const { region: regionId } = await params
  const t = await getTranslations()

  return (
    <PageWrapper
      title={t('observations.submit.title', { regionName: t(`regions.names.${regionId}`) })}
    >
      <ObservationSubmitForm />
    </PageWrapper>
  )
}

export default ObservationSubmitPage
