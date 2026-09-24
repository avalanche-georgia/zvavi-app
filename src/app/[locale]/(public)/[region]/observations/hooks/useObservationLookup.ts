import { usePublicObservationQuery } from '@data/hooks/observations'
import type { PublicObservation, RegionId } from '@domain/types'

type ObservationLookupParams = {
  id: number | null
  // Wait until the list has loaded — the observation is usually in it
  isListReady: boolean
  observations: PublicObservation[]
  regionId: RegionId
}

// An observation by id: from the loaded list pages when it's there, fetched on
// its own otherwise (a link, or a map pin whose list page isn't loaded yet)
const useObservationLookup = ({
  id,
  isListReady,
  observations,
  regionId,
}: ObservationLookupParams) => {
  const loaded = observations.find((observation) => observation.id === id)
  const { data: fetched, isError } = usePublicObservationQuery({
    id,
    isEnabled: isListReady && !loaded,
    regionId,
  })

  return {
    // Unpublished, deleted, or a bad id in a link
    isNotFound: id !== null && !loaded && isError,
    observation: id === null ? null : (loaded ?? fetched ?? null),
  }
}

export default useObservationLookup
