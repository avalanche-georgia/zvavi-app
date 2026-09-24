import { SizeTile } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import { useTranslations } from 'next-intl'

import SourceBadge from '../RecentAvalanchesTable/SourceBadge'
import StatusBadge from '../RecentAvalanchesTable/StatusBadge'

const ViewTitle = ({ avalanche }: { avalanche: AvalancheListItem }) => {
  const t = useTranslations()
  const { size, source = 'team', status = 'published', type } = avalanche

  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-1">
      <SizeTile className="size-14" size={size} />
      <div className="flex min-w-0 flex-col gap-1.5">
        <h2 className="m-0 text-[21px] leading-[1.15] font-bold tracking-[-.02em]">
          {t(`common.avalancheTypes.${type}`)}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <StatusBadge status={status} />
          <SourceBadge source={source} />
        </div>
      </div>
    </div>
  )
}

export default ViewTitle
