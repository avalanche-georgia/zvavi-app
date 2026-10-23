import { PageContent } from '@components/features/weatherStations'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return getPageMetadata({
    description: t('seo.weatherStations.description'),
    locale,
    path: routes.weatherStations,
    title: t('seo.weatherStations.title'),
  })
}

// Full-height split layout (list | map) — the page renders its own heading
const Page = () => <PageContent />

export default Page
