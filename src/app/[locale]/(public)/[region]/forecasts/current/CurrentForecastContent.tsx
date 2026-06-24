'use client'

import { Forecast } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { ButtonLink } from '@components/shared'
import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { useRegionContext } from '@domain/context/RegionContext'
import { Snowflake } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { routes } from '@/routes'

const CurrentForecastContent = () => {
  const t = useTranslations()
  const { region } = useRegionContext()
  const { data: forecast, isPending } = useGetCurrentForecast({ regionId: region!.id })

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecast) {
    return (
      <PageWrapper
        title={t('forecast.pageTitle', { regionName: t(`regions.names.${region!.id}`) })}
      >
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <Snowflake className="text-gray-300" size={56} />
          <h1 className="text-2xl font-semibold text-gray-900">{t('forecast.noForecast.title')}</h1>
          <p className="max-w-md text-gray-600">{t('forecast.noForecast.message')}</p>
          <ButtonLink href={routes.home}>{t('forecast.noForecast.backToHome')}</ButtonLink>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title={t('forecast.pageTitle', { regionName: t(`regions.names.${region!.id}`) })}>
      <Forecast forecast={forecast} regionId={region!.id} />
    </PageWrapper>
  )
}

export default CurrentForecastContent
