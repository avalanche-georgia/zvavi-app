import {
  BandCompass,
  getZonesWithAspects,
  useAspectSummary,
} from '@components/features/observations'
import type { PublicObservation } from '@domain/types'
import { MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

import DetailSection from './DetailSection'
import hasCoordinates from '../helpers/hasCoordinates'

type DetailWhereProps = {
  observation: PublicObservation
  onShowOnMap: VoidFunction
}

const DetailWhere = ({ observation, onShowOnMap }: DetailWhereProps) => {
  const t = useTranslations()
  const getAspectSummary = useAspectSummary()
  const { aspects } = observation
  const summary = getAspectSummary(aspects)

  return (
    <DetailSection title={t('observations.detail.where')}>
      {summary ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            {getZonesWithAspects(aspects).map((zone) => (
              <BandCompass
                key={zone}
                aspects={aspects[zone]}
                label={t(`common.elevationZones.${zone}`)}
              />
            ))}
          </div>
          <p className="text-body mt-2.5 text-sm leading-normal">{summary}</p>
        </>
      ) : (
        <p className="text-body text-sm">{t('observations.detail.aspectsNotReported')}</p>
      )}

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
