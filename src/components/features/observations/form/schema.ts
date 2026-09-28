import { avalancheFieldLimits, observationPhotoLimits, sortedAspects } from '@domain/constants'
import { endOfToday } from 'date-fns'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

// Fields shared by the public submit form and the admin create/edit form. Each
// form extends this with its own fields (and its own `photos` output shape).

const { avalanche_trigger, avalanche_type } = Constants.public.Enums

const { descriptionMaxLength, latitude, longitude, quantity, slabDepth, width } =
  avalancheFieldLimits

const aspectSchema = z.enum(sortedAspects)

const aspectsSchema = z.object({
  alpine: z.array(aspectSchema),
  highAlpine: z.array(aspectSchema),
  subAlpine: z.array(aspectSchema),
})

// Nullable while the form is being filled in (no pin yet), required on submit —
// the pipe keeps `null` as a valid input type but narrows the output to number.
const coordinateSchema = ({ max, min }: { max: number; min: number }) =>
  z
    .number()
    .nullable()
    .pipe(
      z
        .number({ error: () => ({ message: 'required' }) })
        .min(min, { message: 'tooSmall' })
        .max(max, { message: 'tooLarge' }),
    )

const rangeSchema = ({ max, min }: { max: number; min: number }) =>
  z.number().min(min, { message: 'tooSmall' }).max(max, { message: 'tooLarge' })

// .pipe() gives the field a string input type (so RHF can hold an "unselected"
// '' before a pick) and an enum output type (so validated submit data is
// properly narrowed — no `as Enums<...>` cast in submit handlers)
export const requiredEnum = <const T extends readonly [string, ...string[]]>(values: T) =>
  z
    .string({ error: () => ({ message: 'required' }) })
    .min(1, { message: 'required' })
    .pipe(z.enum(values, { error: () => ({ message: 'required' }) }))

export const photoUploadStatuses = ['preparing', 'uploading', 'uploaded', 'failed'] as const

// One entry per photo. A new one is uploaded to R2 as soon as it's added (not
// on submit), so the form only has to wait for stragglers — the `superRefine`
// below blocks submit until every photo has a key. A photo already saved on the
// record (admin edit) has no `file` and is `uploaded` with its permanent key.
const photoUploadSchema = z.object({
  // null = a photo already saved on the record
  file: z.instanceof(File).nullable(),
  id: z.string(),
  key: z.string().nullable(),
  previewUrl: z.string(),
  progress: z.number(),
  status: z.enum(photoUploadStatuses),
})

// Each form adds its own output `transform` (public: pending keys; admin: kept
// + new keys)
export const photosSchema = z
  .array(photoUploadSchema)
  .max(observationPhotoLimits.maxCount)
  .superRefine((photos, context) => {
    if (photos.some((photo) => photo.status === 'failed')) {
      context.addIssue({ code: 'custom', message: 'failed' })
    } else if (photos.some((photo) => photo.status !== 'uploaded')) {
      context.addIssue({ code: 'custom', message: 'uploading' })
    }
  })

export const observationFieldsSchema = z.object({
  aspects: aspectsSchema,
  // Date-only: anything up to the end of today is fine (never in the future)
  date: z
    .date()
    .refine((date) => date <= endOfToday(), { message: 'futureDate' })
    .nullable(),
  description: z.string().max(descriptionMaxLength, { message: 'tooLong' }).nullable(),
  isDateUnknown: z.boolean(),
  latitude: coordinateSchema(latitude),
  longitude: coordinateSchema(longitude),
  photos: photosSchema,
  quantity: rangeSchema(quantity).int(),
  // No default on purpose: it must be picked (the DB column is NOT NULL)
  size: z
    .number()
    .nullable()
    .refine((value) => value !== null, { message: 'required' })
    .pipe(z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])),
  slabDepth: rangeSchema(slabDepth).nullable(),
  trigger: requiredEnum(avalanche_trigger),
  type: requiredEnum(avalanche_type),
  width: rangeSchema(width).nullable(),
})

// Either a date or "Not sure". `when` runs this even when other fields already
// failed (e.g. no pin yet) — otherwise the date error would only show up on a
// later submit. Applied to each form's final schema (a refined object can't be
// extended any more).
export const withDateOrUnknown = <
  T extends z.ZodType<{ date: Date | null; isDateUnknown: boolean }>,
>(
  schema: T,
) =>
  schema.refine((data) => data.isDateUnknown || data.date !== null, {
    message: 'required',
    path: ['date'],
    when: () => true,
  })

export type ObservationFormFields = z.input<typeof observationFieldsSchema>
export type PhotoUpload = z.input<typeof photoUploadSchema>
export type PhotoUploadStatus = PhotoUpload['status']
