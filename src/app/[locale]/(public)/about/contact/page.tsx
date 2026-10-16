import { PageContent } from '@components/features/contact'
import { ContentPage } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.about.contact),
    description: t('seo.contact.description'),
    title: t('seo.contact.title'),
  }
}

const ContactPage = () => {
  const t = useTranslations()

  return (
    <ContentPage lede={t('contact.description')} title={t('navigation.contact')}>
      <PageContent />
    </ContentPage>
  )
}

export default ContactPage
