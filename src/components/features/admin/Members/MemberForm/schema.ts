import { startOfDay } from 'date-fns'
import { z } from 'zod'

export const memberFormSchema = z
  .object({
    email: z.email().or(z.literal('')),
    expiresAt: z.date().nullable(),
    firstName: z.string().min(1, { message: 'too_small' }),
    joinedAt: z
      .date({ message: 'required' })
      .nullable()
      .refine((val) => val !== null, {
        message: 'required',
      })
      .refine((val) => val === null || startOfDay(val) <= startOfDay(new Date()), {
        message: 'joinedAtFuture',
      }),
    lastName: z.string().min(1, { message: 'too_small' }),
    memberId: z.string(),
    notes: z.string(),
    phone: z.string(),
    status: z.enum(['active', 'inactive', 'suspended', 'expired']),
  })
  .refine(
    (data) => {
      if (!data.expiresAt || !data.joinedAt) return true

      return startOfDay(data.expiresAt) > startOfDay(data.joinedAt)
    },
    { message: 'expiresAtBeforeJoined', path: ['expiresAt'] },
  )

export type MemberFormSchema = z.infer<typeof memberFormSchema>
