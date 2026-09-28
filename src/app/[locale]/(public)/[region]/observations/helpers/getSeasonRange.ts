import { avalancheSeason } from '@domain/constants'
import { endOfDay, startOfDay } from 'date-fns'

// The current avalanche season, 1 Nov – 31 May. Between seasons (June–October)
// it's the one that just ended.
const getSeasonRange = (today: Date): { end: Date; start: Date } => {
  const { end, start } = avalancheSeason
  const startYear = today.getMonth() >= start.month ? today.getFullYear() : today.getFullYear() - 1

  return {
    end: endOfDay(new Date(startYear + 1, end.month, end.day)),
    start: startOfDay(new Date(startYear, start.month, start.day)),
  }
}

export default getSeasonRange
