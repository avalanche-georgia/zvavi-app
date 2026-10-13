import { useElevationRanges } from '@components/hooks'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationZone, HazardLevelScale, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

type ElevationLabelProps = {
  level: HazardLevelScale
  regionId: RegionId
  // Its row in the card's grid, from 1
  row: number
  zone: ElevationZone
}

// "Considerable" / "High Alpine · > 2600 m" — the text next to a slice
const ElevationLabel = ({ level, regionId, row, zone }: ElevationLabelProps) => {
  const t = useTranslations()
  const getElevationRange = useElevationRanges(regionId)

  return (
    <div
      className="col-start-1 flex min-h-14.5 min-w-0 flex-col justify-center gap-0.5 py-2 pr-3 leading-tight"
      // Placed explicitly: the dividers layer covers the same cells
      style={{ gridRow: row }}
    >
      <b className="text-copy-lg font-semibold wrap-anywhere hyphens-auto">
        {t(hazardLevelNamesByScale[level])}
      </b>
      <span className="text-muted text-caption text-balance wrap-anywhere">
        {t(`common.elevationZones.${zone}`)} · {getElevationRange(zone)}
      </span>
    </div>
  )
}

export default ElevationLabel
