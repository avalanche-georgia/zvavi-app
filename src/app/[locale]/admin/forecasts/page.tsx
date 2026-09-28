import { Suspense } from 'react'
import { Spinner } from '@components/ui'
import fetchActiveRegions from '@data/queries/fetchActiveRegions'

import ForecastsContainer from './ForecastsContainer'

const ForecastsPage = async () => {
  const initialRegions = await fetchActiveRegions()

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <ForecastsContainer initialRegions={initialRegions} />
    </Suspense>
  )
}

export default ForecastsPage
