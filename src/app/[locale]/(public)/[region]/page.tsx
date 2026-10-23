import { RegionHome } from '@components/features/regionHome'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import fetchRegionHomeData from './fetchRegionHomeData'

import { requireKnownRegion } from '@/lib/regionRouting'
import getPageMetadata from '@/lib/seo/getPageMetadata'
import { routes } from '@/routes'

type RegionHomePageProps = { params: Promise<{ region: string }> }

export const generateMetadata = async ({ params }: RegionHomePageProps): Promise<Metadata> => {
  const [{ region: regionId }, locale, t] = await Promise.all([
    params,
    getLocale(),
    getTranslations(),
  ])

  requireKnownRegion(regionId)

  const regionName = t(`regions.names.${regionId}`)

  return getPageMetadata({
    description: t('seo.regionHome.description', { regionName }),
    locale,
    path: routes.regionHome(regionId),
    title: t('seo.regionHome.title', { regionName }),
  })
}

const RegionHomePage = async ({ params }: RegionHomePageProps) => {
  const { region: regionParam } = await params
  const regions = await fetchActiveRegions()
  // The layout answers unknown regions with a 404 too, but it doesn't stop
  // this page from running — and its queries need a real region id
  const region = regions.find(({ id }) => id === regionParam)

  if (!region) notFound()

  const data = await fetchRegionHomeData(region.id)

  return (
    <RegionHome
      forecast={data.forecast}
      forecasterProfile={data.forecasterProfile}
      partners={data.partners}
      recentAvalanches={data.recentAvalanches}
      regionId={region.id}
      state={data.state}
      weatherStationsCount={data.weatherStationsCount}
    />
  )
}

export default RegionHomePage
