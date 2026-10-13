'use client'

import { useState } from 'react'
import { LocationSheet } from '@components/features/observations'
import { Sheet } from '@components/ui'
import type { PublicAvalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import AvalancheBody from './AvalancheBody'
import { emptyAspects } from '../model/aspects'
import StepSheetHeader from '../sheets/StepSheetHeader'
import useStepSheet from '../sheets/useStepSheet'

type AvalancheSheetProps = {
  avalanches: PublicAvalanche[]
  // The open record; null closes the sheet
  index: number | null
  onClose: VoidFunction
  onNavigate: (index: number) => void
}

const getAvalancheKey = (avalanche: PublicAvalanche) => String(avalanche.id)

// A forecast's linked avalanche record in a sheet, with its map stacked on top
const AvalancheSheet = ({ avalanches, index, onClose, onNavigate }: AvalancheSheetProps) => {
  const t = useTranslations()
  const {
    bodyRef,
    handleKeyDown,
    shownIndex,
    shownItem: avalanche,
    step,
  } = useStepSheet({ getKey: getAvalancheKey, index, items: avalanches, onNavigate })
  const [mapRecordId, setMapRecordId] = useState<number | null>(null)

  if (!avalanche) return null

  // The map belongs to one record — stepping to another (or closing) drops it
  const isMapOpen = index !== null && mapRecordId === avalanche.id

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) return

    // Reopening a record starts on its detail, never on a leftover map
    setMapRecordId(null)
    onClose()
  }

  return (
    <Sheet
      header={
        <StepSheetHeader
          index={shownIndex}
          nextLabel={t('observations.detail.next')}
          onNext={() => step(1)}
          onPrevious={() => step(-1)}
          positionLabel={t('observations.detail.position', {
            current: shownIndex + 1,
            total: avalanches.length,
          })}
          previousLabel={t('observations.detail.previous')}
          title={t(`common.avalancheTypes.${avalanche.type}`)}
          total={avalanches.length}
        />
      }
      isOpen={index !== null}
      isTall
      onKeyDown={handleKeyDown}
      onOpenChange={handleOpenChange}
    >
      <div ref={bodyRef}>
        <AvalancheBody avalanche={avalanche} onShowOnMap={() => setMapRecordId(avalanche.id)} />
      </div>

      <LocationSheet
        contextPoints={[]}
        isOpen={isMapOpen}
        observation={{ ...avalanche, aspects: avalanche.aspects ?? emptyAspects }}
        onClose={() => setMapRecordId(null)}
      />
    </Sheet>
  )
}

export default AvalancheSheet
