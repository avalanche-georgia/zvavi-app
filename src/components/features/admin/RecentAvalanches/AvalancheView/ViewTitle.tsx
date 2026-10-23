import { formatAvalancheId, SizeTile } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import { SourceBadge, StatusBadge } from '../shared'

const ViewTitle = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const { id, size, source = 'team', status = 'published', type } = avalanche

  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-1">
      <SizeTile className="size-14" size={size} />
      <div className="flex min-w-0 flex-col gap-1.5">
        <h2 className="text-title-sm m-0 font-bold">{t(`common.avalancheTypes.${type}`)}</h2>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-muted text-caption font-mono">{formatAvalancheId(id)}</span>
          <StatusBadge status={status} />
          <SourceBadge source={source} />
        </div>
      </div>
    </div>
  )
}

export default ViewTitle
