import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import DetailFacts from './DetailFacts'
import DetailPhotos from './DetailPhotos'
import DetailReporter from './DetailReporter'
import DetailSection from './DetailSection'
import DetailTitle from './DetailTitle'
import DetailWhere from './DetailWhere'

type DetailBodyProps = {
  observation: PublicObservation
  onShowOnMap: VoidFunction
}

const DetailBody = ({ observation, onShowOnMap }: DetailBodyProps) => {
  const t = useTranslations()
  const { description, photos, submitterName } = observation

  return (
    <div className="pb-8">
      {photos.length > 0 && <DetailPhotos photos={photos} />}
      <DetailTitle observation={observation} />
      <DetailFacts observation={observation} />
      <DetailWhere observation={observation} onShowOnMap={onShowOnMap} />

      {description && (
        <DetailSection title={t('observations.detail.description')}>
          <p className="text-ink m-0 text-[15px] leading-[1.55] whitespace-pre-wrap">
            {description}
          </p>
        </DetailSection>
      )}

      <DetailReporter name={submitterName} />
    </div>
  )
}

export default DetailBody
