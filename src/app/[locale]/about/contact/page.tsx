import { PageContent } from '@components/features/contact'
import { PageWrapper } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations()

  return {
    description: t('seo.contact.description'),
    title: t('seo.contact.title'),
  }
}

const ContactPage = () => {
  const t = useTranslations()

  return (
    <PageWrapper title={t('navigation.contact')}>
      <PageContent />
    </PageWrapper>
  )
}

export default ContactPage
