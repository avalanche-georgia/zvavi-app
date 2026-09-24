import {
  getAllAspects,
  getZonesWithAspects,
  MiniCompass,
  SizeTile,
} from '@components/features/observations'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import CardThumbnail from './CardThumbnail'
import useCardDateLabel from './useCardDateLabel'

import { cn } from '@/lib/utils'

type ObservationCardProps = {
  className?: string
  dateBasis: ObservationDateBasis
  isSelected?: boolean
  observation: PublicObservation
  onOpen: (id: number) => void
}

const ObservationCard = ({
  className,
  dateBasis,
  isSelected = false,
  observation,
  onOpen,
}: ObservationCardProps) => {
  const t = useTranslations()
  const getDateLabel = useCardDateLabel()

  const { aspects, description, id, photos, quantity, size, submitterName, trigger, type } =
    observation
  const zones = getZonesWithAspects(aspects)
  const zoneLabels = zones.map((zone) => t(`common.elevationZones.${zone}`)).join(', ')

  return (
    <button
      className={cn(
        'grid w-full grid-cols-[48px_minmax(0,1fr)_auto] gap-3 rounded-[14px] border bg-white p-3 text-left',
        'transition-[border-color,box-shadow] duration-100',
        'focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2',
        isSelected
          ? 'border-primary shadow-[0_0_0_1px_var(--color-primary)]'
          : 'border-rule hover:border-rule-strong',
        className,
      )}
      onClick={() => onOpen(id)}
      type="button"
    >
      <SizeTile size={size} />

      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5 text-[15.5px] font-semibold tracking-[-.01em]">
          {t(`common.avalancheTypes.${type}`)}
          {quantity > 1 && (
            <span className="bg-tile text-muted rounded-md px-1.5 py-0.5 text-xs font-semibold">
              {t('observations.card.quantity', { count: quantity })}
            </span>
          )}
        </div>
        <div className="text-body mt-0.5 text-[13px]">
          {t(`common.avalancheTriggers.${trigger}`)}
          {zoneLabels && ` · ${zoneLabels}`}
        </div>
        {description && (
          <p className="text-body mt-1.5 line-clamp-2 text-[13.5px] leading-[1.45]">
            {description}
          </p>
        )}
        <div className="text-muted mt-2 flex flex-wrap items-center gap-2.5 text-[12.5px]">
          {zones.length > 0 && <MiniCompass aspects={getAllAspects(aspects)} />}
          {submitterName && <span>{submitterName}</span>}
          <span>{getDateLabel(observation, dateBasis)}</span>
        </div>
      </div>

      {photos.length > 0 ? <CardThumbnail photos={photos} /> : <div />}
    </button>
  )
}

export default ObservationCard
