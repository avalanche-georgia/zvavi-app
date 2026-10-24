import { PageContent } from '@components/features/join'
import { ContentPage } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('seo.joinUs.description'),
    locale,
    path: routes.about.joinUs,
    title: t('seo.joinUs.title'),
  })
}

const JoinUsPage = () => {
  const t = useTranslations()

  return (
    <ContentPage lede={t('joinUs.page.description')} title={t('navigation.joinUs')}>
      <PageContent />
    </ContentPage>
  )
}

export default JoinUsPage
