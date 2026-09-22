import type { Avalanche } from '@domain/types'

import type { AvalancheFormSchema } from './schema'

const emptyAspects = { alpine: [], highAlpine: [], subAlpine: [] }

const getInitialFormData = (avalanche: Partial<Avalanche>): AvalancheFormSchema => ({
  aspects: avalanche.aspects ?? emptyAspects,
  date: avalanche.date ? new Date(avalanche.date as string) : null,
  description: avalanche.description ?? '',
  involvement: avalanche.involvement ?? null,
  isDateUnknown: avalanche.isDateUnknown ?? false,
  latitude: avalanche.latitude ?? null,
  location: avalanche.location ?? null,
  longitude: avalanche.longitude ?? null,
  quantity: avalanche.quantity ?? 1,
  size: avalanche.size ?? 1,
  slabDepth: avalanche.slabDepth ?? null,
  trigger: avalanche.trigger ?? '',
  type: avalanche.type ?? '',
  width: avalanche.width ?? null,
})

export default getInitialFormData
