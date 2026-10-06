import buildBulletin from './buildBulletin'
import buildCollection from './buildCollection'
import { InvalidForecastError } from './errors'
import { parseBulletinSource } from './input'
import type { CaamlBulletin, CaamlBulletinCollection } from './types'
import validateCollection from './validate'

// One region's latest published forecast, camelCased but not yet validated
export type BulletinCandidate = {
  forecast: unknown
  forecastId: number
  region: unknown
  regionId: string
}

export type BulletinFailure = {
  forecastId: number
  reason: string
  regionId: string
  stack?: string
}

export type BulletinFeed = {
  // null → respond 5xx: forecasts existed but none could be published safely
  collection: CaamlBulletinCollection | null
  failures: BulletinFailure[]
}

const toBulletin = ({ forecast, region }: BulletinCandidate, now: Date) => {
  const source = parseBulletinSource({ forecast, region })
  const bulletin = buildBulletin({ forecast: source.forecast, now, region: source.region })
  const { errors, isValid } = validateCollection(buildCollection([bulletin]))

  if (!isValid) throw new InvalidForecastError(`schema validation failed: ${errors.join('; ')}`)

  return bulletin
}

// Per-region isolation: an unusable forecast is omitted (and reported in
// `failures`), never repaired; the other regions are still served.
const buildFeed = (candidates: BulletinCandidate[], now: Date): BulletinFeed => {
  const bulletins: CaamlBulletin[] = []
  const failures: BulletinFailure[] = []

  for (const candidate of candidates) {
    const { forecastId, regionId } = candidate

    try {
      bulletins.push(toBulletin(candidate, now))
    } catch (error) {
      // Our own errors carry field names only. Anything else is a code bug:
      // keep its stack (code locations, no forecast content) for the logs.
      if (error instanceof InvalidForecastError) {
        failures.push({ forecastId, reason: error.message, regionId })
      } else {
        const name = error instanceof Error ? error.name : 'error'
        const stack = error instanceof Error ? error.stack : undefined

        failures.push({ forecastId, reason: `unexpected ${name}`, regionId, stack })
      }
    }
  }

  if (candidates.length && !bulletins.length) return { collection: null, failures }

  const collection = buildCollection(bulletins)

  // Each bulletin already passed; this guards the collection envelope itself
  if (!validateCollection(collection).isValid) {
    return {
      collection: null,
      failures: [...failures, { forecastId: 0, reason: 'collection invalid', regionId: '*' }],
    }
  }

  return { collection, failures }
}

export default buildFeed
