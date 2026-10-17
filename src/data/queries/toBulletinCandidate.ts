import { convertSnakeToCamel } from '@data/helpers'

import type { BulletinCandidate } from '@/lib/caaml/buildFeed'
import type { DbRow } from '@/lib/supabase/types'

type RegionRow = Pick<
  DbRow<'regions'>,
  'caaml_region_id' | 'elevation_high_m' | 'elevation_low_m' | 'id' | 'name_en'
>

type ForecastRow = Pick<
  DbRow<'forecasts'>,
  | 'additional_hazards'
  | 'created_at'
  | 'hazard_levels'
  | 'id'
  | 'published_at'
  | 'region_id'
  | 'snowpack'
  | 'summary'
  | 'valid_until'
  | 'weather'
>

type ProblemRow = Pick<
  DbRow<'avalanche_problems'>,
  | 'aspects'
  | 'avalanche_size'
  | 'confidence'
  | 'description'
  | 'distribution'
  | 'is_all_day'
  | 'order'
  | 'sensitivity'
  | 'time_of_day'
  | 'trend'
  | 'type'
>

export type BulletinRows = { forecast: ForecastRow; problems: ProblemRow[]; region: RegionRow }

type BandLevels = { alpine?: unknown; highAlpine?: unknown; subAlpine?: unknown }

// Keeps the three band levels only: the authored overall level never enters the
// API (consumers derive it from dangerRatings). A jsonb column can't be narrowed
// in the select without breaking on legacy key shapes, so it's dropped here.
const toBandLevels = (hazardLevels: ForecastRow['hazard_levels']) => {
  const { alpine, highAlpine, subAlpine } = (convertSnakeToCamel(hazardLevels) ?? {}) as BandLevels

  return { alpine, highAlpine, subAlpine }
}

// Same normalisation the site uses: also camelCases the jsonb keys
// (`high_alpine` → `highAlpine`) and leaves legacy camelCase keys as they are.
// The result is validated later by parseBulletinSource, per region.
const toBulletinCandidate = ({ forecast, problems, region }: BulletinRows): BulletinCandidate => ({
  forecast: convertSnakeToCamel({
    ...forecast,
    avalanche_problems: problems,
    hazard_levels: toBandLevels(forecast.hazard_levels),
  }),
  forecastId: forecast.id,
  region: convertSnakeToCamel(region),
  regionId: region.id,
})

export default toBulletinCandidate
