import { SizeTile } from '@components/features/observations'
import { useAspectSummary, useFormatTimeOfDay } from '@components/hooks'
import { getZonesWithAspects } from '@domain/aspects'
import type { PublicAvalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import Prose from './Prose'
import ZoneAspectDots from './ZoneAspectDots'
import { emptyAspects } from '../model/aspects'
import useForecastDates from '../model/useForecastDates'

import { cn } from '@/lib/utils'

type AvalancheCardProps = {
  avalanche: PublicAvalanche
  isSelected: boolean
  onOpen: VoidFunction
}

// A linked avalanche record: size tile, type ×quantity, trigger · bands, a
// two-line description, then where / when. Opens the record's sheet — the
// title is the button, stretched over the whole card.
const AvalancheCard = ({ avalanche, isSelected, onOpen }: AvalancheCardProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { formatDate } = useForecastDates()
  const { withTime } = useFormatTimeOfDay()
  const { date, description, isDateUnknown, location, quantity, size, trigger, type } = avalanche
  // Old records may have no aspects at all
  const aspects = avalanche.aspects ?? emptyAspects

  const zoneLabels = getZonesWithAspects(aspects).map((zone) => t(`common.elevationZones.${zone}`))
  const aspectSummary = getSummary(aspects)
  const dateLabel =
    isDateUnknown || !date
      ? t('observations.labels.dateUnknown')
      : withTime(formatDate(date), avalanche)
  const details = [dateLabel, location].filter(Boolean)

  return (
    <div
      className={cn(
        'bg-surface rounded-card relative grid grid-cols-[48px_minmax(0,1fr)] gap-3 border p-3',
        'transition-[border-color,box-shadow] duration-100',
        isSelected ? 'border-primary ring-primary ring-1' : 'border-rule hover:border-rule-strong',
      )}
    >
      <SizeTile size={size} />
      <div className="min-w-0">
        <div className="text-ink text-copy-lg flex items-baseline gap-1.5 font-semibold tracking-[-.01em]">
          <button
            aria-haspopup="dialog"
            className="focus-visible:after:outline-accent after:rounded-card text-left outline-hidden after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-2"
            onClick={onOpen}
            type="button"
          >
            {t(`common.avalancheTypes.${type}`)}
          </button>
          {quantity > 1 && (
            <span className="bg-tile text-muted rounded-badge text-caption px-1.5 py-0.5 font-semibold">
              {t('observations.card.quantity', { count: quantity })}
            </span>
          )}
        </div>
        <div className="text-body text-copy-sm mt-0.5">
          {[t(`common.avalancheTriggers.${trigger}`), ...zoneLabels].join(' · ')}
        </div>
        {description && (
          <Prose
            className="text-body text-copy-sm mt-1.5 line-clamp-2 block"
            content={description}
          />
        )}
        <div className="text-muted text-caption mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {aspectSummary && (
            <span className="flex items-center gap-2">
              <ZoneAspectDots aspects={aspects} />
              {aspectSummary}
            </span>
          )}
          {details.map((detail) => (
            <span key={detail}>{detail}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AvalancheCard
