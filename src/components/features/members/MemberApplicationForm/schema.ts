import { memberApplicationLimits, memberGenders, memberPaymentMethods } from '@domain/constants'
import { z } from 'zod'

// Mirrors the route's schema (api/members/applications), with messages for the form
const { age, emailMaxLength, nameMaxLength, phoneMaxLength, textMaxLength } =
  memberApplicationLimits

export const paymentMethods = memberPaymentMethods
export const genderKeys = memberGenders

export type PaymentMethod = (typeof paymentMethods)[number]

const requiredText = (maxLength: number) =>
  z.string().trim().min(1, { message: 'too_small' }).max(maxLength, { message: 'tooLong' })

const optionalText = z.string().trim().max(textMaxLength, { message: 'tooLong' })

// Starts unticked / unchosen (input allows undefined); submitting requires it
const agreement = z
  .boolean()
  .optional()
  .pipe(z.literal(true, { error: () => ({ message: 'required' }) }))

export const memberApplicationSchema = z.object({
  address: optionalText,
  age: z
    .number()
    .int()
    .min(age.min, { message: 'tooSmall' })
    .max(age.max, { message: 'tooLarge' })
    .nullable(),
  charterAgreed: agreement,
  // Empty → "Required", anything else that isn't an address → "Invalid format"
  email: z
    .email({ error: (issue) => (issue.input ? 'invalid_string' : 'required') })
    .max(emailMaxLength, { message: 'tooLong' }),
  firstName: requiredText(nameMaxLength),
  gender: z.enum(genderKeys).or(z.literal('')),
  honeypot: z.string(),
  lastName: requiredText(nameMaxLength),
  motivation: optionalText,
  occupation: optionalText,
  paymentMethod: z
    .enum(paymentMethods)
    .optional()
    .pipe(z.enum(paymentMethods, { message: 'required' })),
  phone: requiredText(phoneMaxLength),
  privacyAgreed: agreement,
})

export type MemberApplicationFormSchema = z.input<typeof memberApplicationSchema>
export type MemberApplicationFormData = z.output<typeof memberApplicationSchema>
