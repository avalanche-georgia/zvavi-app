'use client'

import { useEffect, useRef, useState } from 'react'
import { Sheet } from '@components/ui'
import type { PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import DetailBody from './DetailBody'
import DetailHeader from './DetailHeader'
import LocationSheet from '../location/LocationSheet'

type ObservationDetailSheetProps = {
  // Position within the filtered list; null if the observation isn't in it
  index: number | null
  // Current filtered list — navigation targets and map context
  observations: PublicObservation[]
  observation: PublicObservation | null
  onClose: VoidFunction
  onSelect: (id: number) => void
}

const ObservationDetailSheet = ({
  index,
  observation,
  observations,
  onClose,
  onSelect,
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

  const handleNavigate = (offset: number) => {
    const target = index === null ? undefined : observations[index + offset]

    if (target) onSelect(target.id)
  }

  // ←/→ step through the list. Keys from stacked sheets and the photo viewer
  // (portaled outside this popup) bubble here through React too — ignore them.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return
    if (event.key === 'ArrowLeft') handleNavigate(-1)
    if (event.key === 'ArrowRight') handleNavigate(1)
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
          onNext={() => handleNavigate(1)}
          onPrevious={() => handleNavigate(-1)}
          total={observations.length}
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
        isOpen={isLocationOpen && observation !== null}
        observation={shownObservation}
        observations={observations}
        onClose={() => setIsLocationOpen(false)}
      />
    </Sheet>
  )
}

export default ObservationDetailSheet
