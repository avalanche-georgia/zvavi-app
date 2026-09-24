'use client'

import { useEffect, useRef, useState } from 'react'
import { LocationSheet } from '@components/features/observations'
import { Sheet } from '@components/ui'
import type { ObservationPoint, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import DetailBody from './DetailBody'
import DetailHeader from './DetailHeader'

type ObservationDetailSheetProps = {
  // Filtered set, for the location map's context dots
  contextPoints: ObservationPoint[]
  // Position within the filtered list; null if the observation isn't in it
  index: number | null
  observation: PublicObservation | null
  onClose: VoidFunction
  // Step by ±1 through the filtered list (loads the next page when needed)
  onNavigate: (offset: number) => void
  // Size of the filtered list, loaded or not
  total: number
}

const ObservationDetailSheet = ({
  contextPoints,
  index,
  observation,
  onClose,
  onNavigate,
  total,
}: ObservationDetailSheetProps) => {
  const t = useTranslations()
  const bodyRef = useRef<HTMLDivElement>(null)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  // Keeps the content rendered while the sheet animates closed
  const [shownObservation, setShownObservation] = useState(observation)

  if (observation && observation !== shownObservation) {
    setShownObservation(observation)
    // A new observation always opens on its detail, never on a leftover map
    if (observation.id !== shownObservation?.id) setIsLocationOpen(false)
  }

  const shownId = shownObservation?.id

  // Each observation starts at the top
  useEffect(() => {
    bodyRef.current?.closest('[data-sheet-body]')?.scrollTo({ top: 0 })
  }, [shownId])

  // ←/→ step through the list. Keys from stacked sheets and the photo viewer
  // (portaled outside this popup) bubble here through React too — ignore them.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return
    if (index === null) return
    if (event.key === 'ArrowLeft' && index > 0) onNavigate(-1)
    if (event.key === 'ArrowRight' && index < total - 1) onNavigate(1)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  if (!shownObservation) return null

  return (
    <Sheet
      header={
        <DetailHeader
          index={index}
          onNext={() => onNavigate(1)}
          onPrevious={() => onNavigate(-1)}
          total={total}
          typeLabel={t(`common.avalancheTypes.${shownObservation.type}`)}
        />
      }
      isOpen={observation !== null}
      isTall
      onKeyDown={handleKeyDown}
      onOpenChange={handleOpenChange}
    >
      <div ref={bodyRef}>
        <DetailBody observation={shownObservation} onShowOnMap={() => setIsLocationOpen(true)} />
      </div>

      <LocationSheet
        contextPoints={contextPoints}
        isOpen={isLocationOpen && observation !== null}
        observation={shownObservation}
        onClose={() => setIsLocationOpen(false)}
      />
    </Sheet>
  )
}

export default ObservationDetailSheet
