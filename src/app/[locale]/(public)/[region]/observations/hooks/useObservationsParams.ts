'use client'

import { useSearchParams } from 'next/navigation'

import {
  defaultFilters,
  type ObservationsParams,
  parseObservationsParams,
  serializeObservationsParams,
} from '../helpers/searchParams'

// Filters, sort and the open observation live in the URL, so any filtered view
// or single observation can be linked. Uses history.replaceState (which Next
// syncs into useSearchParams) — no navigation or server round-trip.
const useObservationsParams = () => {
  const searchParams = useSearchParams()
  const params = parseObservationsParams(new URLSearchParams(searchParams.toString()))

  const setParams = (changes: Partial<ObservationsParams>) => {
    const query = serializeObservationsParams({ ...params, ...changes })

    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  }

  const clearFilters = () => setParams({ ...defaultFilters, selectedId: null })

  return { clearFilters, params, setParams }
}

export default useObservationsParams
