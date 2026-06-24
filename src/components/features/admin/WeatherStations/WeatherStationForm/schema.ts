import { z } from 'zod'

export const weatherStationFormSchema = z.object({
  altitude: z
    .number({ error: () => ({ message: 'required' }) })
    .int()
    .min(1, { error: () => ({ message: 'positive' }) }),
  nameEn: z.string().trim().min(1, { message: 'required' }),
  nameKa: z.string(),
  url: z.string().trim().min(1, { message: 'required' }),
})

export type WeatherStationFormSchema = z.infer<typeof weatherStationFormSchema>
