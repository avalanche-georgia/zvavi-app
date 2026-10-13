import { RegionHome } from '@components/features/regionHome'
import type { RegionId } from '@domain/types'

import fetchRegionHomeData from './fetchRegionHomeData'

type RegionHomePageProps = { params: Promise<{ region: string }> }

const RegionHomePage = async ({ params }: RegionHomePageProps) => {
  const { region } = await params
  // Validated by the region layout
  const regionId = region as RegionId
  const data = await fetchRegionHomeData(regionId)

  return (
    <RegionHome
      forecast={data.forecast}
      partners={data.partners}
      recentAvalanches={data.recentAvalanches}
      regionId={regionId}
      weatherStationsCount={data.weatherStationsCount}
    />
  )
}

export default RegionHomePage
