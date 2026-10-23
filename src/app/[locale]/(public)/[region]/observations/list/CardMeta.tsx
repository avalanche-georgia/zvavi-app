import { MiniCompass, useCardDateLabel } from '@components/features/observations'
import { getAllAspects, getZonesWithAspects } from '@domain/aspects'
import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { Badge } from '@ds/primitives'
import { useTranslations } from 'next-intl'

type CardMetaProps = {
  dateBasis: ObservationDateBasis
  observation: PublicObservation
}

// Bottom line of a card: slopes, place, who, when
const CardMeta = ({ dateBasis, observation }: CardMetaProps) => {
  const t = useTranslations()
  const getDateLabel = useCardDateLabel()
  const { aspects, location, source, submitterName } = observation

  return (
    <div className="text-muted text-caption mt-2 flex flex-wrap items-center gap-2.5">
      {getZonesWithAspects(aspects).length > 0 && <MiniCompass aspects={getAllAspects(aspects)} />}
      {location && <span className="min-w-0 truncate">{location}</span>}
      {submitterName && <span>{submitterName}</span>}
      {source === 'team' && <Badge>{t('common.avalancheSources.team')}</Badge>}
      <span>{getDateLabel(observation, dateBasis)}</span>
    </div>
  )
}

export default CardMeta
