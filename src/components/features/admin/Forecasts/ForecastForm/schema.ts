import {
  aspects,
  avalancheTriggers,
  avalancheTypes,
  confidenceLevels,
  distributionTypes,
  sensitivityLevels,
  trends,
} from '@domain/constants'
import type { Aspect, AvalancheSize } from '@domain/types'
import { z } from 'zod'

const nullableDate = z.date().nullable()

const hazardLevelScale = z.enum(['0', '1', '2', '3', '4', '5'])
const aspect = z.enum(Object.keys(aspects) as [Aspect, ...Aspect[]])
const avalancheSize = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]) satisfies z.ZodType<AvalancheSize>

const aspectsSchema = z.object({
  alpine: z.array(aspect),
  highAlpine: z.array(aspect),
  subAlpine: z.array(aspect),
})

const problemSchema = z.object({
  aspects: aspectsSchema,
  avalancheSize,
  confidence: z.enum(confidenceLevels),
  createdAt: z.string().optional(),
  description: z.string(),
  distribution: z.enum(distributionTypes),
  id: z.string().optional(),
  isAllDay: z.boolean(),
  order: z.number(),
  sensitivity: z.enum(sensitivityLevels),
  timeOfDay: z.object({
    end: nullableDate,
    start: nullableDate,
  }),
  trend: z.enum(trends),
  type: z.enum(avalancheTypes),
})

const avalancheTypeEnum = z.union([z.enum(avalancheTypes), z.literal('unknown')])
const avalancheTriggerEnum = z.enum(avalancheTriggers)

const avalancheSchema = z
  .object({
    aspects: aspectsSchema,
    createdAt: z.string().optional(),
    date: nullableDate,
    description: z.string(),
    id: z.number().optional(),
    involvement: z.string().nullable(),
    isDateUnknown: z.boolean(),
    latitude: z.number().nullable(),
    location: z.string().nullable(),
    longitude: z.number().nullable(),
    quantity: z.number().min(1),
    size: avalancheSize,
    slabDepth: z.number().nullable(),
    trigger: avalancheTriggerEnum,
    type: avalancheTypeEnum,
    width: z.number().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.isDateUnknown && data.date === null)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'required', path: ['date'] })
  })

export const forecastFormSchema = z
  .object({
    additionalHazards: z.string(),
    avalancheProblems: z.array(problemSchema),
    forecaster: z.string().min(1, { message: 'required' }),
    hazardLevels: z.object({
      alpine: hazardLevelScale,
      highAlpine: hazardLevelScale,
      overall: hazardLevelScale,
      subAlpine: hazardLevelScale,
    }),
    recentAvalanches: z.array(avalancheSchema),
    snowpack: z.string(),
    summary: z.string(),
    validUntil: z.date({ message: 'required' }).nullable(),
    weather: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.validUntil === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'required',
        path: ['validUntil'],
      })
    }
  })

export type ForecastFormSchema = z.infer<typeof forecastFormSchema>
