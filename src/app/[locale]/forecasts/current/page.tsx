'use client'

import { useLocale, useTranslations } from 'next-intl'
import { redirect } from 'src/i18n/navigation'

import { useGetCurrentForecast } from '@/data/hooks/forecasts'

import { Spinner } from '@/UI/components'

import { PageWrapper } from '@/UI/containers'
import Forecast from '@/UI/forecast/Forecast'

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
