import {
  aspects,
  avalancheProblemTypes,
  confidenceLevels,
  distributionTypes,
  sensitivityLevels,
  trends,
} from '@domain/constants'
import type { Aspect, AvalancheProblemType, AvalancheSize } from '@domain/types'
import { z } from 'zod'

const aspect = z.enum(Object.keys(aspects) as [Aspect, ...Aspect[]])
const nullableDate = z.date().nullable()
const required = { error: () => ({ message: 'required' }) }

export const aspectsSchema = z.object({
  alpine: z.array(aspect),
  highAlpine: z.array(aspect),
  subAlpine: z.array(aspect),
})

// At least one aspect in any elevation band
const requiredAspectsSchema = aspectsSchema.refine(
  ({ alpine, highAlpine, subAlpine }) => alpine.length + highAlpine.length + subAlpine.length > 0,
  { error: 'required' },
)

// A problem as stored in the forecast form. Type, size and aspects are required:
// the editor keeps a draft with them empty and only hands over a valid problem.
export const problemSchema = z.object({
  aspects: requiredAspectsSchema,
  avalancheSize: z.union(
    [z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)],
    required,
  ) satisfies z.ZodType<AvalancheSize>,
  confidence: z.enum(confidenceLevels),
  createdAt: z.string().optional(),
  description: z.string(),
  distribution: z.enum(distributionTypes),
  id: z.string().optional(),
  isAllDay: z.boolean(),
  order: z.number(),
  sensitivity: z.enum(sensitivityLevels),
  timeOfDay: z.object({ end: nullableDate, start: nullableDate }),
  trend: z.enum(trends),
  type: z.enum(avalancheProblemTypes, required),
})

export type ProblemValues = z.infer<typeof problemSchema>

// Editor state: type and size start empty; the rest keeps the legacy defaults
export type ProblemDraft = Omit<ProblemValues, 'avalancheSize' | 'type'> & {
  avalancheSize: AvalancheSize | null
  type: AvalancheProblemType | null
}

export const emptyProblemDraft: ProblemDraft = {
  aspects: { alpine: [], highAlpine: [], subAlpine: [] },
  avalancheSize: null,
  confidence: 'low',
  description: '',
  distribution: 'isolated',
  isAllDay: true,
  order: 0,
  sensitivity: 'reactive',
  timeOfDay: { end: null, start: null },
  trend: 'deteriorating',
  type: null,
}
