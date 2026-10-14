import { z } from 'zod'

const required = { error: () => ({ message: 'required' }) }

export const userProfileFormSchema = z.object({
  about: z.string().trim(),
  firstName: z.string().trim().min(1, required),
  lastName: z.string().trim().min(1, required),
})

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>
