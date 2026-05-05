import type { RegionId } from '@domain/types'

const regionsKeys = {
  all: ['regionsKeys'] as const,
  item: (regionId: RegionId) => [...regionsKeys.all, 'item', regionId] as const,
  list: () => [...regionsKeys.all, 'list'] as const,
}

export default regionsKeys
