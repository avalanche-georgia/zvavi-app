import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import DetailFacts from './DetailFacts'
import DetailReporter from './DetailReporter'
import DetailTitle from './DetailTitle'
import DetailWhere from './DetailWhere'
import DetailSection from '../DetailSection'
import PhotoStrip from '../PhotoStrip'

type DetailBodyProps = {
  observation: PublicObservation
  onShowOnMap: VoidFunction
}

const DetailBody = ({ observation, onShowOnMap }: DetailBodyProps) => {
  const t = useTranslations()
  const { description, photos, source, submitterAvatarUrl, submitterName } = observation

  return (
    <div className="pb-8">
      {photos.length > 0 && <PhotoStrip photos={photos} />}
      <DetailTitle observation={observation} />
      <DetailFacts observation={observation} />
      <DetailWhere observation={observation} onShowOnMap={onShowOnMap} />

      {description && (
        <DetailSection title={t('observations.detail.description')}>
          <p className="text-ink text-copy-lg m-0 leading-[1.55] whitespace-pre-wrap">
            {description}
          </p>
        </DetailSection>
      )}

      <DetailReporter
        avatarUrl={submitterAvatarUrl}
        isTeam={source === 'team'}
        name={submitterName}
      />
    </div>
  )
}

export default DetailBody
