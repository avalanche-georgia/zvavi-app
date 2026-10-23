import { MemberApplicationFlow } from '@components/features/members/MemberApplicationForm'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('joinUs.apply.description'),
    locale,
    path: routes.about.apply,
    title: t('joinUs.apply.title'),
  })
}

const ApplyPage = () => <MemberApplicationFlow />

export default ApplyPage
