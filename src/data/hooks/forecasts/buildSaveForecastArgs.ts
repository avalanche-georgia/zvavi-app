import type { ForecastSavePayload } from './types'
import { convertCamelToSnake } from '../../helpers'

import type { Json } from '@/lib/supabase/database.types'

// Same camel → snake conversion the old client-side save used, so the stored
// jsonb shapes (hazard_levels, aspects, time_of_day) stay exactly as they were
const buildSaveForecastArgs = ({
  avalancheProblems,
  forecast,
  recentAvalancheIds,
}: ForecastSavePayload) => ({
  p_avalanche_ids: recentAvalancheIds,
  p_forecast: convertCamelToSnake(forecast) as Json,
  p_problems: convertCamelToSnake(avalancheProblems) as Json,
})

export default buildSaveForecastArgs
