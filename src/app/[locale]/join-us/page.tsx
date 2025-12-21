import { PageContent } from '@components/features/join'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.joinUs.description'),
    title: t('seo.joinUs.title'),
  }
}

const JoinUsPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.joinUs')}>
      <PageContent />
    </PageWrapper>
  )
}

export default JoinUsPage
