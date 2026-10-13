import { useContext } from 'react'
import RegionContext from '@domain/context/RegionContext/RegionContext'
import { getElevationRange, getElevationThresholds } from '@domain/elevation'
import type { ElevationZone, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

// "above 2600 m" / "2000–2600 m" / "below 2000 m" for a region's elevation
// bands — the one place these texts come from. Without a region id it uses the
// page's current region (or the defaults outside a region page).
const useElevationRanges = (regionId?: RegionId) => {
  const t = useTranslations()
  const context = useContext(RegionContext)
  const region = regionId
    ? context?.regions.find((candidate) => candidate.id === regionId)
    : context?.region
  const thresholds = getElevationThresholds(region)

  // Strings, not numbers: a number would be formatted with a thousands separator
  return (zone: ElevationZone) => {
    const range = getElevationRange(zone, thresholds)

    if (range.kind === 'between') {
      return t('common.elevationRanges.between', {
        high: String(range.high),
        low: String(range.low),
      })
    }

    return t(`common.elevationRanges.${range.kind}`, { value: String(range.value) })
  }
}

export default useElevationRanges
