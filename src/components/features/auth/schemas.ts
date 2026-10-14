import { z } from 'zod'

const required = z.string().min(1, { error: () => ({ message: 'required' }) })

export const emailField = z
  .string()
  .trim()
  .min(1, { error: () => ({ message: 'required' }) })
  .pipe(z.email({ error: () => ({ message: 'invalid_string' }) }))

export const passwordField = required

export const newPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    password: z.string().min(8, { error: () => ({ message: 'passwordTooShort' }) }),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  })
