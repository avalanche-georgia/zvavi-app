import { z } from 'zod'

import {
  maxSocialLinkLength,
  maxSocialLinks,
  normalizeSocialUrl,
  parseSocialLink,
} from '@/lib/socialLinks'

const required = { error: () => ({ message: 'required' }) }

export const teamTitleMaxLength = 24

const invalidUrl = { error: () => ({ message: 'invalidUrl' }) }

// Empty rows are dropped on submit; anything else must become an https link.
// Saved in its parsed form (spaces and other characters encoded), which is what
// the database accepts
const socialLinkSchema = z.object({
  url: z
    .string()
    .transform(normalizeSocialUrl)
    .refine((url) => !url || parseSocialLink(url) !== null, invalidUrl)
    .transform((url) => (url && parseSocialLink(url)?.href) || '')
    .refine((url) => url.length <= maxSocialLinkLength, {
      error: () => ({ message: 'tooLong' }),
    }),
})

export const userProfileFormSchema = z.object({
  about: z.string().trim(),
  firstName: z.string().trim().min(1, required),
  lastName: z.string().trim().min(1, required),
  socialLinks: z.array(socialLinkSchema).max(maxSocialLinks),
  teamTitle: z
    .string()
    .trim()
    .max(teamTitleMaxLength, { error: () => ({ message: 'tooLong' }) }),
})

export type UserProfileFormInput = z.input<typeof userProfileFormSchema>
export type UserProfileFormSchema = z.output<typeof userProfileFormSchema>
