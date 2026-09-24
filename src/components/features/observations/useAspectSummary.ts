import type { Aspects, ElevationZone } from '@domain/types'
import { useTranslations } from 'next-intl'

import { formatAspectRuns, getZonesWithAspects } from './aspectSummary'

// "High Alpine · NW–NE", or "High Alpine + Alpine · N, E; Sub Alpine · S" —
// zones with identical aspects share one entry. null when nothing was selected.
const useAspectSummary = () => {
  const t = useTranslations()

  return (aspects: Aspects): string | null => {
    const zones = getZonesWithAspects(aspects)

    if (zones.length === 0) return null

    const zonesByRuns = new Map<string, ElevationZone[]>()

    zones.forEach((zone) => {
      const runs = formatAspectRuns(aspects[zone], t('observations.aspects.allAspects'))

      zonesByRuns.set(runs, [...(zonesByRuns.get(runs) ?? []), zone])
    })

    return Array.from(zonesByRuns, ([runs, groupZones]) => {
      const zonesLabel =
        groupZones.length === 3
          ? t('observations.aspects.allElevations')
          : groupZones.map((zone) => t(`common.elevationZones.${zone}`)).join(' + ')

      return `${zonesLabel} · ${runs}`
    }).join('; ')
  }
}

export default useAspectSummary
