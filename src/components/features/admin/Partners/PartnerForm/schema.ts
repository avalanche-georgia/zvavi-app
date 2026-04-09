import { z } from 'zod'

export const partnerFormSchema = z.object({
  benefitEn: z.string(),
  benefitKa: z.string(),
  isActive: z.boolean(),
  logoUrl: z.string().min(1, { error: () => ({ message: 'required' }) }),
  nameEn: z.string().trim().min(1, { message: 'too_small' }),
  nameKa: z.string(),
  websiteUrl: z.string(),
})

export type PartnerFormSchema = z.infer<typeof partnerFormSchema>
