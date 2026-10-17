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

// A station with a location shows itself on the map when clicked (and its pin
// lights up on hover); one without is listed only
const StationRow = ({ isSelected, locale, onHover, onSelect, station }: StationRowProps) => {
  const t = useTranslations()
  const { altitude, id, latitude, url } = station
  const name = getStationName(station, locale)
  const hasLocation = latitude != null

  const details = (
    <>
      <MapPin
        aria-hidden
        className={cn('size-4.5 shrink-0', hasLocation ? 'text-accent' : 'text-muted')}
      />
      <span className="min-w-0">
        <span className="text-copy text-ink block truncate font-semibold">{name}</span>
        <span className="text-caption text-muted block tabular-nums">
          {t('common.units.meters', { value: altitude })}
          {!hasLocation && ` · ${t('weatherStations.noLocation')}`}
        </span>
      </span>
    </>
  )

  return (
    <li
      className={cn(
        'rounded-media flex min-h-16 items-center gap-2 border pr-3 transition-colors',
        isSelected ? 'border-accent bg-accent-soft' : 'border-rule bg-surface',
      )}
      onMouseEnter={hasLocation ? () => onHover(id) : undefined}
      onMouseLeave={hasLocation ? () => onHover(null) : undefined}
    >
      {hasLocation ? (
        <button
          aria-label={t('weatherStations.selectStation', { name })}
          aria-pressed={isSelected}
          className="focus-ring flex min-w-0 flex-1 items-center gap-2.5 self-stretch rounded-[inherit] py-2 pl-3 text-left"
          onClick={() => onSelect(id)}
          type="button"
        >
          {details}
        </button>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-2.5 py-2 pl-3">{details}</div>
      )}

      <a
        className="focus-ring text-copy text-accent hover:text-accent-hover flex shrink-0 items-center gap-1.5 rounded-sm hover:underline"
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
