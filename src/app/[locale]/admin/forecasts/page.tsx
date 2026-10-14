import { Suspense } from 'react'
import Loading from '@components/features/admin/shared/Loading'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

import ForecastsContainer from './ForecastsContainer'

const ForecastsPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Loading isPage />}>
      <ForecastsContainer initialRegions={initialRegions} />
    </Suspense>
  )
}

export default ForecastsPage
