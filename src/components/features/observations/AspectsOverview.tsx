import type { Aspects } from '@domain/types'
import { useTranslations } from 'next-intl'

import { getZonesWithAspects } from './aspectSummary'
import BandCompass from './BandCompass'
import useAspectSummary from './useAspectSummary'

// One compass per elevation band with aspects, plus a one-line summary
const AspectsOverview = ({ aspects }: { aspects: Aspects }) => {
  const t = useTranslations()
  const getAspectSummary = useAspectSummary()
  const summary = getAspectSummary(aspects)

  if (!summary) {
    return <p className="text-body text-sm">{t('observations.detail.aspectsNotReported')}</p>
  }

  return (
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
  )
}

export default AspectsOverview
