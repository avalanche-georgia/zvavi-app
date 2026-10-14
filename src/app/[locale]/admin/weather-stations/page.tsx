import { Suspense } from 'react'
import Loading from '@components/features/admin/shared/Loading'

import WeatherStationsContainer from './WeatherStationsContainer'

const WeatherStationsPage = () => (
  <Suspense fallback={<Loading isPage />}>
    <WeatherStationsContainer />
  </Suspense>
)

export default WeatherStationsPage
