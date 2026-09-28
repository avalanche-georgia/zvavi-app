'use client'

import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheItem from './AvalancheItem'
import QueueItem from './QueueItem'
import type { AvalancheTableVariant, OnAvalancheOpen } from './types'

type TableContentProps = {
  avalanches: AvalancheListItem[]
  onAvalancheOpen: OnAvalancheOpen
  regionId: RegionId
  variant: AvalancheTableVariant
}

const TableContent = ({ avalanches, onAvalancheOpen, regionId, variant }: TableContentProps) => {
  const t = useTranslations()
  const Row = variant === 'queue' ? QueueItem : AvalancheItem

  if (avalanches.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        {variant === 'queue'
          ? t('admin.observations.queue.empty')
          : t('admin.recentAvalanches.list.empty')}
      </div>
    )
  }

  return (
    <div className="overflow-y-auto">
      <ul className="flex flex-col">
        {avalanches.map((avalanche) => (
          <li key={avalanche.id} className="border-b last:border-0 even:bg-gray-100/60">
            <Row avalanche={avalanche} onOpen={onAvalancheOpen} regionId={regionId} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TableContent
