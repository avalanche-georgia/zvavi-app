'use client'

import { useState } from 'react'

import DangerLegend from './DangerLegend'
import OffSeasonNote from './OffSeasonNote'
import RegionList from './RegionList'
import RegionsMap from '../map/RegionsMap'
import type { HeroRegion } from '../types'

type HomeHeroProps = {
  // Date, title and lede (rendered on the server)
  intro: React.ReactNode
  regions: HeroRegion[]
}

// Today's danger per region next to the map of their zones; choosing one opens its
// home. Hovering a list row highlights its zone and the other way round.
const HomeHero = ({ intro, regions }: HomeHeroProps) => {
  const [highlightedId, setHighlightedId] = useState<HeroRegion['id'] | null>(null)
  const isOffSeason = regions.length > 0 && regions.every(({ state }) => state === 'offSeason')

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-stretch">
      <div className="flex min-w-0 flex-col">
        {intro}
        {isOffSeason && <OffSeasonNote />}
        <RegionList highlightedId={highlightedId} onHover={setHighlightedId} regions={regions} />
        <DangerLegend />
      </div>
      <RegionsMap highlightedId={highlightedId} onHover={setHighlightedId} regions={regions} />
    </div>
  )
}

export default HomeHero
