'use client'

import { useState } from 'react'
import { Alert } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const StaleForecastBanner = () => {
  const t = useTranslations()
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <Alert className="mb-4" onClose={() => setIsDismissed(true)}>
      <p>
        {t('forecast.staleBanner.message')}{' '}
        <Link className="font-semibold whitespace-nowrap underline" href={routes.forecasts.current}>
          {t('forecast.staleBanner.link')} →
        </Link>
      </p>
    </Alert>
  )
}

export default StaleForecastBanner
