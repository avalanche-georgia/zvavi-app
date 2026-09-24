'use client'

import { useCallback, useState } from 'react'

import type { AvalancheSheetNavigation } from './types'

type Neighbors = { id: number; next: number | null; previous: number | null }

type UseAvalancheSheetNavigationParams = {
  // Records of the list behind the panel, in display order (current page)
  ids: number[]
  onDismiss: VoidFunction
  onShow: (id: number) => void
  selectedId: number | null
}

// Prev / next through the list behind the panel, and "advance": after the open
// record leaves the list (approved / rejected in the queue) move on to its
// neighbour instead of closing. Neighbours are remembered from the last time
// the record was in the list — by the time it's processed it may be gone.
const useAvalancheSheetNavigation = ({
  ids,
  onDismiss,
  onShow,
  selectedId,
}: UseAvalancheSheetNavigationParams) => {
  const [neighbors, setNeighbors] = useState<Neighbors | null>(null)
  const index = selectedId === null ? -1 : ids.indexOf(selectedId)
  const next = ids[index + 1] ?? null
  const previous = ids[index - 1] ?? null

  if (
    selectedId !== null &&
    index !== -1 &&
    (neighbors?.id !== selectedId || neighbors.next !== next || neighbors.previous !== previous)
  ) {
    setNeighbors({ id: selectedId, next, previous })
  }

  // Once the record has left the list (status changed under a filter), its
  // remembered neighbours still drive the arrows
  const remembered = neighbors?.id === selectedId ? neighbors : null
  const nextId = index === -1 ? (remembered?.next ?? null) : next
  const previousId = index === -1 ? (remembered?.previous ?? null) : previous

  const advance = useCallback(() => {
    const target = remembered ? (remembered.next ?? remembered.previous) : null

    if (target === null) {
      onDismiss()
    } else {
      onShow(target)
    }
  }, [onDismiss, onShow, remembered])

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
