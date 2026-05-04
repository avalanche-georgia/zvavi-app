import type { Avalanche } from '@domain/types'

export type DateMode = 'occurred' | 'created'

export type ListFilterParams = {
  createdTo?: string
  dateFrom?: string
  dateTo?: string
  dateMode: DateMode
  page: number
  pageSize: number
}

export type AvalancheListItem = Avalanche & {
  id: number
  createdAt: string
  forecastAvalanche: { forecastId: number }[]
}
