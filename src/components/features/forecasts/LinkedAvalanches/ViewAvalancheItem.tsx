'use client'

import { formatAvalancheId } from '@components/features/observations'
import { Skeleton } from '@components/ui'
import type { LinkableAvalanche } from '@data/hooks/recentAvalanches'
import { Button } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import AvalancheRecordCard from './AvalancheRecordCard'
import PublicHiddenNote from './PublicHiddenNote'
import useLinkedRecord from './useLinkedRecord'

type ViewAvalancheItemProps = {
  id: number
  // The region list is still loading: wait before fetching the record on its own
  isListPending: boolean
  listed: LinkableAvalanche | undefined
  onView: VoidFunction
}

// A linked record on the read-only forecast view
const ViewAvalancheItem = ({ id, isListPending, listed, onView }: ViewAvalancheItemProps) => {
  const t = useTranslations()
  const { avalanche, isMissing, isPending } = useLinkedRecord(id, listed, isListPending)

  if (isPending) return <Skeleton className="h-28 rounded-[14px]" />

  // Deleted since it was linked
  if (isMissing) return null

  // Failed to load (not deleted): say so instead of silently dropping the card
  if (!avalanche) {
    return (
      <p className="border-rule text-copy-sm text-muted rounded-[14px] border p-3.5">
        {t('admin.forecasts.view.recordLoadFailed', { id: formatAvalancheId(id) })}
      </p>
    )
  }

  return (
    <AvalancheRecordCard
      actions={
        <Button className="@max-[620px]:w-full" onClick={onView} size="sm" variant="secondary">
          {t('admin.forecasts.view.openRecord')}
        </Button>
      }
      avalanche={avalanche}
      // Pending / draft / archived records are linked but the public page hides them
      footer={avalanche.status !== 'published' && <PublicHiddenNote status={avalanche.status} />}
      onView={onView}
    />
  )
}

export default ViewAvalancheItem
