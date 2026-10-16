import { memberApplicationLimits, memberGenders, memberPaymentMethods } from '@domain/constants'
import { z } from 'zod'

const { age, emailMaxLength, nameMaxLength, phoneMaxLength, textMaxLength } =
  memberApplicationLimits

const optionalText = z.string().trim().max(textMaxLength)

// Authoritative check of a public application: the RPC behind this route trusts it
export const memberApplicationBodySchema = z.object({
  address: optionalText,
  age: z.number().int().min(age.min).max(age.max).nullable(),
  email: z.email().max(emailMaxLength),
  firstName: z.string().trim().min(1).max(nameMaxLength),
  gender: z.enum(memberGenders).or(z.literal('')),
  lastName: z.string().trim().min(1).max(nameMaxLength),
  motivation: optionalText,
  occupation: optionalText,
  paymentMethod: z.enum(memberPaymentMethods),
  phone: z.string().trim().min(1).max(phoneMaxLength),
})

export type MemberApplicationBody = z.infer<typeof memberApplicationBodySchema>
