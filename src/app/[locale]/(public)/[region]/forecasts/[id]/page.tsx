import { ForecastPage, LiveForecast } from '@components/features/forecast'
import { fetchForecastPageData } from '@data/queries/fetchForecastPageData'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import fetchForecastSponsors from './fetchForecastSponsors'
import getForecastMetadata from './getForecastMetadata'

type ForecastPageProps = { params: Promise<{ id: string; locale: string; region: string }> }

export const generateMetadata = async ({ params }: ForecastPageProps): Promise<Metadata> =>
  getForecastMetadata(await params)

// A forecast by id. A past one doesn't change, so it renders straight from the server
// (no supabase-js in the browser). The current one — reached by "next" from yesterday's,
// or the admin's public link — stays live like the current forecast page.
const ForecastByIdPage = async (props: ForecastPageProps) => {
  const params = await props.params
  const forecastId = Number(params.id)

  if (Number.isNaN(forecastId)) {
    notFound()
  }

  const [data, partners] = await Promise.all([
    fetchForecastPageData(forecastId),
    fetchForecastSponsors(),
  ])

  if (!data) {
    notFound()
  }

  if (data.isCurrentForecast) {
    return (
      <LiveForecast
        forecasterProfile={data.forecasterProfile}
        initialForecast={data.initialForecast}
        initialPartners={partners}
        isCurrentForecast
        nextForecastId={data.nextForecastId}
        previousForecastId={data.previousForecastId}
      />
    )
  }

  return (
    <ForecastPage
      forecast={data.initialForecast}
      forecasterProfile={data.forecasterProfile}
      isCurrentForecast={data.isCurrentForecast}
      nextForecastId={data.nextForecastId}
      partners={partners}
      previousForecastId={data.previousForecastId}
    />
  )
}

export default ForecastByIdPage
