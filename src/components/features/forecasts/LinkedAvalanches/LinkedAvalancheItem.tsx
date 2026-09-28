import { Skeleton } from '@components/ui'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'

import LinkedAvalancheCard from './LinkedAvalancheCard'
import useLinkedRecord from './useLinkedRecord'

type LinkedAvalancheItemProps = {
  forecastId: number | undefined
  id: number
  isSaved: boolean
  listed: LinkableAvalanche | undefined
  onEdit: VoidFunction
  onRemove: VoidFunction
  onView: VoidFunction
}

// Resolves a linked id to its record, then shows its card
const LinkedAvalancheItem = ({ id, listed, ...cardProps }: LinkedAvalancheItemProps) => {
  const { avalanche, isPending } = useLinkedRecord(id, listed)

  if (isPending) return <Skeleton className="h-28 rounded-[14px]" />

  // Deleted since it was linked: saving the forecast drops the link
  if (!avalanche) return null

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <LinkedAvalancheCard avalanche={avalanche} {...cardProps} />
}

export default LinkedAvalancheItem
