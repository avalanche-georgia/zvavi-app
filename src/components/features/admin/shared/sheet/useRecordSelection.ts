'use client'

import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

type UseRecordSelectionParams<TMode extends string> = {
  defaultMode: TMode
  // Name of the query parameter that holds the open record's id
  param: string
  // Parameters of other sheets that opening a record replaces (e.g. `create`)
  replacedParams?: string[]
}

// The record open in a sheet lives in the URL (`?member=<id>`), so it survives a
// reload, Back closes it and the link can be shared. The mode it opens in is local.
const noParams: string[] = []

const useRecordSelection = <TMode extends string>({
  defaultMode,
  param,
  replacedParams = noParams,
}: UseRecordSelectionParams<TMode>) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [initialMode, setInitialMode] = useState<TMode>(defaultMode)

  const selectedId = searchParams.get(param) || null

  const setSelectedId = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (id === null) {
        params.delete(param)
      } else {
        params.set(param, id)
        replacedParams.forEach((replaced) => params.delete(replaced))
      }

      router.push(`?${params.toString()}`, { scroll: false })
    },
    [param, replacedParams, router, searchParams],
  )

  const openRecord = (id: string, mode: TMode = defaultMode) => {
    setInitialMode(mode)
    setSelectedId(id)
  }

  const closeRecord = useCallback(() => setSelectedId(null), [setSelectedId])

  return {
    closeRecord,
    initialMode,
    openRecord,
    // Back into the URL without touching the mode (the sheet is still open)
    reopenRecord: setSelectedId,
    selectedId,
  }
}

export default useRecordSelection
