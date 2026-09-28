import {
  observationFieldsSchema,
  photosSchema,
  withDateOrUnknown,
} from '@components/features/observations/form'
import { z } from 'zod'

export const observationSubmitSchema = withDateOrUnknown(
  observationFieldsSchema.extend({
    honeypot: z.string(),
    // Every photo is a new upload here — the submit handler gets just their keys
    photos: photosSchema.transform((photos) =>
      photos.flatMap((photo) => (photo.key ? [photo.key] : [])),
    ),
    // UI only — not sent to the API
    rememberDetails: z.boolean(),
    submitterContact: z.string().max(200, { message: 'tooLong' }).nullable(),
    submitterEducation: z.string().max(200, { message: 'tooLong' }).nullable(),
    submitterName: z
      .string({ error: () => ({ message: 'required' }) })
      .trim()
      .min(1, { message: 'required' })
      .max(100, { message: 'tooLong' }),
  }),
)

export type ObservationSubmitFormSchema = z.input<typeof observationSubmitSchema>
export type ObservationSubmitFormData = z.output<typeof observationSubmitSchema>
