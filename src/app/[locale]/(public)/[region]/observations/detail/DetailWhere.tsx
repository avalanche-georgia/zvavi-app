import { AspectsOverview, DetailSection } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import hasCoordinates from '../helpers/hasCoordinates'

type DetailWhereProps = {
  observation: PublicObservation
  onShowOnMap: VoidFunction
}

const DetailWhere = ({ observation, onShowOnMap }: DetailWhereProps) => {
  const t = useTranslations()

  return (
    <DetailSection title={t('observations.detail.where')}>
      <AspectsOverview aspects={observation.aspects} />

      {/* Legacy observations may have no coordinates — new ones always do */}
      {hasCoordinates(observation) && (
        <button
          className="bg-ink hover:bg-ink/85 mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-semibold text-white transition-colors"
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
