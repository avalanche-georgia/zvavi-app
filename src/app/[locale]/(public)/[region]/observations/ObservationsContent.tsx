'use client'

import { useState } from 'react'
import { ObservationDetailSheet } from '@components/features/observations'
import { desktopMediaQuery } from '@components/features/observations/map/mapConfig'
import { SplitPageWrapper } from '@components/layout'
import useListHover from '@components/shared/map/useListHover'
import { useRegionContext } from '@domain/context/RegionContext'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from 'usehooks-ts'

import getMapFocus from './helpers/getMapFocus'
import useMobileMapOffset from './hooks/useMobileMapOffset'
import useObservationLookup from './hooks/useObservationLookup'
import useObservationsPage from './hooks/useObservationsPage'

import ObservationsListPane from './list/ObservationsListPane'
import ObservationsMap from './map/ObservationsMap'
import ObservationsHeader from './ObservationsHeader'
import ReportButton from './ReportButton'
import ObservationsToolbar, { type ListMapView } from './toolbar/ObservationsToolbar'

const ObservationsContent = () => {
  const t = useTranslations()
  const region = useRegionContext().region!
  const page = useObservationsPage(region.id)
  const { list, params, points, selectedObservation, setParams } = page

  const [view, setView] = useState<ListMapView>('list')
  const [peekId, setPeekId] = useState<number | null>(null)
  // Matches the server render (no media queries there) on the first pass
  const isDesktop = useMediaQuery(desktopMediaQuery, { initializeWithValue: false })
  const { headingRef, mobileMapOffset, toolbarRef } = useMobileMapOffset()
  const { observation: peekObservation } = useObservationLookup({
    id: peekId,
    isListReady: !list.isPending,
    observations: list.observations,
    regionId: region.id,
  })

  const isMapView = view === 'map' && !isDesktop
  const mapFocus = getMapFocus(isDesktop, selectedObservation)
  const [hoveredId, setHoveredId] = useListHover<number>(!isMapView)

  const handleOpen = (id: number) => setParams({ selectedId: id })
  const handleClose = () => setParams({ selectedId: null })

  // Desktop opens the detail right away; mobile previews the card first
  const handleMarkerClick = (id: number) => (isDesktop ? handleOpen(id) : setPeekId(id))

  const handleViewChange = (nextView: ListMapView) => {
    setView(nextView)
    setPeekId(null)
  }

  return (
    <SplitPageWrapper
      aside={
        // Mounted only when visible: Leaflet can't fit the region into a hidden container
        (isDesktop || isMapView) && (
          <ObservationsMap
            dateBasis={params.dateBasis}
            focus={mapFocus}
            hoveredId={hoveredId}
            onMapClick={() => setPeekId(null)}
            onMarkerClick={handleMarkerClick}
            onOpen={handleOpen}
            peekObservation={peekObservation}
            points={points}
            region={region}
            selectedId={selectedObservation?.id ?? peekId}
          />
        )
      }
      isAsideShownOnMobile={isMapView}
      mobileAsideOffset={mobileMapOffset}
    >
      <ObservationsHeader
        ref={headingRef}
        regionName={t(`regions.names.${region.id}`)}
        total={page.regionTotal}
        visibleCount={page.visibleCount}
      />
      <ObservationsToolbar
        ref={toolbarRef}
        filters={params}
        onFiltersChange={setParams}
        onViewChange={handleViewChange}
        view={view}
      />
      {!isMapView && (
        <ObservationsListPane
          dateBasis={params.dateBasis}
          list={list}
          onHover={setHoveredId}
          onOpen={handleOpen}
          selectedId={selectedObservation?.id ?? null}
          sort={params.sort}
        />
      )}
      {!isMapView && <ReportButton regionId={region.id} />}

      <ObservationDetailSheet
        contextPoints={points}
        index={page.selectedIndex}
        observation={selectedObservation}
        onClose={handleClose}
        onNavigate={page.onNavigate}
        total={page.total}
      />
    </SplitPageWrapper>
  )
}

export default ObservationsContent
