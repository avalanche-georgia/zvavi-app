import type { Avalanche, AvalancheSource, AvalancheStatus } from '@domain/types'

export type DateMode = 'occurred' | 'created'

export type ListFilterParams = {
  dateFrom?: string
  dateMode: DateMode
  dateTo?: string
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
