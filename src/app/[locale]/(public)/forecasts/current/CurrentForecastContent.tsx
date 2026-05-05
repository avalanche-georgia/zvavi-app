'use client'

import { Forecast } from '@components/features/forecast'
import { PageWrapper } from '@components/layout'
import { Spinner } from '@components/ui'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { regionIds } from '@domain/constants'
import { useLocale, useTranslations } from 'next-intl'
import { redirect } from 'src/i18n/navigation'

const CurrentForecastContent = () => {
  const t = useTranslations()
  const currentLocale = useLocale()
  // TODO(PR 4): replace with regionId from RegionContext
  const regionIdMock = regionIds.gudauri
  const { data: forecast, isPending } = useGetCurrentForecast({ regionId: regionIdMock })

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecast) return redirect({ href: '/', locale: currentLocale })

  return (
    <PageWrapper>
      <Forecast forecast={forecast} />
    </PageWrapper>
  )
}

export default CurrentForecastContent
