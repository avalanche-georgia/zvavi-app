import type { AvalancheSheetMode } from '../AvalancheSheet'

// Catalog: every processed record. Queue: external submissions awaiting review.
export type AvalanchesListVariant = 'catalog' | 'queue'

export type OnAvalancheOpen = (id: number, mode?: AvalancheSheetMode) => void
