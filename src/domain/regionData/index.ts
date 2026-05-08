import type { RegionId } from '@domain/types'

import { gudauriGeoData } from './gudauri'
import type { RegionGeoData } from './types'

export type { RegionGeoData } from './types'

export const regionGeoData: Record<RegionId, RegionGeoData> = {
  gudauri: gudauriGeoData,
}
