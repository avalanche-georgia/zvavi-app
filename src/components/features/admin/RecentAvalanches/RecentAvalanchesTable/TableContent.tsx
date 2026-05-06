'use client'

import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheItem from './AvalancheItem'

type TableContentProps = {
  avalanches: AvalancheListItem[]
  regionId: RegionId
}

const TableContent = ({ avalanches, regionId }: TableContentProps) => {
  const t = useTranslations()

  return (
    <div className="overflow-y-auto">
      {avalanches.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          {t('admin.recentAvalanches.list.empty')}
        </div>
      ) : (
        <ul className="flex flex-col">
          {avalanches.map((avalanche) => (
            <li key={avalanche.id} className="border-b last:border-0 even:bg-gray-100/60">
              <AvalancheItem avalanche={avalanche} regionId={regionId} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TableContent
