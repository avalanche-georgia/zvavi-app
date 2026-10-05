import type { ElevationZone } from '@domain/types'

import { customDataNamespace } from './config'
import type { ElevationThresholds } from './elevation'
import { elevationForBands } from './elevation'
import type { BulletinProblem } from './input'
import {
  aspectsClockwise,
  aspectToCaaml,
  avalancheTypeToProblemType,
  bandsTopDown,
  distributionToFrequency,
  sensitivityToSnowpackStability,
} from './mappings'
import markdownToCaamlText from './text'
import { toValidTimePeriod } from './timePeriod'
import type { CaamlAspect, CaamlAvalancheProblem } from './types'

export type BandGroup = { aspects: CaamlAspect[]; bands: ElevationZone[] }

// Our aspects are per elevation band; a CAAML problem has one aspect set and
// one elevation range. Adjacent bands with identical non-empty aspect sets form
// one group; an empty band breaks adjacency. Exact: the emitted (band, aspect)
// pairs always equal the input pairs.
export const groupBands = (aspectsByBand: BulletinProblem['aspects']): BandGroup[] => {
  const groups: BandGroup[] = []
  let previousKey: string | null = null

  for (const band of bandsTopDown) {
    const bandAspects = aspectsByBand?.[band] ?? []
    const aspects = aspectsClockwise
      .filter((aspect) => bandAspects.includes(aspect))
      .map((aspect) => aspectToCaaml[aspect])
    const key = aspects.length ? aspects.join(',') : null
    const lastGroup = groups[groups.length - 1]

    if (key && key === previousKey) {
      lastGroup.bands.push(band)
    } else if (key) {
      groups.push({ aspects, bands: [band] })
    }

    previousKey = key
  }

  return groups
}

export const buildProblemEntries = (
  problem: BulletinProblem,
  thresholds: ElevationThresholds,
): CaamlAvalancheProblem[] => {
  const { avalancheSize, confidence, description, distribution, order, sensitivity, trend, type } =
    problem
  const comment = description ? markdownToCaamlText(description) : ''
  const common = {
    avalancheSize,
    problemType: avalancheTypeToProblemType[type],
    validTimePeriod: toValidTimePeriod(problem),
    ...(comment && { comment }),
    ...(distribution && { frequency: distributionToFrequency[distribution] }),
    ...(sensitivity && { snowpackStability: sensitivityToSnowpackStability[sensitivity] }),
  }
  const customData = (bands: ElevationZone[]) => ({
    [customDataNamespace]: {
      bands,
      priority: order,
      problemType: type,
      ...(confidence && { confidence }),
      ...(trend && { trend }),
    },
  })
  const groups = groupBands(problem.aspects)

  // Never hide a problem: no aspects anywhere → no aspects/elevation (= everywhere)
  if (!groups.length) return [{ ...common, customData: customData([]) }]

  return groups.map(({ aspects, bands }) => {
    const elevation = elevationForBands(bands, thresholds)

    return { ...common, aspects, customData: customData(bands), ...(elevation && { elevation }) }
  })
}
