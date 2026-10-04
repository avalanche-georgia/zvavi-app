import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type {
  Aspects,
  AvalancheSize,
  AvalancheStatus,
  AvalancheTrigger,
  AvalancheType,
  RegionId,
} from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel, handleSupabaseError } from '../../helpers'

export type LinkableAvalanche = {
  aspects: Aspects | null
  createdAt: string
  date: string | null
  forecastAvalanche: { forecastId: number }[]
  id: number
  isDateUnknown: boolean
  location: string | null
  quantity: number
  size: AvalancheSize
  status: AvalancheStatus
  trigger: AvalancheTrigger
  type: AvalancheType | 'unknown'
}

// Everything a forecast can link to: the region's records of any source,
// except archived ones. Newest first.
const fetchLinkableAvalanches = async (regionId: RegionId): Promise<LinkableAvalanche[]> => {
  const { data, error } = await supabase
    .from('recent_avalanches')
    .select(
      'id, aspects, created_at, date, is_date_unknown, location, quantity, size, status, trigger, type, forecast_avalanche(forecast_id)',
    )
    .eq('region_id', regionId)
    .neq('status', 'archived')
    .order('date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  handleSupabaseError(error)

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data ?? []) as LinkableAvalanche[]
}

const useLinkableAvalanchesQuery = ({ regionId }: { regionId: RegionId }) =>
  useQuery({
    queryFn: () => fetchLinkableAvalanches(regionId),
    queryKey: recentAvalanchesKeys.linkable(regionId),
  })

export default useLinkableAvalanchesQuery
