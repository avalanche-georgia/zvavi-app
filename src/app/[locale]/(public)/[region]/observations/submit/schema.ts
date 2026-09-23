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
  description: z.string().max(2000).nullable(),
  honeypot: z.string(),
  isDateUnknown: z.boolean(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  quantity: z.number().int().min(1).max(5),
  size: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  slabDepth: z.number().min(0).max(1000).nullable(),
  submitterContact: z.string().max(200).nullable(),
  submitterEducation: z.string().max(200).nullable(),
  submitterName: z
    .string({ error: () => ({ message: 'required' }) })
    .min(1, { message: 'required' })
    .max(100),
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
