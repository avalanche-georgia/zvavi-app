import { z } from 'zod'

const required = { error: () => ({ message: 'required' }) }

export const weatherStationFormSchema = z.object({
  // Empty in the form is null; a saved station always has a number
  altitude: z
    .number(required)
    .int()
    .min(1, { error: () => ({ message: 'positive' }) })
    .nullable()
    .refine((value): value is number => value !== null, { message: 'required' }),
  nameEn: z.string().trim().min(1, required),
  nameKa: z.string(),
  url: z.string().trim().min(1, required),
})

export type WeatherStationFormValues = z.input<typeof weatherStationFormSchema>
export type WeatherStationFormSchema = z.output<typeof weatherStationFormSchema>
