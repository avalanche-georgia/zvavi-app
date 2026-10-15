import { backgroundColorByHazardLevel } from '@components/constants'
import { hazardTextClass } from '@components/features/forecast/model/hazard'
import type { HazardLevelScale } from '@domain/types'

import { cn } from '@/lib/utils'

// The 38px danger dot drawn inside a Leaflet divIcon (an HTML string, so classes only)
// Highlight adds scale-120 in place (see RegionShape)
export const markerClasses = (level: HazardLevelScale | null) =>
  cn(
    'grid size-9.5 cursor-pointer place-items-center rounded-full border-3 border-white text-copy-lg font-bold shadow-pin transition-transform duration-150',
    level ? [backgroundColorByHazardLevel[level], hazardTextClass(level)] : 'bg-hazard-0 text-ink',
  )
