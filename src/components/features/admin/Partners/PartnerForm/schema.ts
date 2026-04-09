import { z } from 'zod'

export const partnerFormSchema = z.object({
  benefitEn: z.string(),
  benefitKa: z.string(),
  descriptionEn: z.string(),
  descriptionKa: z.string(),
  isActive: z.boolean(),
  logoUrl: z.string().min(1, { error: () => ({ message: 'required' }) }),
  nameEn: z.string().trim().min(1, { message: 'too_small' }),
  nameKa: z.string(),
  tier: z
    .nullable(z.union([z.literal(1), z.literal(2), z.literal(3)]))
    .refine((val): val is 1 | 2 | 3 => val !== null, { message: 'required' }),
  websiteUrl: z.string().trim().min(1, { message: 'required' }),
})

export type PartnerFormSchema = z.infer<typeof partnerFormSchema>
