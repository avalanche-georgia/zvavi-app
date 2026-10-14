import { z } from 'zod'

import { isExpiryAfterJoin, joinedAtSchema } from '../../MemberForm'

export const approveFormSchema = z
  .object({
    expiresAt: z.date().nullable(),
    joinedAt: joinedAtSchema,
  })
  .refine(isExpiryAfterJoin, { message: 'expiresAtBeforeJoined', path: ['expiresAt'] })

export type ApproveFormData = z.input<typeof approveFormSchema>
