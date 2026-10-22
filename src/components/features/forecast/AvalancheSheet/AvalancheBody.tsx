import {
  DetailFacts,
  DetailSection,
  DetailTitle,
  DetailWhere,
  PhotoStrip,
} from '@components/features/observations'
import type { PublicAvalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import { emptyAspects } from '../model/aspects'
import Prose from '../sections/Prose'

type AvalancheBodyProps = {
  avalanche: PublicAvalanche
  onShowOnMap: VoidFunction
}

// A linked avalanche record in full — the same blocks as an observation's
// detail, without the reporter (the forecast speaks for the team here)
const AvalancheBody = ({ avalanche, onShowOnMap }: AvalancheBodyProps) => {
  const t = useTranslations()
  const { description, photos } = avalanche
  // Old records may have no aspects at all
  const record = { ...avalanche, aspects: avalanche.aspects ?? emptyAspects }

  return (
    <div className="pb-[calc(32px+env(safe-area-inset-bottom))]">
      {photos.length > 0 && <PhotoStrip photos={photos} />}
      <DetailTitle observation={record} />
      <DetailFacts observation={record} />
      <DetailWhere observation={record} onShowOnMap={onShowOnMap} />
      {description && (
        <DetailSection title={t('observations.detail.description')}>
          <Prose className="text-copy-lg leading-prose" content={description} />
        </DetailSection>
      )}
    </div>
  )
}

export default AvalancheBody
