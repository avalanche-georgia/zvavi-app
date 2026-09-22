import { sortedAspects } from '@domain/constants'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

const { avalanche_trigger, avalanche_type } = Constants.public.Enums

const aspectSchema = z.enum(sortedAspects)

const aspectsSchema = z.object({
  alpine: z.array(aspectSchema),
  highAlpine: z.array(aspectSchema),
  subAlpine: z.array(aspectSchema),
})

export const observationSubmitSchema = z.object({
  aspects: aspectsSchema,
  date: z.date().nullable(),
  description: z.string().nullable(),
  honeypot: z.string(),
  isDateUnknown: z.boolean(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  submitterContact: z.string().nullable(),
  submitterEducation: z.string().nullable(),
  submitterName: z.string().nullable(),
  trigger: z.enum(avalanche_trigger).nullable(),
  type: z.enum(avalanche_type).nullable(),
})

export type ObservationSubmitFormSchema = z.infer<typeof observationSubmitSchema>
