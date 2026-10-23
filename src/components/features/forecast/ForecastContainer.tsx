'use client'

import { Loading } from '@components/shared'
import { useGetForecast } from '@data/hooks/forecasts'
import { usePartnersQuery } from '@data/hooks/partners'
import type { ForecastPageData } from '@data/queries/fetchForecastPageData'
import type { Partner } from '@domain/types'

import ForecastPage from './ForecastPage'

// The current forecast: renders the server-loaded forecast at once and keeps it (and its
// sponsors) fresh in the browser. Past forecasts don't change — they render ForecastPage
// straight from the server.
type ForecastContainerProps = ForecastPageData & {
  // Seeds the sponsors query when the server already loaded them
  initialPartners?: Partner[]
}

const ForecastContainer = (props: ForecastContainerProps) => {
  const {
    forecasterProfile,
    initialForecast,
    initialPartners,
    isCurrentForecast,
    nextForecastId,
    previousForecastId,
  } = props
  const { data: forecast, isPending } = useGetForecast({
    forecastId: initialForecast.id,
    initialData: initialForecast,
    // The forecast's own region — the one in the URL may be wrong
    regionId: initialForecast.regionId,
  })
  const { data: partners = [] } = usePartnersQuery(initialPartners)

  if (isPending || !forecast) {
    return <Loading isPage />
  }

  return (
    <ForecastPage
      forecast={forecast}
      forecasterProfile={forecasterProfile}
      isCurrentForecast={isCurrentForecast}
      nextForecastId={nextForecastId}
      partners={partners}
      previousForecastId={previousForecastId}
    />
  )
}

export default ForecastContainer
