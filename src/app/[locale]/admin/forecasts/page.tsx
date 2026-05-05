'use client'

import { ForecastsList } from '@components/features/admin/Forecasts/ForecastsList'
import { Spinner } from '@components/ui'
import { useForecastsQuery } from '@data/hooks'
import { regionIds } from '@domain/constants'
import { useTranslations } from 'next-intl'

const ForecastPage = () => {
  const t = useTranslations()
  // TODO(PR 3): replace with regionId from admin route/context
  const regionIdMock = regionIds.gudauri
  const { data: forecasts, isPending } = useForecastsQuery(regionIdMock)

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecasts) return null

  return <ForecastsList forecasts={forecasts} />
}

export default ForecastPage
