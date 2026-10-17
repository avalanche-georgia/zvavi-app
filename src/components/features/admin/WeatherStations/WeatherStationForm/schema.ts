import { z } from 'zod'

const required = { error: () => ({ message: 'required' }) }

// Nullable while the form is being filled in (no pin yet), required on submit —
// the pipe keeps `null` as a valid input type but narrows the output to number
const coordinateSchema = ({ max, min }: { max: number; min: number }) =>
  z
    .number()
    .nullable()
    .pipe(z.number(required).min(min, { message: 'tooSmall' }).max(max, { message: 'tooLarge' }))

export const weatherStationFormSchema = z.object({
  // Empty in the form is null; a saved station always has a number
  altitude: z
    .number(required)
    .int()
    .min(1, { error: () => ({ message: 'positive' }) })
    .nullable()
    .refine((value): value is number => value !== null, { message: 'required' }),
  latitude: coordinateSchema({ max: 90, min: -90 }),
  longitude: coordinateSchema({ max: 180, min: -180 }),
  nameEn: z.string().trim().min(1, required),
  nameKa: z.string(),
  url: z.string().trim().min(1, required),
})

export type WeatherStationFormValues = z.input<typeof weatherStationFormSchema>
export type WeatherStationFormSchema = z.output<typeof weatherStationFormSchema>
