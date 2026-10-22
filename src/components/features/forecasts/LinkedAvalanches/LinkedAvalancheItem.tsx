import { useEffect } from 'react'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { Skeleton } from '@ds/primitives'

import LinkedAvalancheCard from './LinkedAvalancheCard'
import useLinkedRecord from './useLinkedRecord'

type LinkedAvalancheItemProps = {
  forecastId: number | undefined
  id: number
  // The region list is still loading: wait before fetching the record on its own
  isListPending: boolean
  isSaved: boolean
  listed: LinkableAvalanche | undefined
  onEdit: VoidFunction
  // The record no longer exists
  onMissing: VoidFunction
  onRemove: VoidFunction
  onView: VoidFunction
}

// Resolves a linked id to its record, then shows its card
const LinkedAvalancheItem = ({
  id,
  isListPending,
  listed,
  onMissing,
  ...cardProps
}: LinkedAvalancheItemProps) => {
  const { avalanche, isMissing, isPending } = useLinkedRecord(id, listed, isListPending)

  // Deleted elsewhere since it was linked: drop the id, or the save would fail
  useEffect(() => {
    if (isMissing) onMissing()
  }, [isMissing, onMissing])

  if (isPending) return <Skeleton className="rounded-card h-28" />

  if (!avalanche) return null

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <LinkedAvalancheCard avalanche={avalanche} {...cardProps} />
}

export default LinkedAvalancheItem
