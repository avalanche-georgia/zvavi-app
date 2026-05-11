'use client'

import { Forecast } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'
import { useLocale, useTranslations } from 'next-intl'
import { redirect } from 'src/i18n/navigation'

const CurrentForecastContent = () => {
  const t = useTranslations()
  const currentLocale = useLocale()
  const { region } = useRegionContext()
  const { data: forecast, isPending } = useGetCurrentForecast({ regionId: region!.id })

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecast) return redirect({ href: '/', locale: currentLocale })

  return (
    <PageWrapper title={t('forecast.pageTitle', { regionName: t(`regions.names.${region!.id}`) })}>
      <Forecast forecast={forecast} regionId={region!.id} />
    </PageWrapper>
  )
}

export default CurrentForecastContent
