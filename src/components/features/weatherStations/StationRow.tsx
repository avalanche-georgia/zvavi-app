'use client'

import type { WeatherStation } from '@domain/types'
import { ExternalLink, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import getStationName from './getStationName'

import { cn } from '@/lib/utils'

type StationRowProps = {
  isSelected: boolean
  locale: string
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
  station: WeatherStation
}

// Clicking a station shows it on the map; hovering lights up its pin
const StationRow = ({ isSelected, locale, onHover, onSelect, station }: StationRowProps) => {
  const t = useTranslations()
  const { altitude, id, url } = station
  const name = getStationName(station, locale)

  return (
    <li
      className={cn(
        'rounded-media flex min-h-16 items-center gap-2 border pr-3 transition-colors',
        isSelected
          ? 'border-accent bg-accent-soft'
          : 'border-rule bg-surface hover:border-rule-strong',
      )}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      <button
        aria-label={t('weatherStations.selectStation', { name })}
        aria-pressed={isSelected}
        // The row's own radius, so the focus ring follows it
        // eslint-disable-next-line no-restricted-syntax
        className="focus-ring flex min-w-0 flex-1 items-center gap-2.5 self-stretch rounded-[inherit] py-2 pl-3 text-left"
        onClick={() => onSelect(id)}
        type="button"
      >
        <MapPin aria-hidden className="text-accent size-4.5 shrink-0" />
        <span className="min-w-0">
          <span className="text-copy text-ink block truncate font-semibold">{name}</span>
          <span className="text-caption text-muted block tabular-nums">
            {t('common.units.meters', { value: altitude })}
          </span>
        </span>
      </button>

      <a
        className="focus-ring text-copy text-accent hover:text-accent-hover rounded-badge flex shrink-0 items-center gap-1.5 hover:underline"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('common.actions.open')}
        <ExternalLink aria-hidden className="size-3.5" />
      </a>
    </li>
  )
}

export default StationRow
