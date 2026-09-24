'use client'

import { useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'src/i18n/navigation'

import type { AvalancheSheetMode } from './types'

// The open record lives in the URL (`?selectedId=`) so it survives reloads and
// can be shared; the mode it opens in (view / edit) is local.
const useAvalancheSelection = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [initialMode, setInitialMode] = useState<AvalancheSheetMode>('view')

  const selectedId = Number(searchParams.get('selectedId')) || null

  const setSelectedId = useCallback(
    (id: number | null, { isReplace = false }: { isReplace?: boolean } = {}) => {
      const params = new URLSearchParams(searchParams.toString())

      if (id === null) {
        params.delete('selectedId')
      } else {
        params.set('selectedId', String(id))
      }

      const href = `?${params.toString()}`

      if (isReplace) {
        router.replace(href, { scroll: false })
      } else {
        router.push(href, { scroll: false })
      }
    },
    [router, searchParams],
  )

  const openAvalanche = (id: number, mode: AvalancheSheetMode = 'view') => {
    setInitialMode(mode)
    setSelectedId(id)
  }

  const closeAvalanche = useCallback(() => setSelectedId(null), [setSelectedId])
  // Closing the panel wasn't the admin's action (e.g. the record left the
  // queue) — replace the entry so Back doesn't reopen and re-close it
  const dismissAvalanche = useCallback(
    () => setSelectedId(null, { isReplace: true }),
    [setSelectedId],
  )
  const reopenAvalanche = useCallback((id: number) => setSelectedId(id), [setSelectedId])

  return {
    closeAvalanche,
    dismissAvalanche,
    initialMode,
    openAvalanche,
    // Back into the URL without touching the mode (the panel is still open)
    reopenAvalanche,
    selectedId,
  }
}

export default useAvalancheSelection
