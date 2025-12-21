import { PageContent } from '@components/features/partners'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.partners.description'),
    title: t('seo.partners.title'),
  }
}

const PartnersPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.partners')}>
      <PageContent />
    </PageWrapper>
  )
}

export default PartnersPage
