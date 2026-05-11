import { z } from 'zod'

export const userProfileFormSchema = z.object({
  about: z.string().trim(),
  firstName: z.string().trim().min(1, { message: 'too_small' }),
  lastName: z.string().trim().min(1, { message: 'too_small' }),
})

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>
