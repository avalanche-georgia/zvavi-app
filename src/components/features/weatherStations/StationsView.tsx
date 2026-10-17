'use client'

import { useRef, useState } from 'react'
import { desktopMediaQuery } from '@components/features/observations/map/mapConfig'
import { SplitPageWrapper } from '@components/layout'
import type { WeatherStation } from '@domain/types'
import { useMediaQuery, useResizeObserver } from 'usehooks-ts'

import StationsMap from './map/StationsMap'
import StationsHeader, { type StationsViewMode } from './StationsHeader'
import StationsList from './StationsList'

type StationsViewProps = {
  locale: string
  stations: WeatherStation[]
}

// List next to the map on desktop; on mobile one at a time, switched in the header
const StationsView = ({ locale, stations }: StationsViewProps) => {
  const [view, setView] = useState<StationsViewMode>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  // Matches the server render (no media queries there) on the first pass
  const isDesktop = useMediaQuery(desktopMediaQuery, { initializeWithValue: false })
  // Mobile map view fills the screen under the header
  const headerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
  const { height: headerHeight = 0 } = useResizeObserver({ box: 'border-box', ref: headerRef })

  const isMapView = view === 'map' && !isDesktop

  // On mobile the list hides the map, so a row switches to the map first. A tap
  // also fires mouseenter, and the unmounted row never fires mouseleave — drop it.
  const handleRowSelect = (id: string) => {
    setSelectedId(id)
    if (isDesktop) return

    setHoveredId(null)
    setView('map')
  }

  return (
    <SplitPageWrapper
      aside={
        // Mounted only when visible — Leaflet can't fit into a hidden, zero-size container
        (isDesktop || isMapView) && (
          <StationsMap
            hoveredId={hoveredId}
            locale={locale}
            onSelect={setSelectedId}
            selectedId={selectedId}
            stations={stations}
          />
        )
      }
      isAsideShownOnMobile={isMapView}
      mobileAsideOffset={headerHeight}
    >
      <StationsHeader ref={headerRef} onViewChange={setView} view={view} />
      {!isMapView && (
        <StationsList
          locale={locale}
          onHover={setHoveredId}
          onSelect={handleRowSelect}
          selectedId={selectedId}
          stations={stations}
        />
      )}
    </SplitPageWrapper>
  )
}

export default StationsView
