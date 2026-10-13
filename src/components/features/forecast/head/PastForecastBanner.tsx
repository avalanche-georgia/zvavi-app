import type { RegionId } from '@domain/types'
import { Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Shown above a forecast that is no longer the region's current one
const PastForecastBanner = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <div className="bg-accent-soft text-accent-hover rounded-media text-copy-sm mt-3 flex items-center gap-2.5 py-2.5 pr-3.5 pl-3.5">
      <Clock aria-hidden className="size-4.5 shrink-0" />
      <span className="min-w-0 flex-1">{t('forecast.staleBanner.message')}</span>
      <Link
        className="focus-ring hover:text-accent rounded-sm font-semibold underline-offset-3 hover:underline"
        href={routes.forecastsByRegion(regionId).current}
      >
        {t('forecast.staleBanner.link')} →
      </Link>
    </div>
  )
}

export default PastForecastBanner
