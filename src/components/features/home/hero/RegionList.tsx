'use client'

import { useTranslations } from 'next-intl'

import RegionListRow from './RegionListRow'
import type { HeroRegion } from '../types'

type RegionListProps = {
  highlightedId: HeroRegion['id'] | null
  onHover: (regionId: HeroRegion['id'] | null) => void
  regions: HeroRegion[]
}

// One row per region, in the regions' display order
const RegionList = ({ highlightedId, onHover, regions }: RegionListProps) => {
  const t = useTranslations()

  return (
    <ul
      aria-label={t('home.regions.listLabel')}
      className="rounded-card border-rule bg-surface divide-rule divide-y overflow-hidden border"
    >
      {regions.map((region) => (
        <li key={region.id}>
          <RegionListRow
            isHighlighted={region.id === highlightedId}
            onHover={onHover}
            region={region}
          />
        </li>
      ))}
    </ul>
  )
}

export default RegionList
