import { convertSnakeToCamel } from '@data/helpers'
import type { Avalanche, RegionId } from '@domain/types'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Explicit column list — never `select('*')` here. submitter_contact,
// submitter_education, and created_by_user_id must never reach this
// public-facing endpoint (see recent_avalanches RLS: anon can't read
// external rows directly, this route is the only path to them).
const publicColumns =
  'id, region_id, date, is_date_unknown, description, size, quantity, location, latitude, ' +
  'longitude, type, trigger, aspects, involvement, width, slab_depth, photo_keys, ' +
  'submitter_name, created_at'

export type FetchPublicObservationsParams = {
  dateFrom?: string
  dateTo?: string
  regionId: RegionId
}

const fetchPublicObservations = async ({
  dateFrom,
  dateTo,
  regionId,
}: FetchPublicObservationsParams): Promise<Avalanche[]> => {
  const supabase = createServiceRoleClient()

  let query = supabase
    .from('recent_avalanches')
    .select(publicColumns)
    .eq('source', 'external')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .order('date', { ascending: false })

  if (dateFrom) query = query.gte('date', dateFrom)
  if (dateTo) query = query.lte('date', dateTo)

  const { data, error } = await query

  if (error) throw new Error(error.message)

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data ?? []) as Avalanche[]
}

export default fetchPublicObservations
