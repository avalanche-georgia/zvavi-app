import { sortedAspects } from '@domain/constants'
import { z } from 'zod'

const aspectSchema = z.enum(sortedAspects)

const aspectsSchema = z.object({
  alpine: z.array(aspectSchema),
  highAlpine: z.array(aspectSchema),
  subAlpine: z.array(aspectSchema),
})

export const avalancheFormSchema = z.object({
  aspects: aspectsSchema,
  date: z.date().nullable(),
  description: z.string(),
  involvement: z.string().nullable(),
  isDateUnknown: z.boolean(),
  latitude: z.number().nullable(),
  location: z.string().nullable(),
  longitude: z.number().nullable(),
  quantity: z.number().int().min(1),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  slabDepth: z.number().nullable(),
  trigger: z.string({ error: () => ({ message: 'required' }) }).min(1, { message: 'required' }),
  type: z.string({ error: () => ({ message: 'required' }) }).min(1, { message: 'required' }),
  width: z.number().nullable(),
})

export type AvalancheFormSchema = z.infer<typeof avalancheFormSchema>
