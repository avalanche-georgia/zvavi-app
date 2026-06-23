import { Suspense } from 'react'
import { Spinner } from '@components/ui'

import WeatherStationsContainer from './WeatherStationsContainer'

const WeatherStationsPage = () => (
  <Suspense fallback={<Spinner size="lg" />}>
    <WeatherStationsContainer />
  </Suspense>
)

export default WeatherStationsPage
