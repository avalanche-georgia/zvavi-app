import type { ForecastSavePayload } from '@data/hooks/forecasts/types'
import type { RegionId } from '@domain/types'

import type { ForecastFormSchema } from '../schema'

// Form values → save_forecast payload. Problems go in list order (the RPC
// numbers them); their client-side ids and timestamps are dropped.
const buildSavePayload = (
  values: ForecastFormSchema,
  forecastId: number | undefined,
  regionId: RegionId,
): ForecastSavePayload => {
  const { avalancheProblems, recentAvalancheIds, validUntil, ...fields } = values

  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    avalancheProblems: avalancheProblems.map(({ createdAt, id, order, timeOfDay, ...problem }) => ({
      ...problem,
      timeOfDay: {
        end: timeOfDay.end?.toISOString() ?? null,
        start: timeOfDay.start?.toISOString() ?? null,
      },
    })),
    forecast: {
      ...fields,
      id: forecastId,
      regionId,
      // Validated as present before saving
      validUntil: validUntil!.toISOString(),
    },
    recentAvalancheIds,
  }
}

export default buildSavePayload
