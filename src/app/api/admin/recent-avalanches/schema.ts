import { avalancheFieldLimits, observationPhotoLimits } from '@domain/constants'
import { z } from 'zod'

import {
  hasDateOrUnknown,
  observationBodyFieldsSchema,
  pendingPhotoKeysSchema,
} from '@/api/observations/schema'
import { Constants } from '@/lib/supabase/types'

const { avalanche_status, region_id } = Constants.public.Enums

const optionalText = (maxLength: number) => z.string().max(maxLength).nullable()

// Team-only fields on top of what the public form sends
const adminFieldsSchema = observationBodyFieldsSchema.extend({
  involvement: optionalText(avalancheFieldLimits.involvementMaxLength),
  location: optionalText(avalancheFieldLimits.locationMaxLength),
  status: z.enum(avalanche_status),
})

export const createAvalancheSchema = adminFieldsSchema
  .extend({
    photoKeys: pendingPhotoKeysSchema,
    regionId: z.enum(region_id),
  })
  .refine(hasDateOrUnknown)

// The photo set after an edit: which saved photos stay, plus new uploads. The
// route deletes every saved photo not in `keep`.
const photoChangesSchema = z
  .object({
    add: pendingPhotoKeysSchema,
    keep: z.array(z.string()).refine((keys) => new Set(keys).size === keys.length),
  })
  .refine(({ add, keep }) => add.length + keep.length <= observationPhotoLimits.maxCount)

// Any subset of fields (a status toggle sends only `status`). Photos untouched
// unless `photos` is sent.
export const updateAvalancheSchema = adminFieldsSchema
  .partial()
  .extend({ photos: photoChangesSchema.optional() })
  .refine(
    (body) =>
      (body.date === undefined && body.isDateUnknown === undefined) || hasDateOrUnknown(body),
  )

export type CreateAvalancheBody = z.infer<typeof createAvalancheSchema>
export type UpdateAvalancheBody = z.infer<typeof updateAvalancheSchema>
