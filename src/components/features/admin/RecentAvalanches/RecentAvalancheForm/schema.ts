import {
  observationFieldsSchema,
  photosSchema,
  requiredEnum,
  withDateOrUnknown,
} from '@components/features/observations/form'
import { avalancheFieldLimits } from '@domain/constants'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

const { avalanche_status } = Constants.public.Enums

const optionalText = (maxLength: number) =>
  z.string().max(maxLength, { message: 'tooLong' }).nullable()

// The public form's fields (same rules) plus the team-only ones
export const avalancheFormSchema = withDateOrUnknown(
  observationFieldsSchema.extend({
    involvement: optionalText(avalancheFieldLimits.involvementMaxLength),
    location: optionalText(avalancheFieldLimits.locationMaxLength),
    // Saved photos the form opened with stay unless removed; new uploads are added
    photos: photosSchema.transform((photos) => ({
      add: photos.flatMap((photo) => (photo.file && photo.key ? [photo.key] : [])),
      keep: photos.flatMap((photo) => (!photo.file && photo.key ? [photo.key] : [])),
    })),
    status: requiredEnum(avalanche_status),
  }),
)

export type AvalancheFormSchema = z.input<typeof avalancheFormSchema>
export type AvalancheFormData = z.output<typeof avalancheFormSchema>
