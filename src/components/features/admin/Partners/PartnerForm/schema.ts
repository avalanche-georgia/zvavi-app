import { z } from 'zod'

export const partnerFormSchema = z.object({
  benefitEn: z.string(),
  benefitKa: z.string(),
  descriptionEn: z.string(),
  descriptionKa: z.string(),
  isActive: z.boolean(),
  logoUrl: z.string().min(1, { error: () => ({ message: 'required' }) }),
  nameEn: z
    .string()
    .trim()
    .min(1, { error: () => ({ message: 'required' }) }),
  nameKa: z.string(),
  tier: z
    .nullable(z.union([z.literal(1), z.literal(2), z.literal(3)]))
    .refine((value): value is 1 | 2 | 3 => value !== null, { message: 'required' }),
  websiteUrl: z
    .string()
    .trim()
    .min(1, { error: () => ({ message: 'required' }) }),
})
