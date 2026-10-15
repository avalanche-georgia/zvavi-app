import { PageContent } from '@components/features/partners'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import fetchActivePartners from './fetchActivePartners'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

// Never cached: the order within each tier is shuffled on every request
export const dynamic = 'force-dynamic'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.partners),
    description: t('seo.partners.description'),
    title: t('seo.partners.title'),
  }
}

const PartnersPage = async () => {
  const partners = await fetchActivePartners()

  return <PageContent partners={partners} />
}

export default PartnersPage
