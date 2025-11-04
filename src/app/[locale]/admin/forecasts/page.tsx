'use client'

import { useTranslations } from 'next-intl'

import { useGetForecasts } from '@/data/hooks'

import { Spinner } from '@/UI/components'

import { ForecastsList } from '@/UI/admin/Forecasts/ForecastsList'

const ForecastPage = () => {
  const t = useTranslations()
  const { data: forecasts, isPending } = useGetForecasts()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return <ForecastsList forecasts={forecasts} />
}

export default ForecastPage
