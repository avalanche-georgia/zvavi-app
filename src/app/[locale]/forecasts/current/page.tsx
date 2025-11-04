'use client'

import { redirect } from 'next/navigation'

import { useGetCurrentForecast } from '@/data/hooks/forecasts'

import { Spinner } from '@/UI/components'

import { PageWrapper } from '@/UI/containers'
import Forecast from '@/UI/forecast/Forecast'

const CurrentForecastPage = () => {
  const { data: forecast, isPending } = useGetCurrentForecast()

  if (isPending) return <Spinner size="lg" />

  if (!forecast) redirect('/')

  return (
    <PageWrapper>
      <Forecast forecast={forecast} />
    </PageWrapper>
  )
}

export default CurrentForecastPage
