import { MemberApplicationForm } from '@components/features/members/MemberApplicationForm'
import { ContentPage } from '@components/layout'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.about.apply),
    description: t('joinUs.apply.description'),
    title: t('joinUs.apply.title'),
  }
}

const ApplyPage = () => {
  const t = useTranslations()

  return (
    <ContentPage lede={t('joinUs.apply.description')} title={t('joinUs.apply.title')}>
      <MemberApplicationForm />
    </ContentPage>
  )
}

export default ApplyPage
