import { problemSchema } from '@components/features/forecasts/Problems/problemSchema'
import { z } from 'zod'

const hazardLevelScale = z.enum(['0', '1', '2', '3', '4', '5'])
const required = { error: () => ({ message: 'required' }) }

export const forecastFormSchema = z
  .object({
    additionalHazards: z.string(),
    avalancheProblems: z.array(problemSchema),
    forecaster: z.string().trim().min(1, required),
    // Stored as the strings '0'–'5' (see save_forecast)
    hazardLevels: z.object({
      alpine: hazardLevelScale,
      highAlpine: hazardLevelScale,
      overall: hazardLevelScale,
      subAlpine: hazardLevelScale,
    }),
    // Links to catalog records; the records themselves are saved separately
    recentAvalancheIds: z.array(z.number()),
    snowpack: z.string(),
    // Shown first on the public forecast — a forecast without one isn't publishable
    summary: z.string().trim().min(1, required),
    validUntil: z.date().nullable(),
    weather: z.string(),
  })
  .superRefine(({ validUntil }, context) => {
    if (validUntil === null) {
      context.addIssue({ code: 'custom', message: 'required', path: ['validUntil'] })
    }
  })

export type ForecastFormSchema = z.infer<typeof forecastFormSchema>
