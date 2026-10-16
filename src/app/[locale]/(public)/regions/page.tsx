import { RegionsPage } from '@components/features/home'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'

import fetchRegionsPageData from './fetchRegionsPageData'

import getAlternates from '@/lib/seo/getAlternates'
import { routes } from '@/routes'

export const generateMetadata = async (): Promise<Metadata> => {
  const [locale, t] = await Promise.all([getLocale(), getTranslations()])

  return {
    alternates: getAlternates(locale, routes.regions),
    description: t('seo.regions.description'),
    title: t('seo.regions.title'),
  }
}

// The region chooser. With a single active region the proxy never lets a request
// get here — it sends it to that region's home.
const Regions = async () => {
  const regions = await fetchActiveRegions()
  const data = await fetchRegionsPageData(regions)

  return <RegionsPage now={data.now} partners={data.partners} regions={data.regions} />
}

export default Regions
