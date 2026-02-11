import { z } from 'zod'

export const paymentMethods = ['bank_gel', 'bank_foreign', 'wise', 'contact_me'] as const

export type PaymentMethod = (typeof paymentMethods)[number]

export const memberApplicationSchema = z.object({
  address: z.string().default(''),
  charterAgreed: z.literal(true, { error: () => ({ message: 'required' }) }),
  email: z.string().email({ message: 'invalid_string' }),
  fullName: z.string().min(1, { message: 'too_small' }),
  motivation: z.string().min(1, { message: 'too_small' }),
  occupation: z.string().min(1, { message: 'too_small' }),
  paymentMethod: z.enum(paymentMethods, { message: 'required' }),
  phone: z.string().min(1, { message: 'too_small' }),
})

export type MemberApplicationFormData = z.input<typeof memberApplicationSchema>
