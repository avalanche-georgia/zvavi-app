'use client'

import { Forecast, NoForecast } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'

const CurrentForecastContent = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const { data: forecast, isPending } = useGetCurrentForecast({ regionId: region!.id })

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  return (
    <PageWrapper title={t('forecast.pageTitle', { regionName: t(`regions.names.${region!.id}`) })}>
      {forecast ? <Forecast forecast={forecast} regionId={region!.id} /> : <NoForecast />}
    </PageWrapper>
  )
}

export default CurrentForecastContent
