import { z } from 'zod'

export const paymentMethods = ['bank_gel', 'bank_foreign', 'wise', 'contact_me'] as const

export type PaymentMethod = (typeof paymentMethods)[number]

export const memberApplicationSchema = z.object({
  address: z.string().default(''),
  age: z.number().int().min(0).max(120).nullable(),
  charterAgreed: z.literal(true, { error: () => ({ message: 'required' }) }),
  // Empty → "Required", anything else that isn't an address → "Invalid format"
  email: z.email({ error: (issue) => (issue.input ? 'invalid_string' : 'required') }),
  firstName: z.string().trim().min(1, { message: 'too_small' }),
  gender: z.string().default(''),
  lastName: z.string().trim().min(1, { message: 'too_small' }),
  motivation: z.string().default(''),
  occupation: z.string().default(''),
  paymentMethod: z.enum(paymentMethods, { message: 'required' }),
  phone: z.string().trim().min(1, { message: 'too_small' }),
  privacyAgreed: z.literal(true, { error: () => ({ message: 'required' }) }),
})

export type MemberApplicationFormData = z.input<typeof memberApplicationSchema>

export const genderKeys = ['male', 'female', 'preferNotToSay'] as const
