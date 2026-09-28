import { type LinkableAvalanche, useRecentAvalancheQuery } from '@data/hooks/recentAvalanches'

// A linked record from the region's linkable list — or, when it isn't there
// (archived after it was linked), loaded on its own
const useLinkedRecord = (id: number, listed: LinkableAvalanche | undefined) => {
  const { data: loaded, isPending } = useRecentAvalancheQuery({ enabled: !listed, id })

  if (listed) return { avalanche: listed, isPending: false }

  if (!loaded) return { avalanche: null, isPending }

  const avalanche: LinkableAvalanche = {
    ...loaded,
    date: loaded.date ? String(loaded.date) : null,
    status: loaded.status ?? 'published',
  }

  return { avalanche, isPending: false }
}

export default useLinkedRecord
