import { useElevationRanges } from '@components/hooks'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationZone, HazardLevelScale, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import ElevationSlice from './ElevationSlice'
import { sliceHeights } from './slope'

type ElevationRowProps = {
  level: HazardLevelScale
  onInfoOpen: VoidFunction
  regionId: RegionId
  zone: ElevationZone
}

// "Considerable" / "High Alpine · above 2600 m" next to its pyramid slice,
// which opens the explanation of that level
const ElevationRow = ({ level, onInfoOpen, regionId, zone }: ElevationRowProps) => {
  const t = useTranslations()
  const getElevationRange = useElevationRanges(regionId)
  const zoneLabel = t(`common.elevationZones.${zone}`)

  return (
    <li
      className="group grid grid-cols-[minmax(0,1fr)_auto] items-stretch"
      // The slice sets the row's height — the mountain keeps its shape
      style={{ height: sliceHeights[zone] }}
    >
      <div className="border-rule flex min-w-0 flex-col justify-center gap-0.5 border-b py-1 pr-3 leading-tight group-last:border-b-0">
        <b className="text-copy-lg font-semibold wrap-anywhere hyphens-auto">
          {t(hazardLevelNamesByScale[level])}
        </b>
        <span className="text-muted text-caption text-balance wrap-anywhere">
          {zoneLabel} · {getElevationRange(zone)}
        </span>
      </div>
      <ElevationSlice
        label={`${t('common.labels.zoneDangerLevel', { zone: zoneLabel })} — ${level}`}
        level={level}
        onClick={onInfoOpen}
        zone={zone}
      />
    </li>
  )
}

export default ElevationRow
