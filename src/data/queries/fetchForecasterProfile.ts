import type { Forecast, TeamMember } from '@domain/types'

import fetchTeamMember from './fetchTeamMember'

import 'server-only'
import { reportServerError } from '@/lib/posthog/server'

// The forecaster's public Team profile, for the link on their name. A failed
// lookup only costs the link — the name still shows.
const fetchForecasterProfile = async ({
  forecasterId,
  id,
}: Pick<Forecast, 'forecasterId' | 'id'>): Promise<TeamMember | null> => {
  if (!forecasterId) return null

  try {
    return await fetchTeamMember(forecasterId)
  } catch (error) {
    reportServerError(error, { forecast_id: id, scope: 'fetchForecasterProfile' })

    return null
  }
}

export default fetchForecasterProfile
