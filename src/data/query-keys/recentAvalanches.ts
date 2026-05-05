import type { ListFilterParams } from '@data/hooks/recentAvalanches/types'

const recentAvalanchesKeys = {
  all: ['recentAvalanchesKeys'] as const,

  item: (id: number) => [...recentAvalanchesKeys.all, 'item', id] as const,
  list: (params: ListFilterParams) => [...recentAvalanchesKeys.all, 'list', params] as const,
}

export default recentAvalanchesKeys
