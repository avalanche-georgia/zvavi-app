'use client'

import { useEffect, useRef, useState } from 'react'
import { Sheet } from '@components/ui'
import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import ProblemBody from './ProblemBody'
import ProblemSheetHeader from './ProblemSheetHeader'
import { FieldInfo, InfoSheet, type ProblemField } from '../InfoSheet'

type ProblemSheetProps = {
  // The open problem; null closes the sheet
  index: number | null
  // The property being explained in the stacked info sheet
  infoField: ProblemField | null
  onClose: VoidFunction
  onInfoChange: (field: ProblemField | null) => void
  onNavigate: (index: number) => void
  problems: Problem[]
}

const ProblemSheet = (props: ProblemSheetProps) => {
  const { index, infoField, onClose, onInfoChange, onNavigate, problems } = props
  const t = useTranslations()
  const bodyRef = useRef<HTMLDivElement>(null)
  // Keep the content rendered while the sheet (or the info sheet) animates closed
  const [shownIndex, setShownIndex] = useState(index ?? 0)
  const [shownField, setShownField] = useState<ProblemField>(infoField ?? 'size')

  if (index !== null && index !== shownIndex) setShownIndex(index)
  if (infoField !== null && infoField !== shownField) setShownField(infoField)

  // Each problem starts at the top
  useEffect(() => {
    bodyRef.current?.closest('[data-sheet-body]')?.scrollTo({ top: 0 })
  }, [shownIndex])

  const problem = problems[shownIndex]

  if (!problem) return null

  const title = t(`common.avalancheTypes.${problem.type}`)

  // ←/→ step through the problems. Keys from the stacked info sheet (portaled
  // outside this popup) bubble here through React too — ignore them.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return
    if (event.key === 'ArrowLeft' && shownIndex > 0) onNavigate(shownIndex - 1)
    if (event.key === 'ArrowRight' && shownIndex < problems.length - 1) onNavigate(shownIndex + 1)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  return (
    <Sheet
      header={
        <ProblemSheetHeader
          index={shownIndex}
          onNext={() => onNavigate(shownIndex + 1)}
          onPrevious={() => onNavigate(shownIndex - 1)}
          title={title}
          total={problems.length}
        />
      }
      isOpen={index !== null}
      isTall
      onKeyDown={handleKeyDown}
      onOpenChange={handleOpenChange}
    >
      <div ref={bodyRef}>
        <ProblemBody onInfoOpen={onInfoChange} problem={problem} />
      </div>

      <InfoSheet
        backLabel={title}
        isOpen={infoField !== null && index !== null}
        onBack={() => onInfoChange(null)}
        onCloseAll={onClose}
        title={t(`forecast.sections.avalancheProblems.modal.labels.${shownField}`)}
      >
        <FieldInfo field={shownField} problem={problem} />
      </InfoSheet>
    </Sheet>
  )
}

export default ProblemSheet
