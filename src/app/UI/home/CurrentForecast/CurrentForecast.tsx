import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { HazardLevelBanner } from '@/UI/components/HazardLevelBanner'

import type { Forecast } from '@/business/types'
import { routes } from '@/routes'

const CurrentForecast = ({ forecast }: { forecast: Forecast }) => {
  const t = useTranslations()

  return (
    <section className="space-y-3">
      <Link href={routes.currentForecast}>
        <HazardLevelBanner forecast={forecast} />
      </Link>
      <p className="text-center text-sm text-gray-500">{t('forecast.previewNote')}</p>
    </section>
  )
}

export default CurrentForecast
