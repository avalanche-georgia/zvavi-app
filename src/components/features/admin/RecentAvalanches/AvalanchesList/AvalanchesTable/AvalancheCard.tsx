import { SizeTile } from '@components/features/observations'
import type { AvalancheListItem } from '@data/hooks/recentAvalanches'

import { useAvalanchesTable } from './AvalanchesTableContext'
import { StatusBadge } from '../../shared'
import AvalancheCell from '../AvalancheCell'
import RowActions from '../RowActions'
import SubmitterCell from '../SubmitterCell'
import type { AvalanchesListVariant } from '../types'
import useOccurredLabel from '../useOccurredLabel'

type AvalancheCardProps = {
  avalanche: AvalancheListItem
  variant: AvalanchesListVariant
}

// ≤640px: size tile spanning two rows | avalanche + status | "date · submitter" + ⋯
const AvalancheCard = ({ avalanche, variant }: AvalancheCardProps) => {
  const { onAvalancheOpen, regionId } = useAvalanchesTable()
  const getOccurredLabel = useOccurredLabel()

  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
      <SizeTile className="row-span-2" isCompact size={avalanche.size} />
      <AvalancheCell avalanche={avalanche} onOpen={onAvalancheOpen} />
      {/* The queue holds pending records only — the status would say nothing */}
      {variant === 'catalog' ? <StatusBadge status={avalanche.status ?? 'published'} /> : <span />}
      <div className="text-caption text-muted flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 tabular-nums">{getOccurredLabel(avalanche)}</span>
        <span aria-hidden>·</span>
        <SubmitterCell avalanche={avalanche} />
      </div>
      <RowActions avalanche={avalanche} isCompact onOpen={onAvalancheOpen} regionId={regionId} />
    </div>
  )
}

export default AvalancheCard
