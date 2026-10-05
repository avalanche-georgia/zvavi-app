import type {
  Aspect,
  AvalancheType,
  Confidence,
  Distribution,
  HazardLevelScale,
  Sensitivity,
  Trend,
} from '@domain/types'
import { z } from 'zod'

import { InvalidForecastError } from './errors'
import {
  aspectToCaaml,
  avalancheTypeToProblemType,
  confidenceValues,
  distributionToFrequency,
  hazardLevelToDangerRating,
  sensitivityToSnowpackStability,
  trendValues,
} from './mappings'

// The camelCase contract the transformer accepts (spec §6.1). Enum lists come
// from the exhaustive mappings, so input validation can't drift from them.
const enumOf = <Key extends string>(record: Record<Key, unknown>) =>
  z.enum(Object.keys(record) as [Key, ...Key[]])

const timestamp = z
  .string()
  .refine((value) => !Number.isNaN(new Date(value).getTime()), { error: 'invalid timestamp' })

const hazardLevel = enumOf<HazardLevelScale>(hazardLevelToDangerRating)
const bandAspects = z.array(enumOf<Aspect>(aspectToCaaml)).nullish()

const problemSchema = z.object({
  aspects: z
    .object({ alpine: bandAspects, highAlpine: bandAspects, subAlpine: bandAspects })
    .nullable(),
  avalancheSize: z.number().int().min(1).max(5),
  confidence: enumOf<Confidence>(confidenceValues).nullable(),
  description: z.string().nullable(),
  distribution: enumOf<Distribution>(distributionToFrequency).nullable(),
  isAllDay: z.boolean(),
  order: z.number().int(),
  sensitivity: enumOf<Sensitivity>(sensitivityToSnowpackStability).nullable(),
  timeOfDay: z.object({ end: timestamp.nullish(), start: timestamp.nullish() }).nullable(),
  trend: enumOf<Trend>(trendValues).nullable(),
  type: enumOf<AvalancheType>(avalancheTypeToProblemType),
})

const forecastSchema = z.object({
  additionalHazards: z.string().nullable(),
  avalancheProblems: z.array(problemSchema),
  hazardLevels: z.object({
    alpine: hazardLevel,
    highAlpine: hazardLevel,
    overall: hazardLevel.nullish(),
    subAlpine: hazardLevel,
  }),
  id: z.number().int(),
  publishedAt: timestamp,
  snowpack: z.string().nullable(),
  summary: z.string().nullable(),
  validUntil: timestamp,
  weather: z.string().nullable(),
})

const regionSchema = z.object({
  caamlRegionId: z.string().regex(/^[A-Z]{2}(-[A-Z0-9]+)*$/),
  elevationHighM: z.number().int(),
  elevationLowM: z.number().int(),
  id: z.string().min(1),
  nameEn: z.string().trim().min(1),
})

const bulletinSourceSchema = z.object({ forecast: forecastSchema, region: regionSchema })

export type BulletinSource = z.infer<typeof bulletinSourceSchema>
export type BulletinForecast = BulletinSource['forecast']
export type BulletinProblem = BulletinForecast['avalancheProblems'][number]
export type BulletinRegion = BulletinSource['region']

// Throws InvalidForecastError naming the failing fields (paths only, never values)
export const parseBulletinSource = (input: unknown): BulletinSource => {
  const result = bulletinSourceSchema.safeParse(input)

  if (result.success) return result.data

  const fields = result.error.issues.map((issue) => issue.path.join('.') || '(root)')

  throw new InvalidForecastError(`invalid input: ${[...new Set(fields)].join(', ')}`)
}
