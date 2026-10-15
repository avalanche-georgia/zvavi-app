import { AboutUsContent } from '@components/features/about'
import { ContentPage } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.about.aboutUs),
    description: t('seo.about.description'),
    title: t('seo.about.title'),
  }
}

const AboutUsPage = () => {
  const t = useTranslations()

  return (
    <ContentPage lede={t('about.lede')} title={t('navigation.aboutUs')}>
      <AboutUsContent />
    </ContentPage>
  )
}

export default AboutUsPage
