import type { AvalancheListItem } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'

import type { AvalancheSheetMode } from '../AvalancheSheet'

// Catalog: every processed record. Queue: external submissions awaiting review.
export type AvalancheTableVariant = 'catalog' | 'queue'

export type OnAvalancheOpen = (id: number, mode?: AvalancheSheetMode) => void

export type AvalancheRowProps = {
  avalanche: AvalancheListItem
  onOpen: OnAvalancheOpen
  regionId: RegionId
}
