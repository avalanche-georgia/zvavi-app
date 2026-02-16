import { z } from 'zod'

export const paymentMethods = ['bank_gel', 'bank_foreign', 'wise', 'contact_me'] as const

export type PaymentMethod = (typeof paymentMethods)[number]

export const memberApplicationSchema = z.object({
  address: z.string().default(''),
  age: z.string().default(''),
  charterAgreed: z.literal(true, { error: () => ({ message: 'required' }) }),
  email: z.email({ message: 'invalid_string' }),
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
