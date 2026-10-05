import { type LinkableAvalanche, useRecentAvalancheQuery } from '@data/hooks/recentAvalanches'

// A linked record from the region's linkable list — or, when it isn't there
// (archived after it was linked), loaded on its own. Waits for the list first,
// so a cold page doesn't fetch every record twice.
const useLinkedRecord = (
  id: number,
  listed: LinkableAvalanche | undefined,
  isListPending: boolean,
) => {
  const { data: loaded, isPending } = useRecentAvalancheQuery({
    enabled: !listed && !isListPending,
    id,
  })

  if (listed) return { avalanche: listed, isMissing: false, isPending: false }
  if (isListPending) return { avalanche: null, isMissing: false, isPending: true }

  // null = the record is gone; undefined = still loading or failed to load
  if (!loaded) return { avalanche: null, isMissing: loaded === null, isPending }

  const avalanche: LinkableAvalanche = {
    ...loaded,
    date: loaded.date ? String(loaded.date) : null,
    status: loaded.status ?? 'published',
  }

  return { avalanche, isMissing: false, isPending: false }
}

export default useLinkedRecord
