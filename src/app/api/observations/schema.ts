import { avalancheFieldLimits, observationPhotoLimits, sortedAspects } from '@domain/constants'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

const { avalanche_trigger, avalanche_type, region_id } = Constants.public.Enums

// The observation id doesn't exist yet at upload time (photos are uploaded
// while the form is still being filled in) and public submitters have no user
// id, so uploads get a random UUID under a temporary prefix. On submit they're
// promoted to `observations/{yyyy-MM}/{uuid}.{ext}` (see ./photoKeys).
export const pendingPhotoKeyPrefix = 'pending/'

export const pendingPhotoKeyPattern =
  /^pending\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png)$/

// Returned by POST /api/observations when a photo key has no uploaded object
// behind it — the client maps it to a photo-specific message.
export const photosNotFoundError = 'photos not found'

// Returned when a photo exists but can't be decoded / re-written (corrupt, not
// an image, or beyond the pixel limit) — retrying the same photo won't help
export const photosUnprocessableError = 'photos unprocessable'

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
export const submitObservationSchema = z
  .object({
    aspects: aspectsSchema.nullable(),
    date: z.iso.datetime({ offset: true }).nullable(),
    description: z.string().max(avalancheFieldLimits.descriptionMaxLength).nullable(),
    isDateUnknown: z.boolean(),
    latitude: z
      .number()
      .min(avalancheFieldLimits.latitude.min)
      .max(avalancheFieldLimits.latitude.max),
    longitude: z
      .number()
      .min(avalancheFieldLimits.longitude.min)
      .max(avalancheFieldLimits.longitude.max),
    photoKeys: z
      .array(z.string().regex(pendingPhotoKeyPattern))
      .max(observationPhotoLimits.maxCount)
      .refine((keys) => new Set(keys).size === keys.length),
    quantity: z
      .number()
      .int()
      .min(avalancheFieldLimits.quantity.min)
      .max(avalancheFieldLimits.quantity.max),
    regionId: z.enum(region_id),
    size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
    slabDepth: z
      .number()
      .min(avalancheFieldLimits.slabDepth.min)
      .max(avalancheFieldLimits.slabDepth.max)
      .nullable(),
    submitterContact: z.string().max(200).nullable(),
    submitterEducation: z.string().max(200).nullable(),
    submitterName: z.string().min(1).max(100),
    trigger: z.enum(avalanche_trigger),
    type: z.enum(avalanche_type),
    width: z
      .number()
      .min(avalancheFieldLimits.width.min)
      .max(avalancheFieldLimits.width.max)
      .nullable(),
  })
  // A date or "unknown" — never neither
  .refine((body) => body.isDateUnknown || body.date !== null)

export const observationFiltersSchema = z.object({
  dateBasis: z.enum(['occurred', 'reported']).default('occurred'),
  dateFrom: z.iso.datetime({ offset: true }).optional(),
  dateTo: z.iso.datetime({ offset: true }).optional(),
  // Only observations whose occurrence date is unknown
  isDateUnknown: z
    .enum(['true'])
    .optional()
    .transform((value) => value === 'true'),
  regionId: z.enum(region_id),
})

export const observationsPageQuerySchema = observationFiltersSchema.extend({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
  sort: z.enum(['newest', 'largest']).default('newest'),
})

export const observationQuerySchema = z.object({
  id: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  regionId: z.enum(region_id),
})

export type SubmitObservationBody = z.infer<typeof submitObservationSchema>
