import { convertSnakeToCamel } from '@data/helpers'
import type { ObservationDateBasis, PublicObservation, RegionId } from '@domain/types'

import shortenName from './shortenName'

import { signPhotoUrls } from '@/lib/r2'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Explicit column list — never `select('*')` here. submitter_contact,
// submitter_education, created_by_user_id, and involvement (internal-only,
// see its "(internal)" label on the admin form) must never reach this
// public-facing endpoint (see recent_avalanches RLS: anon can't read
// external rows directly, this route is the only path to them).
const publicColumns =
  'id, region_id, date, is_date_unknown, description, size, quantity, latitude, ' +
  'longitude, type, trigger, aspects, width, slab_depth, photo_keys, ' +
  'submitter_name, created_at'

const dateColumns: Record<ObservationDateBasis, 'created_at' | 'date'> = {
  occurred: 'date',
  reported: 'created_at',
}

type PublicObservationRow = Omit<PublicObservation, 'aspects' | 'description' | 'photos'> & {
  aspects: PublicObservation['aspects'] | null
  description: string | null
  photoKeys: string[] | null
  submitterName: string | null
}

const emptyAspects: PublicObservation['aspects'] = { alpine: [], highAlpine: [], subAlpine: [] }

// Upper bound for one response — the page has no pagination yet, and this is an
// anonymous endpoint, so its cost must not grow with the dataset
const maxRows = 500

export type FetchPublicObservationsParams = {
  dateBasis: ObservationDateBasis
  dateFrom?: string
  dateTo?: string
  regionId: RegionId
}

const fetchPublicObservations = async ({
  dateBasis,
  dateFrom,
  dateTo,
  regionId,
}: FetchPublicObservationsParams): Promise<PublicObservation[]> => {
  const supabase = createServiceRoleClient()
  const dateColumn = dateColumns[dateBasis]

  let query = supabase
    .from('recent_avalanches')
    .select(publicColumns)
    .eq('source', 'external')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .order(dateColumn, { ascending: false, nullsFirst: false })
    .limit(maxRows)

  // A date range can only match observations whose date is actually known
  if (dateBasis === 'occurred' && (dateFrom || dateTo)) query = query.eq('is_date_unknown', false)
  if (dateFrom) query = query.gte(dateColumn, dateFrom)
  if (dateTo) query = query.lte(dateColumn, dateTo)

  const { data, error } = await query

  if (error) throw new Error(error.message)

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const rows = convertSnakeToCamel(data ?? []) as PublicObservationRow[]

  const photoUrls = await signPhotoUrls(rows.flatMap((row) => row.photoKeys ?? []))

  return rows.map(({ aspects, description, photoKeys, submitterName, ...row }) => ({
    ...row,
    aspects: aspects ?? emptyAspects,
    description: description ?? '',
    photos: (photoKeys ?? []).map((key) => photoUrls.get(key)!),
    submitterName: shortenName(submitterName),
  }))
}

export default fetchPublicObservations
