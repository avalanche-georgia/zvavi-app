import { PrivacyPolicyContent } from '@components/features/legal'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('seo.privacy.description'),
    locale,
    path: routes.privacy,
    title: t('seo.privacy.title'),
  })
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
