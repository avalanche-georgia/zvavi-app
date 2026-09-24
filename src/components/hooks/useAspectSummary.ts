import { groupZonesByRuns } from '@domain/aspects'
import type { Aspects, ElevationZone } from '@domain/types'
import { useTranslations } from 'next-intl'

export type AspectSummaryLine = {
  runs: string
  zonesLabel: string
}

// One line per group of zones with identical aspects: "High Alpine + Alpine" · "N–E".
// `getLines` feeds multi-line layouts; `getSummary` joins them into one string —
// "High Alpine · NW–NE; Sub Alpine · S", or null when nothing was selected.
const useAspectSummary = () => {
  const t = useTranslations()

  const getZonesLabel = (zones: ElevationZone[]) =>
    zones.length === 3
      ? t('common.aspects.allElevations')
      : zones.map((zone) => t(`common.elevationZones.${zone}`)).join(' + ')

  const getLines = (aspects: Aspects): AspectSummaryLine[] =>
    groupZonesByRuns(aspects, t('common.aspects.allAspects')).map(({ runs, zones }) => ({
      runs,
      zonesLabel: getZonesLabel(zones),
    }))

  const getSummary = (aspects: Aspects): string | null => {
    const lines = getLines(aspects)

    if (lines.length === 0) return null

    return lines.map(({ runs, zonesLabel }) => `${zonesLabel} · ${runs}`).join('; ')
  }

  return { getLines, getSummary }
}

export default useAspectSummary
