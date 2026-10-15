import { getButtonClasses } from '@ds/primitives'
import { MountainSnow } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

const HistoryEmptyState = ({ regionId }: { regionId: string }) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      <MountainSnow aria-hidden className="text-disabled size-14" />
      <h2 className="text-title text-ink font-semibold">{t('forecast.history.emptyTitle')}</h2>
      <p className="text-body max-w-md">{t('forecast.history.empty')}</p>
      <Link
        className={getButtonClasses({ variant: 'secondary' })}
        href={routes.regionHome(regionId)}
      >
        {t('forecast.noForecast.backToHome')}
      </Link>
    </div>
  )
}

export default HistoryEmptyState
