import { SizeTile } from '@components/features/observations'
import { getZonesWithAspects } from '@domain/aspects'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import CardMeta from './CardMeta'
import CardThumbnail from './CardThumbnail'

import { cn } from '@/lib/utils'

type ObservationCardProps = {
  className?: string
  dateBasis: ObservationDateBasis
  isSelected?: boolean
  observation: PublicObservation
  // Lights up its pin (or the cluster holding it) on the map. A mobile tap fires
  // mouseenter too, so the page clears the hover when the list unmounts.
  onHover?: (id: number | null) => void
  onOpen: (id: number) => void
}

const ObservationCard = ({
  className,
  dateBasis,
  isSelected = false,
  observation,
  onHover,
  onOpen,
}: ObservationCardProps) => {
  const t = useTranslations()
  const { aspects, description, id, photos, quantity, size, trigger, type } = observation
  const zoneLabels = getZonesWithAspects(aspects)
    .map((zone) => t(`common.elevationZones.${zone}`))
    .join(', ')

  return (
    <button
      className={cn(
        'rounded-card bg-surface grid w-full grid-cols-[48px_minmax(0,1fr)_auto] gap-3 border p-3 text-left',
        'transition-[border-color,box-shadow] duration-100',
        'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        isSelected ? 'border-primary ring-primary ring-1' : 'border-rule hover:border-rule-strong',
        className,
      )}
      onClick={() => onOpen(id)}
      onMouseEnter={onHover && (() => onHover(id))}
      onMouseLeave={onHover && (() => onHover(null))}
      type="button"
    >
      <SizeTile size={size} />

      <div className="min-w-0">
        <div className="text-copy-lg flex items-baseline gap-1.5 font-semibold">
          {t(`common.avalancheTypes.${type}`)}
          {quantity > 1 && (
            <span className="bg-tile text-muted rounded-badge text-caption px-1.5 py-0.5 font-semibold">
              {t('observations.card.quantity', { count: quantity })}
            </span>
          )}
        </div>
        <div className="text-body text-copy-sm mt-0.5">
          {t(`common.avalancheTriggers.${trigger}`)}
          {zoneLabels && ` · ${zoneLabels}`}
        </div>
        {description && <p className="text-body text-copy-sm mt-1.5 line-clamp-2">{description}</p>}
        <CardMeta dateBasis={dateBasis} observation={observation} />
      </div>

      {photos.length > 0 ? <CardThumbnail photos={photos} /> : <div />}
    </button>
  )
}

export default ObservationCard
