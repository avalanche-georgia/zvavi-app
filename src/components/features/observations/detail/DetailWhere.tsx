import type { PublicObservation } from '@domain/types'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import AspectsOverview from '../AspectsOverview'
import DetailSection from '../DetailSection'
import ElevationZonesInfo from '../ElevationZonesInfo'
import hasCoordinates from '../hasCoordinates'

type DetailWhereProps = {
  observation: Pick<PublicObservation, 'aspects' | 'latitude' | 'longitude'>
  onShowOnMap: VoidFunction
}

const DetailWhere = ({ observation, onShowOnMap }: DetailWhereProps) => {
  const t = useTranslations()

  return (
    <DetailSection
      title={
        <>
          {t('observations.detail.where')} <ElevationZonesInfo />
        </>
      }
    >
      <AspectsOverview aspects={observation.aspects} />

      {/* Legacy observations may have no coordinates — new ones always do */}
      {hasCoordinates(observation) && (
        <button
          className="bg-ink hover:bg-ink/85 rounded-field mt-3 flex h-12 w-full items-center justify-center gap-2 font-semibold text-white transition-colors"
          onClick={onShowOnMap}
          type="button"
        >
          <MapPin className="size-4.5" />
          {t('observations.detail.showOnMap')}
        </button>
      )}
    </DetailSection>
  )
}

export default DetailWhere
