'use client'

import useForecastDates from '@components/features/forecast/model/useForecastDates'
import { hazardLevelNamesByScale } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import DangerTile from './DangerTile'
import type { HeroRegion } from '../types'

import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type RegionListRowProps = {
  isHighlighted: boolean
  onHover: (regionId: HeroRegion['id'] | null) => void
  region: HeroRegion
}

// Danger tile, region name, when issued · level name. Leads to the forecast,
// or to the previous ones while none has been published this season.
const forecastStates = new Set(['current', 'expired', 'noRating'])

const RegionListRow = ({ isHighlighted, onHover, region }: RegionListRowProps) => {
  const t = useTranslations()
  const { formatTime } = useForecastDates()
  const { id, issuedAt, state, validUntil } = region
  const level = state === 'current' ? region.level : null
  const forecastRoutes = routes.forecastsByRegion(id)

  const hasForecast = forecastStates.has(state)

  const getMeta = () => {
    if (state === 'expired') return t('home.regions.expired')
    if (state === 'offSeason') return t('home.regions.nextForecast')
    if (!issuedAt || !validUntil) return t('home.regions.noForecastToday')

    return t('home.regions.issued', {
      time: formatTime(issuedAt),
      validUntil: formatTime(validUntil),
    })
  }

  const getStatus = () => {
    if (level) return t(hazardLevelNamesByScale[level])
    if (state === 'noRating') return t(hazardLevelNamesByScale['0'])
    if (state === 'expired') return t('home.regions.expiredStatus')

    return state === 'offSeason' ? t('home.regions.offSeason') : t('home.regions.notIssued')
  }

  return (
    <Link
      className={cn(
        'group focus-ring text-ink grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3.5 py-3 pr-3.5 pl-3 transition-colors',
        isHighlighted ? 'bg-canvas' : 'hover:bg-canvas',
      )}
      href={hasForecast ? forecastRoutes.current : forecastRoutes.history}
      onBlur={() => onHover(null)}
      onFocus={() => onHover(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <DangerTile level={level} />
      <span className="min-w-0">
        <b
          className={cn(
            'text-copy-lg block font-semibold underline-offset-3 group-hover:underline',
            isHighlighted && 'underline',
          )}
        >
          {t(`regions.names.${id}`)}
        </b>
        <span className="text-caption text-muted mt-0.5 block">{getMeta()}</span>
      </span>
      <span className="text-copy-sm text-right font-semibold">{getStatus()}</span>
    </Link>
  )
}

export default RegionListRow
