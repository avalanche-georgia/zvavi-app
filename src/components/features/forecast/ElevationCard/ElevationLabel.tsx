import { useElevationRanges } from '@components/hooks'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { ElevationZone, HazardLevelScale, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

type ElevationLabelProps = {
  level: HazardLevelScale
  regionId: RegionId
  zone: ElevationZone
}

// "Considerable" / "High Alpine · above 2600 m" — the text next to a slice
const ElevationLabel = ({ level, regionId, zone }: ElevationLabelProps) => {
  const t = useTranslations()
  const getElevationRange = useElevationRanges(regionId)

  return (
    <div className="border-rule col-start-1 flex min-h-14.5 min-w-0 flex-col justify-center gap-0.5 border-b py-2 pr-3 leading-tight nth-3:border-b-0">
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
