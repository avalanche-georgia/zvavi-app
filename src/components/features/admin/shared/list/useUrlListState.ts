'use client'

import { useSearchParams } from 'next/navigation'

type ListParamsCodec<TParams> = {
  // URL → list state; anything unknown falls back to the default
  read: (searchParams: Pick<URLSearchParams, 'get'>) => TParams
  // List state → query string. Defaults are left out; other keys in `base` are kept.
  serialize: (params: TParams, base: URLSearchParams) => string
}

// Filters, sort and page live in the URL so a view can be shared or reloaded.
// history.replaceState (Next syncs it into useSearchParams): no navigation, no server round trip.
const useUrlListState = <TParams extends { pageIndex: number }>({
  read,
  serialize,
}: ListParamsCodec<TParams>) => {
  const searchParams = useSearchParams()

  // Reads the URL at call time, not render-time params — so the debounced search
  // write can't undo a filter changed meanwhile
  const setParams = (changes: Partial<TParams>) => {
    const urlParams = new URLSearchParams(window.location.search)
    const query = serialize({ ...read(urlParams), ...changes }, urlParams)

    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname)
  }

  // Any filter change starts again from the first page
  const setFilters = (changes: Partial<TParams>) => setParams({ ...changes, pageIndex: 0 })

  return { params: read(searchParams), setFilters, setParams }
}

export default useUrlListState
