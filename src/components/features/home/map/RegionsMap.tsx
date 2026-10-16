'use client'

import { Loading } from '@components/shared'
import dynamic from 'next/dynamic'

import type { RegionsMapProps } from './RegionsMapClient'

// Client-only: Leaflet needs the window, and a sized container to measure
const RegionsMapClient = dynamic(() => import('./RegionsMapClient'), {
  loading: () => <Loading className="absolute inset-0 h-full py-0" />,
  ssr: false,
})

// The card around the map; sets its height (the map fills it)
const RegionsMap = ({ highlightedId, onHover, regions }: RegionsMapProps) => (
  <div className="rounded-card border-rule bg-map relative isolate h-95 overflow-hidden border lg:h-auto lg:min-h-135">
    <RegionsMapClient highlightedId={highlightedId} onHover={onHover} regions={regions} />
  </div>
)

export default RegionsMap
