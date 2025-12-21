'use client'

import Forecast from '@components/features/forecast/Forecast'
import { PageWrapper } from '@components/layout'
import { Spinner } from '@components/shared'
import { useGetCurrentForecast } from '@data/hooks/forecasts'
import { useLocale, useTranslations } from 'next-intl'
import { redirect } from 'src/i18n/navigation'

const CurrentForecastPage = () => {
  const t = useTranslations()
  const currentLocale = useLocale()
  const { data: forecast, isPending } = useGetCurrentForecast()

  if (isPending) return <Spinner label={t('common.labels.wait')} size="lg" />

  if (!forecast) return redirect({ href: '/', locale: currentLocale })

  return (
    <PageWrapper>
      <Forecast forecast={forecast} />
    </PageWrapper>
  )
}

export default CurrentForecastPage
