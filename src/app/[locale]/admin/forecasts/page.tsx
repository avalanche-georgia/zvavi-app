'use client'

import { ForecastsList } from '@components/features/admin/Forecasts/ForecastsList'
import { Spinner } from '@components/shared'
import { useForecastsQuery } from '@data/hooks'
import { useTranslations } from 'next-intl'

const ForecastPage = () => {
  const t = useTranslations()
  const { data: forecasts, isPending } = useForecastsQuery()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return <ForecastsList forecasts={forecasts} />
}

export default ForecastPage
