'use client'

import { useState } from 'react'
import type { ObservationPoint, PublicObservation } from '@domain/types'
import { Sheet, type SheetSteps } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import DetailBody from './DetailBody'
import DetailHeader from './DetailHeader'
import LocationSheet from '../location/LocationSheet'

type ObservationDetailSheetProps = {
  // Other observations, shown as context dots on the location map
  contextPoints: ObservationPoint[]
  // Position within the list being stepped through; null if the observation isn't in it
  index: number | null
  observation: PublicObservation | null
  onClose: VoidFunction
  // Step by ±1 through the list
  onNavigate: (offset: number) => void
  // Size of the whole list, loaded or not
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
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  // Keeps the content rendered while the sheet animates closed
  const [shownObservation, setShownObservation] = useState(observation)

  if (observation && observation !== shownObservation) {
    setShownObservation(observation)
    // A new observation always opens on its detail, never on a leftover map
    if (observation.id !== shownObservation?.id) setIsLocationOpen(false)
  }

  const steps: SheetSteps = {
    hasNext: index !== null && index < total - 1,
    hasPrevious: index !== null && index > 0,
    onNext: () => onNavigate(1),
    onPrevious: () => onNavigate(-1),
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
          steps={steps}
          total={total}
          typeLabel={t(`common.avalancheTypes.${shownObservation.type}`)}
        />
      }
      isOpen={observation !== null}
      isTall
      onOpenChange={handleOpenChange}
      // Each observation starts at the top
      scrollKey={shownObservation.id}
      steps={steps}
    >
      <DetailBody observation={shownObservation} onShowOnMap={() => setIsLocationOpen(true)} />

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
