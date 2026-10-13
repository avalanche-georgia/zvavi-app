import { useElevationRanges } from '@components/hooks'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationZone, HazardLevelScale, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import { PyramidZone } from '../HazardLevelsByElevation'

type ElevationRowProps = {
  level: HazardLevelScale
  onInfoOpen: VoidFunction
  regionId: RegionId
  zone: ElevationZone
}

// The pyramid's own slice heights — a row grows past them when its text wraps
const minHeights: Record<ElevationZone, string> = {
  alpine: 'min-h-[59px]',
  highAlpine: 'min-h-20',
  subAlpine: 'min-h-[60px]',
}

// "Considerable" / "High Alpine · above 2600 m" next to its pyramid slice,
// which opens the explanation of that level
const ElevationRow = ({ level, onInfoOpen, regionId, zone }: ElevationRowProps) => {
  const t = useTranslations()
  const getElevationRange = useElevationRanges(regionId)
  const zoneLabel = t(`common.elevationZones.${zone}`)

  return (
    <li className="group grid grid-cols-[minmax(0,1fr)_auto] items-stretch">
      <div className="border-rule flex min-w-0 flex-col justify-center gap-0.5 border-b py-2 pr-3 leading-tight group-last:border-b-0">
        <b className="text-copy-lg font-semibold wrap-anywhere hyphens-auto">
          {t(hazardLevelNamesByScale[level])}
        </b>
        <span className="text-muted text-caption text-balance wrap-anywhere">
          {zoneLabel} · {getElevationRange(zone)}
        </span>
      </div>
      <PyramidZone
        className={minHeights[zone]}
        label={`${t('common.labels.zoneDangerLevel', { zone: zoneLabel })} — ${level}`}
        level={level}
        onClick={onInfoOpen}
        zone={zone}
      />
    </li>
  )
}

export default ElevationRow
