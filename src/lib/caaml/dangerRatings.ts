import type { ElevationThresholds } from './elevation'
import { elevationForBand } from './elevation'
import type { BulletinForecast } from './input'
import { bandsTopDown, hazardLevelToDangerRating } from './mappings'
import type { CaamlDangerRating } from './types'

// Always all three bands, top → bottom. The schema expects a rating for every
// elevation once one is constrained. `overall` has no EAWS equivalent.
const buildDangerRatings = (
  hazardLevels: BulletinForecast['hazardLevels'],
  thresholds: ElevationThresholds,
): CaamlDangerRating[] =>
  bandsTopDown.map((band) => ({
    elevation: elevationForBand(band, thresholds),
    mainValue: hazardLevelToDangerRating[hazardLevels[band]],
    validTimePeriod: 'all_day',
  }))

export default buildDangerRatings
