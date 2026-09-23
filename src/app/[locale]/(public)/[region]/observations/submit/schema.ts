import { observationPhotoLimits, sortedAspects } from '@domain/constants'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

const { avalanche_trigger, avalanche_type } = Constants.public.Enums

const aspectSchema = z.enum(sortedAspects)

const aspectsSchema = z.object({
  alpine: z.array(aspectSchema),
  highAlpine: z.array(aspectSchema),
  subAlpine: z.array(aspectSchema),
})

export const photoUploadStatuses = ['preparing', 'uploading', 'uploaded', 'failed'] as const

// One entry per photo the submitter picked. Each is uploaded to R2 as soon as
// it's added (not on submit), so the form only has to wait for stragglers —
// the `superRefine` below blocks submit until every photo has a key, and the
// output `transform` hands the submit handler just those keys.
const photoUploadSchema = z.object({
  file: z.instanceof(File),
  id: z.string(),
  key: z.string().nullable(),
  previewUrl: z.string(),
  progress: z.number(),
  status: z.enum(photoUploadStatuses),
})

const photosSchema = z
  .array(photoUploadSchema)
  .max(observationPhotoLimits.maxCount)
  .superRefine((photos, context) => {
    if (photos.some((photo) => photo.status === 'failed')) {
      context.addIssue({ code: 'custom', message: 'failed' })
    } else if (photos.some((photo) => photo.status !== 'uploaded')) {
      context.addIssue({ code: 'custom', message: 'uploading' })
    }
  })
  .transform((photos) => photos.flatMap((photo) => (photo.key ? [photo.key] : [])))

export const observationSubmitSchema = z.object({
  aspects: aspectsSchema,
  date: z.date().nullable(),
  description: z.string().max(2000, { message: 'tooLong' }).nullable(),
  honeypot: z.string(),
  isDateUnknown: z.boolean(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  photos: photosSchema,
  quantity: z.number().int().min(1).max(5),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  slabDepth: z.number().min(0).max(1000).nullable(),
  submitterContact: z.string().max(200, { message: 'tooLong' }).nullable(),
  submitterEducation: z.string().max(200, { message: 'tooLong' }).nullable(),
  submitterName: z
    .string({ error: () => ({ message: 'required' }) })
    .min(1, { message: 'required' })
    .max(100, { message: 'tooLong' }),
  // .pipe() gives trigger/type a string input type (so RHF/Select can hold an
  // "unselected" '' before the user picks) and an enum output type (so the
  // validated submit data is properly narrowed — no `as Enums<...>` cast
  // needed in the submit handler). See ObservationSubmitForm.tsx's `useForm`
  // generics for how the input/output split is wired to zodResolver.
  trigger: z
    .string({ error: () => ({ message: 'required' }) })
    .min(1, { message: 'required' })
    .pipe(z.enum(avalanche_trigger, { error: () => ({ message: 'required' }) })),
  type: z
    .string({ error: () => ({ message: 'required' }) })
    .min(1, { message: 'required' })
    .pipe(z.enum(avalanche_type, { error: () => ({ message: 'required' }) })),
  width: z.number().min(0).max(500).nullable(),
})

export type ObservationSubmitFormSchema = z.input<typeof observationSubmitSchema>
export type ObservationSubmitFormData = z.output<typeof observationSubmitSchema>
export type PhotoUpload = z.input<typeof photoUploadSchema>
export type PhotoUploadStatus = PhotoUpload['status']
