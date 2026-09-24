import type { PublicObservation, RegionId } from '@domain/types'

import { publicColumns, queryPublicObservations } from './publicObservationsQuery'
import toPublicObservations from './toPublicObservations'

// A single observation — for links to one that isn't in the loaded list page(s)
const fetchPublicObservation = async (
  id: number,
  regionId: RegionId,
): Promise<PublicObservation | null> => {
  const { data, error } = await queryPublicObservations(
    { dateBasis: 'occurred', regionId },
    { columns: publicColumns },
  )
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null

  const [observation] = await toPublicObservations([data])

  return observation
}

export default fetchPublicObservation
