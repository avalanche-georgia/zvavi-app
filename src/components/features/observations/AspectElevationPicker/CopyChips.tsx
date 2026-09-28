import { hasSameAspects } from '@domain/aspects'
import { sortedElevationZones } from '@domain/constants'
import type { Aspect, Aspects, ElevationZone } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type CopyChipsProps = {
  activeZone: ElevationZone
  onZoneChange: (zone: ElevationZone, aspects: Aspect[]) => void
  value: Aspects
}

// Copy the active zone's aspects to another zone. A highlighted chip means that
// zone already matches — pressing it clears the zone instead.
const CopyChips = ({ activeZone, onZoneChange, value }: CopyChipsProps) => {
  const t = useTranslations()
  const sourceAspects = value[activeZone]
  const isDisabled = sourceAspects.length === 0
  const targetZones = sortedElevationZones.filter((zone) => zone !== activeZone)

  const handleChipClick = (zone: ElevationZone, isMatched: boolean) =>
    onZoneChange(zone, isMatched ? [] : sourceAspects)

  return (
    <div className="text-muted flex flex-wrap items-center gap-1.5 text-[13px]">
      <span className="mr-0.5">{t('common.aspectElevationPicker.sameAspectsOn')}</span>
      {targetZones.map((zone) => {
        const isMatched = !isDisabled && hasSameAspects(sourceAspects, value[zone])

        return (
          <button
            key={zone}
            aria-pressed={isMatched}
            className={cn(
              'h-11 rounded-full border px-3.5 font-semibold whitespace-nowrap transition-colors duration-120 sm:h-8',
              'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
              'disabled:border-rule disabled:text-body disabled:opacity-45',
              isMatched
                ? 'border-accent bg-accent-soft text-accent-hover'
                : 'border-rule text-body hover:border-accent hover:text-accent bg-white',
            )}
            disabled={isDisabled}
            onClick={() => handleChipClick(zone, isMatched)}
            type="button"
          >
            {t(`common.elevationZones.${zone}`)}
          </button>
        )
      })}
    </div>
  )
}

export default CopyChips
