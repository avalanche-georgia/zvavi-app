import { hazardIcons } from '@components/constants'
import { Icon } from '@components/icons'
import { hazardLevelNamesByScale } from '@domain/constants'
import { format } from 'date-fns'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import type { ForecastItem } from './groupForecastsBySeasonAndMonth'
import { getDateFnsLocale } from './groupForecastsBySeasonAndMonth'

import { routes } from '@/routes'

type HistoryForecastRowProps = {
  forecast: ForecastItem
  regionId: string
}

const HistoryForecastRow = ({ forecast, regionId }: HistoryForecastRowProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const dateFnsLocale = getDateFnsLocale(locale)

  const dateRange = forecast.validUntil
    ? `${format(new Date(forecast.publishedAt!), 'dd MMM', { locale: dateFnsLocale })} – ${format(new Date(forecast.validUntil), 'dd MMM yyyy', { locale: dateFnsLocale })}`
    : format(new Date(forecast.publishedAt!), 'dd MMM yyyy', { locale: dateFnsLocale })

  return (
    <Link
      className="group hover:bg-primary/7 flex h-16 items-center gap-3.5 rounded-[10px] px-2 transition-colors"
      href={routes.forecastsByRegion(regionId).view(forecast.id)}
    >
      <Image
        alt={t('forecast.history.hazardIconAlt')}
        height={48}
        src={hazardIcons[forecast.hazardLevels.overall]}
        width={48}
      />

      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-gray-800">
          {t(hazardLevelNamesByScale[forecast.hazardLevels.overall])}
        </div>
        <div className="mt-0.5 text-xs text-gray-500">{dateRange}</div>
      </div>

      <Icon
        className="group-hover:text-primary text-gray-300 transition-[color,transform] group-hover:translate-x-0.5"
        containerClassName="shrink-0"
        icon="chevronRight"
        size="sm"
      />
    </Link>
  )
}

export default HistoryForecastRow
