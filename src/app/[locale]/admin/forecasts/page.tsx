'use client'

import { useGetForecasts } from '@/data/hooks'

import { Spinner } from '@/UI/components'

import { ForecastsList } from '@/UI/admin/Forecasts/ForecastsList'

const ForecastPage = () => {
  const { data: forecasts, isPending } = useGetForecasts()

  if (isPending) return <Spinner size="lg" />

  if (!forecasts) return null

  return <ForecastsList forecasts={forecasts} />
}

export default ForecastPage
