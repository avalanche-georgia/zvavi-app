import { SizeTile } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import { getZonesWithAspects } from '@domain/aspects'
import type { PublicAvalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import Prose from './Prose'
import ZoneAspectDots from './ZoneAspectDots'
import { emptyAspects } from '../model/aspects'
import useForecastDates from '../model/useForecastDates'

// A linked avalanche record: size tile, type ×quantity, trigger · bands,
// description, then where / when / dimensions
const AvalancheCard = ({ avalanche }: { avalanche: PublicAvalanche }) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { formatDate } = useForecastDates()
  const { date, description, isDateUnknown, location, quantity, size, trigger, type } = avalanche
  const { slabDepth, width } = avalanche
  // Old records may have no aspects at all
  const aspects = avalanche.aspects ?? emptyAspects

  const zoneLabels = getZonesWithAspects(aspects).map((zone) => t(`common.elevationZones.${zone}`))
  const aspectSummary = getSummary(aspects)
  const dateLabel = isDateUnknown || !date ? t('observations.labels.dateUnknown') : formatDate(date)
  const details = [
    dateLabel,
    location,
    width ? t('common.units.meters', { value: width }) : null,
    slabDepth ? t('common.units.centimeters', { value: slabDepth }) : null,
  ].filter(Boolean)

  return (
    <div className="border-rule bg-surface grid grid-cols-[48px_minmax(0,1fr)] gap-3 rounded-[14px] border p-3">
      <SizeTile size={size} />
      <div className="min-w-0">
        <div className="text-ink text-copy-lg flex items-baseline gap-1.5 font-semibold tracking-[-.01em]">
          {t(`common.avalancheTypes.${type}`)}
          {quantity > 1 && (
            <span className="bg-tile text-muted rounded-md px-1.5 py-0.5 text-xs font-semibold">
              {t('observations.card.quantity', { count: quantity })}
            </span>
          )}
        </div>
        <div className="text-body text-copy-sm mt-0.5">
          {[t(`common.avalancheTriggers.${trigger}`), ...zoneLabels].join(' · ')}
        </div>
        {description && <Prose className="text-body text-copy-sm mt-1.5" content={description} />}
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
