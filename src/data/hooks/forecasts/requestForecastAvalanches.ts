import type { PublicAvalanche } from '@domain/types'

type ForecastAvalanchesResponse = { avalanches?: PublicAvalanche[]; error?: string; ok: boolean }

// Public linked records go through a server route: anon can't read external
// records, and the route picks the public-safe columns
const requestForecastAvalanches = async (forecastId: number): Promise<PublicAvalanche[]> => {
  const response = await fetch(`/api/forecasts/${forecastId}/avalanches`)
  const result = (await response.json()) as ForecastAvalanchesResponse

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to fetch avalanches')

  return result.avalanches ?? []
}

export default requestForecastAvalanches
