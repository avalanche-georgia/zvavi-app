'use client'

import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import DangerTile from './DangerTile'
import useRegionStatus from './useRegionStatus'
import type { HeroRegion } from '../types'

import rememberRegion from '@/lib/rememberRegion'
import { cn } from '@/lib/utils'
import { routes } from '@/routes'

type RegionListRowProps = {
  isHighlighted: boolean
  onHover: (regionId: HeroRegion['id'] | null) => void
  region: HeroRegion
}

// Danger tile, region name, when issued · status. Choosing it remembers the
// region and opens its home.
const RegionListRow = ({ isHighlighted, onHover, region }: RegionListRowProps) => {
  const t = useTranslations()
  const { getMeta, getStatus } = useRegionStatus()
  const { id, state } = region
  const level = state === 'current' ? region.level : null

  return (
    <Link
      className={cn(
        'group focus-ring text-ink grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3.5 py-3 pr-3.5 pl-3 transition-colors',
        isHighlighted ? 'bg-canvas' : 'hover:bg-canvas',
      )}
      href={routes.regionHome(id)}
      onBlur={() => onHover(null)}
      onClick={() => rememberRegion(id)}
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
        <span className="text-caption text-muted mt-0.5 block">{getMeta(region)}</span>
      </span>
      <span
        className={cn(
          'text-copy-sm text-right font-semibold',
          state === 'noForecaster' && 'text-muted',
        )}
      >
        {getStatus(region)}
      </span>
    </Link>
  )
}

export default RegionListRow
