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
// involvement is deliberately not exposed here — treated as internal-only
// across the app (see its "(internal)" label on the forecast-nested avalanche
// form); location (free text) is out of scope for the public form by product
// decision.
export const submitObservationSchema = z.object({
  aspects: aspectsSchema.nullable(),
  date: z.iso.datetime({ offset: true }).nullable(),
  description: z.string().max(2000).nullable(),
  isDateUnknown: z.boolean(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  quantity: z.number().int().min(1),
  regionId: z.enum(region_id),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).nullable(),
  slabDepth: z.number().nullable(),
  submitterContact: z.string().max(200).nullable(),
  submitterEducation: z.string().max(200).nullable(),
  submitterName: z.string().min(1).max(100),
  trigger: z.enum(avalanche_trigger),
  type: z.enum(avalanche_type),
  width: z.number().nullable(),
})

export type SubmitObservationBody = z.infer<typeof submitObservationSchema>
