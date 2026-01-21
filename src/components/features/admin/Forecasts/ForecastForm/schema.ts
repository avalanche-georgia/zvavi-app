import { z } from 'zod'

const coerceId = z.preprocess(
  (val) => (val != null ? String(val) : undefined),
  z.string().optional(),
)

const coerceDate = z.preprocess(
  (val) => (typeof val === 'string' ? new Date(val) : val),
  z.date().nullable(),
)

const hazardLevelScale = z.enum(['1', '2', '3', '4', '5'])
const aspect = z.enum(['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'])
const avalancheSize = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
])

const aspectsSchema = z.object({
  alpine: z.array(aspect),
  highAlpine: z.array(aspect),
  subAlpine: z.array(aspect),
})

const problemSchema = z.object({
  aspects: aspectsSchema,
  avalancheSize,
  confidence: z.enum(['low', 'moderate', 'high']),
  createdAt: z.string().optional(),
  description: z.string(),
  distribution: z.enum(['isolated', 'specific', 'widespread']),
  id: coerceId,
  isAllDay: z.boolean(),
  sensitivity: z.enum(['unreactive', 'stubborn', 'reactive', 'touchy']),
  timeOfDay: z.object({
    end: coerceDate,
    start: coerceDate,
  }),
  trend: z.enum(['deteriorating', 'improving', 'noChange']),
  type: z.enum([
    'cornice',
    'deepSlab',
    'glide',
    'looseDry',
    'looseWet',
    'persistentSlab',
    'stormSlab',
    'wetSlab',
    'windSlab',
  ]),
})

const avalancheSchema = z.object({
  aspects: aspectsSchema,
  createdAt: z.string().optional(),
  date: coerceDate,
  description: z.string(),
  id: coerceId,
  size: avalancheSize,
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
