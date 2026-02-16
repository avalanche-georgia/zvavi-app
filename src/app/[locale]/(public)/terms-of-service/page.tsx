import { TermsOfServiceContent } from '@components/features/legal'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.terms.description'),
    title: t('seo.terms.title'),
  }
}

const TermsOfServicePage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('legal.terms.title')}>
      <TermsOfServiceContent />
    </PageWrapper>
  )
}

export default TermsOfServicePage
