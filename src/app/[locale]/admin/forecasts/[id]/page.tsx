'use client'

import { ForecastView } from '@components/features/admin/Forecasts/ForecastView'
import { useParams } from 'next/navigation'

const ForecastViewPage = () => {
  const params = useParams<{ id: string }>()

  return <ForecastView forecastId={Number(params.id)} />
}

export default ForecastViewPage
