import { sortedAspects } from '@domain/constants'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

const { avalanche_trigger, avalanche_type, region_id } = Constants.public.Enums

const aspectSchema = z.enum(sortedAspects)

const aspectsSchema = z.object({
  alpine: z.array(aspectSchema),
  highAlpine: z.array(aspectSchema),
  subAlpine: z.array(aspectSchema),
})

// avalanche_trigger / avalanche_type already include 'unknown' at the DB level.
export const submitObservationSchema = z.object({
  aspects: aspectsSchema.nullable(),
  date: z.string().nullable(),
  description: z.string().nullable(),
  isDateUnknown: z.boolean(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  regionId: z.enum(region_id),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).nullable(),
  submitterContact: z.string().nullable(),
  submitterEducation: z.string().nullable(),
  submitterName: z.string().nullable(),
  trigger: z.enum(avalanche_trigger).nullable(),
  type: z.enum(avalanche_type).nullable(),
})

export type SubmitObservationBody = z.infer<typeof submitObservationSchema>
