import { z } from 'zod'

export const weatherStationFormSchema = z.object({
  nameEn: z.string().trim().min(1, { message: 'required' }),
  nameKa: z.string(),
  url: z.string().trim().min(1, { message: 'required' }),
})

export type WeatherStationFormSchema = z.infer<typeof weatherStationFormSchema>
