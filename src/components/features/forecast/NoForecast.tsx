import type { RegionId } from '@domain/types'
import { getButtonClasses } from '@ds/primitives'
import { UserRoundSearch } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// The current-forecast page of a region that has never had a forecast
const NoForecast = ({ regionId }: { regionId: RegionId }) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <UserRoundSearch aria-hidden className="text-disabled size-14" />
      <h2 className="text-title text-ink font-semibold">{t('forecast.noForecaster.title')}</h2>
      <p className="text-body max-w-md">{t('forecast.noForecaster.message')}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link className={getButtonClasses()} href={routes.about.joinUs}>
          {t('forecast.noForecaster.action')}
        </Link>
        <Link
          className={getButtonClasses({ variant: 'secondary' })}
          href={routes.regionHome(regionId)}
        >
          {t('navigation.overview')}
        </Link>
      </div>
    </div>
  )
}

export default NoForecast
