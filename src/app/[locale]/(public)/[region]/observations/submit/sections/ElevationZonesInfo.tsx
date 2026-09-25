import { sortedElevationZones } from '@domain/constants'
import { InfoTip } from '@ds/primitives'
import { useTranslations } from 'next-intl'

// Where each band starts and ends — same boundaries as the forecast's
// hazard-by-elevation view
const ElevationZonesInfo = () => {
  const t = useTranslations()

  return (
    <InfoTip ariaLabel={t('observations.submit.elevationZones.label')}>
      <dl className="grid grid-cols-[auto_auto] gap-x-3 gap-y-1">
        {sortedElevationZones.map((zone) => (
          <div key={zone} className="contents">
            <dt className="font-semibold">{t(`common.elevationZones.${zone}`)}</dt>
            <dd>{t(`observations.submit.elevationZones.${zone}`)}</dd>
          </div>
        ))}
      </dl>
    </InfoTip>
  )
}

export default ElevationZonesInfo
