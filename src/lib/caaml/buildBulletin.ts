import bulletinId from './bulletinId'
import { customDataNamespace, providerName, providerWebsite } from './config'
import buildDangerRatings from './dangerRatings'
import { assertValidThresholds } from './elevation'
import { InvalidForecastError } from './errors'
import type { BulletinForecast, BulletinRegion } from './input'
import { bandsTopDown, hazardLevelToDangerRating } from './mappings'
import { buildProblemEntries } from './problems'
import markdownToCaamlText from './text'
import type { CaamlBulletin } from './types'
import { routes } from '../../app/routes'

type BuildBulletinParams = { forecast: BulletinForecast; now: Date; region: BulletinRegion }

const toUtcSeconds = (timestamp: string) =>
  new Date(timestamp).toISOString().replace(/\.\d{3}Z$/, 'Z')

const textBlock = (markdown: string | null) => {
  const comment = markdown ? markdownToCaamlText(markdown) : ''

  return comment ? { comment } : undefined
}

// Clock-skew allowance between the DB (sets published_at) and this server
const maxPublishedAtLeadMs = 60_000

// Fail closed: never repair a forecast, never extend or invent a validity window,
// never fall back to created_at
const assertUsable = ({ hazardLevels, publishedAt, validUntil }: BulletinForecast, now: Date) => {
  const publishedTime = new Date(publishedAt ?? '').getTime()
  const validUntilTime = new Date(validUntil ?? '').getTime()

  if (Number.isNaN(publishedTime))
    throw new InvalidForecastError('publishedAt is missing or invalid')
  if (publishedTime - now.getTime() > maxPublishedAtLeadMs)
    throw new InvalidForecastError('publishedAt is in the future')
  if (Number.isNaN(validUntilTime))
    throw new InvalidForecastError('validUntil is missing or invalid')
  if (validUntilTime <= publishedTime)
    throw new InvalidForecastError('validUntil is not after publishedAt')

  for (const band of bandsTopDown) {
    if (!Object.hasOwn(hazardLevelToDangerRating, hazardLevels?.[band] ?? '')) {
      throw new InvalidForecastError(`hazard level of ${band} is missing or invalid`)
    }
  }
}

// Pure: same input → same bulletin. Throws InvalidForecastError.
const buildBulletin = ({ forecast, now, region }: BuildBulletinParams): CaamlBulletin => {
  assertUsable(forecast, now)

  const thresholds = { high: region.elevationHighM, low: region.elevationLowM }

  assertValidThresholds(thresholds)

  const { hazardLevels, id, publishedAt, validUntil } = forecast
  const problems = [...forecast.avalancheProblems].sort(
    (first, second) => first.order - second.order,
  )
  const texts = {
    avalancheActivity: textBlock(forecast.summary),
    snowpackStructure: textBlock(forecast.snowpack),
    // TBD (T6): additional hazards are sent as travel advisory
    travelAdvisory: textBlock(forecast.additionalHazards),
    weatherForecast: textBlock(forecast.weather),
  }
  const forecastPageUrl = `${providerWebsite}/en${routes.forecastsByRegion(region.id).view(id)}`

  return {
    avalancheProblems: problems.flatMap((problem) => buildProblemEntries(problem, thresholds)),
    bulletinID: bulletinId(id),
    customData: {
      [customDataNamespace]: {
        expired: now.getTime() > new Date(validUntil).getTime(),
        forecastId: id,
        ...(hazardLevels.overall && { overallDangerLevel: hazardLevels.overall }),
      },
    },
    dangerRatings: buildDangerRatings(hazardLevels, thresholds),
    lang: 'en',
    metaData: {
      extFiles: [
        {
          description: 'Forecast page on avalanche.ge',
          fileReferenceURI: forecastPageUrl,
          fileType: 'website',
        },
      ],
    },
    publicationTime: toUtcSeconds(publishedAt),
    regions: [{ name: region.nameEn, regionID: region.caamlRegionId }],
    source: { provider: { name: providerName, website: providerWebsite } },
    // TBD (T4): validity starts at publication
    validTime: { endTime: toUtcSeconds(validUntil), startTime: toUtcSeconds(publishedAt) },
    ...Object.fromEntries(Object.entries(texts).filter(([, block]) => block)),
  }
}

export default buildBulletin
