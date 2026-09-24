'use client'

import { useEffect, useState } from 'react'
import { type AvalancheListItem, useRecentAvalancheQuery } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'

import type { AvalancheSheetConfirm, AvalancheSheetMode } from './types'

type UseAvalancheSheetParams = {
  id: number | null
  initialMode: AvalancheSheetMode
  // Put the record back in the URL — used when it was removed (browser back)
  // while there were unsaved edits
  onReopen: (id: number) => void
  regionId?: RegionId
}

const useAvalancheSheet = ({ id, initialMode, onReopen, regionId }: UseAvalancheSheetParams) => {
  const query = useRecentAvalancheQuery({ enabled: id !== null, id: id ?? 0, regionId })
  const [previousId, setPreviousId] = useState(id)
  const [mode, setMode] = useState(initialMode)
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [confirm, setConfirm] = useState<AvalancheSheetConfirm>(null)
  // Keeps the content rendered while the panel animates closed
  const [shownAvalanche, setShownAvalanche] = useState<AvalancheListItem | null>(null)

  const avalanche = query.data ?? null
  const hasUnsavedEdits = mode === 'edit' && isDirty

  // Every newly opened record starts fresh, in the mode it was opened with —
  // except the same record coming back after an interrupted close (see below)
  if (id !== previousId) {
    setPreviousId(id)

    if (id === null && hasUnsavedEdits) {
      setConfirm('close')
    } else if (id !== null && !(hasUnsavedEdits && id === shownAvalanche?.id)) {
      setMode(initialMode)
      setIsDirty(false)
      setConfirm(null)
    }
  }

  if (avalanche && avalanche !== shownAvalanche) setShownAvalanche(avalanche)

  // Removed from the URL from outside (browser back) with unsaved edits: put it
  // back — the panel stayed open and asks first (confirm set above)
  const reopenId = id === null && hasUnsavedEdits ? (shownAvalanche?.id ?? null) : null

  useEffect(() => {
    if (reopenId !== null) onReopen(reopenId)
  }, [onReopen, reopenId])

  const showView = () => {
    setMode('view')
    setIsDirty(false)
    setConfirm(null)
  }

  return {
    avalanche: id === null ? shownAvalanche : avalanche,
    confirm,
    hasUnsavedEdits,
    isError: id !== null && query.isError,
    isPending: id !== null && query.isPending,
    isSaving,
    mode,
    onRetry: query.refetch,
    setConfirm,
    setIsDirty,
    setIsSaving,
    setMode,
    showView,
  }
}

export default useAvalancheSheet
