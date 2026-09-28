import { convertCamelToSnake, roundCoordinate } from '@data/helpers'

import type { UpdateAvalancheBody } from './schema'

import type { TablesUpdate } from '@/lib/supabase/types'

type AvalancheFields = Omit<UpdateAvalancheBody, 'photos'>

// Request fields → DB columns. Only the fields sent are included, so a partial
// update leaves the rest untouched. Coordinates get the same precision as the
// public submit path.
const toAvalancheRow = ({
  latitude,
  longitude,
  ...fields
}: AvalancheFields): TablesUpdate<'recent_avalanches'> => ({
  ...convertCamelToSnake(fields),
  ...(latitude !== undefined && { latitude: roundCoordinate(latitude) }),
  ...(longitude !== undefined && { longitude: roundCoordinate(longitude) }),
  // "Unknown" wins over a date picked before it was chosen
  ...(fields.isDateUnknown && { date: null }),
})

export default toAvalancheRow
