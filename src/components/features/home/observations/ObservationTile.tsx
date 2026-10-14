'use client'

import { PhotoPlaceholder, useCardDateLabel } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import { FallbackImage } from '@components/ui'
import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'
import { Link } from 'src/i18n/navigation'

import { routes } from '@/routes'

// Photo, "Avalanche · Size 2", "Wind slab · Natural", where · when.
// Opens the observation on its region's page.
const ObservationTile = ({ observation }: { observation: PublicObservation }) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const getDateLabel = useCardDateLabel()
  const { aspects, id, photos, regionId, size, trigger, type } = observation
  const [firstPhoto] = photos

  const title = [
    t(`common.avalancheTypes.${type ?? 'unknown'}`),
    trigger && trigger !== 'unknown' ? t(`common.avalancheTriggers.${trigger}`) : null,
  ]
  const meta = [getSummary(aspects), getDateLabel(observation, 'occurred')]

  return (
    <Link
      className="focus-ring rounded-media border-rule bg-surface text-ink hover:border-rule-strong flex flex-col overflow-hidden border transition-colors"
      href={routes.observationsByRegion(regionId).view(id)}
    >
      <span className="bg-tile block aspect-16/10">
        {firstPhoto ? (
          <FallbackImage
            alt=""
            className="size-full object-cover"
            fallback={<PhotoPlaceholder />}
            loading="lazy"
            sources={[firstPhoto.previewUrl, firstPhoto.thumbUrl]}
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </span>
      <span className="block px-3.5 pt-3 pb-3.5">
        <span className="text-alert-ink block text-[11px] font-semibold tracking-[.05em] uppercase">
          {t('home.observations.avalancheTag', { size })}
        </span>
        <b className="text-copy mt-0.5 block font-semibold">{title.filter(Boolean).join(' · ')}</b>
        <span className="text-caption text-muted mt-0.5 block">
          {meta.filter(Boolean).join(' · ')}
        </span>
      </span>
    </Link>
  )
}

export default ObservationTile
