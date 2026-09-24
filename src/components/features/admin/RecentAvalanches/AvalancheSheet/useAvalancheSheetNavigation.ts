'use client'

import { useCallback, useEffect, useState } from 'react'

import type { AvalancheSheetNavigation } from './types'

type Neighbors = { id: number; index: number; next: number | null; previous: number | null }

type UseAvalancheSheetNavigationParams = {
  // Records of the list behind the panel, in display order (current page)
  ids: number[]
  onDismiss: VoidFunction
  onShow: (id: number) => void
  selectedId: number | null
}

// Prev / next through the list behind the panel, and "advance": once the open
// record leaves the list (approved / rejected / deleted in the queue), move on
// instead of closing. Its position is remembered from the last time it was in
// the list; the advance waits for the refreshed list and takes whatever now
// sits there — the next record, even one pulled in from the next page — else
// the one before, else closes.
const useAvalancheSheetNavigation = ({
  ids,
  onDismiss,
  onShow,
  selectedId,
}: UseAvalancheSheetNavigationParams) => {
  const [neighbors, setNeighbors] = useState<Neighbors | null>(null)
  // The record being advanced away from, until the list no longer has it
  const [leaving, setLeaving] = useState<Neighbors | null>(null)
  const index = selectedId === null ? -1 : ids.indexOf(selectedId)
  const next = ids[index + 1] ?? null
  const previous = ids[index - 1] ?? null

  if (
    selectedId !== null &&
    index !== -1 &&
    (neighbors?.id !== selectedId ||
      neighbors.index !== index ||
      neighbors.next !== next ||
      neighbors.previous !== previous)
  ) {
    setNeighbors({ id: selectedId, index, next, previous })
  }

  // Once the record has left the list (status changed under a filter), its
  // remembered neighbours still drive the arrows
  const remembered = neighbors?.id === selectedId ? neighbors : null
  const nextId = index === -1 ? (remembered?.next ?? null) : next
  const previousId = index === -1 ? (remembered?.previous ?? null) : previous

  const advance = useCallback(() => {
    if (remembered) {
      setLeaving(remembered)
    } else {
      onDismiss()
    }
  }, [onDismiss, remembered])

  const isListRefreshed = leaving !== null && !ids.includes(leaving.id)

  useEffect(() => {
    if (!leaving || !isListRefreshed) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeaving(null)

    // The admin already moved on to another record meanwhile — stay there
    if (selectedId !== leaving.id) return

    const target = ids[leaving.index] ?? ids[leaving.index - 1] ?? null

    if (target === null) {
      onDismiss()
    } else {
      onShow(target)
    }
  }, [ids, isListRefreshed, leaving, onDismiss, onShow, selectedId])

  const navigation: AvalancheSheetNavigation = {
    hasNext: nextId !== null,
    hasPrevious: previousId !== null,
    index: index === -1 ? null : index,
    onNext: () => nextId !== null && onShow(nextId),
    onPrevious: () => previousId !== null && onShow(previousId),
    total: ids.length,
  }

  return { advance, navigation }
}

export default useAvalancheSheetNavigation
