import type { Avalanche, AvalancheSource, AvalancheStatus } from '@domain/types'

export type DateMode = 'occurred' | 'created'

export type ListFilterParams = {
  dateFrom?: string
  dateMode: DateMode
  dateTo?: string
  // Catalog hides records still awaiting moderation
  excludeStatus?: AvalancheStatus
  // Moderation queue shows the longest-waiting submissions first
  isOldestFirst?: boolean
  page: number
  pageSize: number
  source?: AvalancheSource
  status?: AvalancheStatus
}

export type AvalancheListItem = Avalanche & {
  id: number
  createdAt: string
  forecastAvalanche: { forecastId: number }[]
}
