import { MemberApplicationFlow } from '@components/features/members/MemberApplicationForm'
import type { Metadata } from 'next'
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

const ApplyPage = () => <MemberApplicationFlow />

export default ApplyPage
