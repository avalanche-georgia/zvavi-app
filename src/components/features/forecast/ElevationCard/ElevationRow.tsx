import { backgroundColorByHazardLevel } from '@components/constants'
import { useElevationRanges } from '@components/hooks'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationZone, HazardLevelScale, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import { hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

type ElevationRowProps = {
  level: HazardLevelScale
  onInfoOpen: VoidFunction
  regionId: RegionId
  zone: ElevationZone
}

// One slice of the mountain per band: one slanted left edge
// running down through all three, a straight right edge. Percentages, so a
// taller row stretches it.
const pyramidClipPaths: Record<ElevationZone, string> = {
  alpine: 'polygon(32% 0, 100% 0, 100% 100%, 16% 100%)',
  highAlpine: 'polygon(50% 0, 100% 0, 100% 100%, 34% 100%)',
  subAlpine: 'polygon(14% 0, 100% 0, 100% 100%, 0 100%)',
}

// "Considerable" / "High Alpine · above 2600 m" next to its pyramid slice,
// which opens the explanation of that level
const ElevationRow = ({ level, onInfoOpen, regionId, zone }: ElevationRowProps) => {
  const t = useTranslations()
  const getElevationRange = useElevationRanges(regionId)
  const zoneLabel = t(`common.elevationZones.${zone}`)

  return (
    <li className="group grid min-h-14.5 grid-cols-[minmax(0,1fr)_92px] items-stretch">
      <div className="border-rule flex min-w-0 flex-col justify-center gap-0.5 border-b py-2 pr-3 leading-tight group-last:border-b-0">
        <b className="text-copy-lg font-semibold wrap-anywhere hyphens-auto">
          {t(hazardLevelNamesByScale[level])}
        </b>
        <span className="text-muted text-caption text-balance wrap-anywhere">
          {zoneLabel} · {getElevationRange(zone)}
        </span>
      </div>
      <button
        aria-haspopup="dialog"
        aria-label={`${t('common.labels.zoneDangerLevel', { zone: zoneLabel })} — ${level}`}
        className="focus-ring cursor-pointer rounded-sm"
        onClick={onInfoOpen}
        type="button"
      >
        <span
          className={cn(
            'text-heading flex size-full items-center justify-end pr-3 font-bold',
            backgroundColorByHazardLevel[level],
            hazardTextClass(level),
          )}
          style={{ clipPath: pyramidClipPaths[zone] }}
        >
          {level === '0' ? '–' : level}
        </span>
      </button>
    </li>
  )
}

export default ElevationRow
