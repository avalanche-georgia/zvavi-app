'use client'

import { redirect } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { useGetCurrentForecast } from '@/data/hooks/forecasts'

import { Spinner } from '@/UI/components'

import { PageWrapper } from '@/UI/containers'
import Forecast from '@/UI/forecast/Forecast'

const CurrentForecastPage = () => {
  const t = useTranslations()
  const { data: forecast, isPending } = useGetCurrentForecast()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecast) redirect('/')

  return (
    <PageWrapper>
      <Forecast forecast={forecast} />
    </PageWrapper>
  )
}

export default CurrentForecastPage
