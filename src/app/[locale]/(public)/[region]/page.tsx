import { RegionHome } from '@components/features/regionHome'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'
import { notFound } from 'next/navigation'

import fetchRegionHomeData from './fetchRegionHomeData'

type RegionHomePageProps = { params: Promise<{ region: string }> }

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
      partners={data.partners}
      recentAvalanches={data.recentAvalanches}
      regionId={region.id}
      weatherStationsCount={data.weatherStationsCount}
    />
  )
}

export default RegionHomePage
