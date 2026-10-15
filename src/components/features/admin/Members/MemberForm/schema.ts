import { memberApplicationLimits, memberGenders } from '@domain/constants'
import { startOfDay } from 'date-fns'
import { z } from 'zod'

// Required, and not later than today
export const joinedAtSchema = z
  .date({ error: () => ({ message: 'required' }) })
  .nullable()
  .refine((value) => value !== null, { message: 'required' })
  .refine((value) => value === null || startOfDay(value) <= startOfDay(new Date()), {
    message: 'joinedAtFuture',
  })

const { age, textMaxLength } = memberApplicationLimits

const optionalText = z.string().trim().max(textMaxLength, { message: 'tooLong' })

type MembershipDates = { expiresAt: Date | null; joinedAt: Date | null }

// A membership ends after the day it started (or never)
export const isExpiryAfterJoin = ({ expiresAt, joinedAt }: MembershipDates) =>
  !expiresAt || !joinedAt || startOfDay(expiresAt) > startOfDay(joinedAt)

export const memberFormSchema = z
  .object({
    address: optionalText,
    age: z
      .number()
      .int()
      .min(age.min, { message: 'tooSmall' })
      .max(age.max, { message: 'tooLarge' })
      .nullable(),
    email: z.email().or(z.literal('')),
    expiresAt: z.date().nullable(),
    firstName: z.string().trim().min(1, { message: 'required' }),
    gender: z.enum(memberGenders).or(z.literal('')),
    joinedAt: joinedAtSchema,
    lastName: z.string().trim().min(1, { message: 'required' }),
    memberId: z.string(),
    motivation: optionalText,
    notes: z.string(),
    occupation: optionalText,
    phone: z.string(),
    status: z.enum(['active', 'inactive', 'pending', 'suspended', 'expired']),
  })
  .refine(isExpiryAfterJoin, { message: 'expiresAtBeforeJoined', path: ['expiresAt'] })
  .refine(
    ({ expiresAt, status }) =>
      status !== 'active' || !expiresAt || startOfDay(expiresAt) >= startOfDay(new Date()),
    { message: 'activeWithExpiredDate', path: ['status'] },
  )

export type MemberFormSchema = z.infer<typeof memberFormSchema>
