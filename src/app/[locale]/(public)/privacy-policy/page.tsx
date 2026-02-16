import { PrivacyPolicyContent } from '@components/features/legal'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.privacy.description'),
    title: t('seo.privacy.title'),
  }
}

const PrivacyPolicyPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('legal.privacy.title')}>
      <PrivacyPolicyContent />
    </PageWrapper>
  )
}

export default PrivacyPolicyPage
