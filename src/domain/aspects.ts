import { aspects as aspectLabels, sortedAspects, sortedElevationZones } from '@domain/constants'
import type { Aspect, Aspects, ElevationZone } from '@domain/types'

// Aspects laid out as a 3×3 compass, read row by row; null is the centre cell
export const compassGrid: (Aspect | null)[] = ['nw', 'n', 'ne', 'w', null, 'e', 'sw', 's', 'se']

// A contiguous run of aspects around the compass, e.g. NW, N, NE
type AspectRun = Aspect[]

// Zones that share the same formatted aspect runs, e.g. High Alpine + Alpine · N–E
export type AspectRunsGroup = {
  runs: string
  zones: ElevationZone[]
}

// Groups selected aspects into contiguous runs, wrapping around north:
// ['nw', 'n', 'ne', 's'] → [['nw', 'n', 'ne'], ['s']]
export const getAspectRuns = (aspects: Aspect[]): AspectRun[] => {
  const isSelected = sortedAspects.map((aspect) => aspects.includes(aspect))
  const start = isSelected.indexOf(false)

  if (start === -1) return [sortedAspects]

  const runs: AspectRun[] = []
  let current: AspectRun = []

  for (let offset = 1; offset <= sortedAspects.length; offset += 1) {
    const index = (start + offset) % sortedAspects.length

    if (isSelected[index]) {
      current.push(sortedAspects[index])
    } else if (current.length > 0) {
      runs.push(current)
      current = []
    }
  }

  if (current.length > 0) runs.push(current)

  return runs
}

// Runs of 3+ collapse to a range ("NW–NE"); shorter ones are listed ("E, SE")
export const formatAspectRuns = (aspects: Aspect[], allAspectsLabel: string): string => {
  if (aspects.length === sortedAspects.length) return allAspectsLabel

  return getAspectRuns(aspects)
    .map((run) =>
      run.length >= 3
        ? `${aspectLabels[run[0]]}–${aspectLabels[run[run.length - 1]]}`
        : run.map((aspect) => aspectLabels[aspect]).join(', '),
    )
    .join(', ')
}

export const getZonesWithAspects = (aspects: Aspects): ElevationZone[] =>
  sortedElevationZones.filter((zone) => aspects[zone]?.length > 0)

export const getAllAspects = (aspects: Aspects): Aspect[] =>
  sortedAspects.filter((aspect) =>
    sortedElevationZones.some((zone) => aspects[zone]?.includes(aspect)),
  )

// Zones with identical aspects share one group, top → bottom
export const groupZonesByRuns = (aspects: Aspects, allAspectsLabel: string): AspectRunsGroup[] => {
  const zonesByRuns = new Map<string, ElevationZone[]>()

  getZonesWithAspects(aspects).forEach((zone) => {
    const runs = formatAspectRuns(aspects[zone], allAspectsLabel)

    zonesByRuns.set(runs, [...(zonesByRuns.get(runs) ?? []), zone])
  })

  return Array.from(zonesByRuns, ([runs, zones]) => ({ runs, zones }))
}

export const hasSameAspects = (first: Aspect[], second: Aspect[]): boolean =>
  first.length === second.length && first.every((aspect) => second.includes(aspect))
