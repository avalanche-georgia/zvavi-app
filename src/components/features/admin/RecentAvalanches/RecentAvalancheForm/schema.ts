import { avalancheFieldLimits, sortedAspects } from '@domain/constants'
import { z } from 'zod'

import { Constants } from '@/lib/supabase/types'

const { avalanche_status, avalanche_trigger, avalanche_type } = Constants.public.Enums

const {
  descriptionMaxLength,
  involvementMaxLength,
  latitude,
  locationMaxLength,
  longitude,
  quantity,
  slabDepth,
  width,
} = avalancheFieldLimits

const aspectSchema = z.enum(sortedAspects)

const aspectsSchema = z.object({
  alpine: z.array(aspectSchema),
  highAlpine: z.array(aspectSchema),
  subAlpine: z.array(aspectSchema),
})

const rangeSchema = ({ max, min }: { max: number; min: number }) =>
  z.number().min(min, { message: 'tooSmall' }).max(max, { message: 'tooLarge' })

// String input so RHF/Select can hold an "unselected" '' — enum output, so the
// submit handler gets properly narrowed values (same as the public form)
const requiredEnum = <const T extends readonly [string, ...string[]]>(values: T) =>
  z
    .string({ error: () => ({ message: 'required' }) })
    .min(1, { message: 'required' })
    .pipe(z.enum(values, { error: () => ({ message: 'required' }) }))

const optionalText = (maxLength: number) =>
  z.string().max(maxLength, { message: 'tooLong' }).nullable()

// Field rules match the public submit form (avalancheFieldLimits)
export const avalancheFormSchema = z.object({
  aspects: aspectsSchema,
  date: z.date().nullable(),
  description: z.string().max(descriptionMaxLength, { message: 'tooLong' }),
  involvement: optionalText(involvementMaxLength),
  isDateUnknown: z.boolean(),
  latitude: rangeSchema(latitude).nullable(),
  location: optionalText(locationMaxLength),
  longitude: rangeSchema(longitude).nullable(),
  quantity: rangeSchema(quantity).int(),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  slabDepth: rangeSchema(slabDepth).nullable(),
  status: requiredEnum(avalanche_status),
  trigger: requiredEnum(avalanche_trigger),
  type: requiredEnum(avalanche_type),
  width: rangeSchema(width).nullable(),
})

export type AvalancheFormSchema = z.input<typeof avalancheFormSchema>
export type AvalancheFormData = z.output<typeof avalancheFormSchema>

// Coordinates are required for every new record. Legacy records saved without
// them stay editable (enforced the same way by a DB trigger); a record that
// already has coordinates can't lose them.
export const getAvalancheFormSchema = (isLocationRequired: boolean) =>
  avalancheFormSchema.superRefine((data, context) => {
    // Either a date or "Date unknown" ticked — same as the public form
    if (!data.isDateUnknown && data.date === null) {
      context.addIssue({ code: 'custom', message: 'required', path: ['date'] })
    }

    if (!isLocationRequired) return

    if (data.latitude === null) {
      context.addIssue({ code: 'custom', message: 'required', path: ['latitude'] })
    }

    if (data.longitude === null) {
      context.addIssue({ code: 'custom', message: 'required', path: ['longitude'] })
    }
  })
