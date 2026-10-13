'use client'

import { useEffect, useRef, useState } from 'react'
import { Sheet } from '@components/ui'
import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import ProblemBody from './ProblemBody'
import ProblemSheetHeader from './ProblemSheetHeader'
import { FieldInfo, InfoSheet, type ProblemField } from '../InfoSheet'
import { getProblemKey } from '../model/problemKey'

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
  // Keep the content rendered while the sheet (or the info sheet) animates
  // closed — including a problem that has just left the forecast
  const [shown, setShown] = useState({ index: index ?? 0, problem: problems[index ?? 0] })
  const [shownField, setShownField] = useState<ProblemField>(infoField ?? 'size')

  if (index !== null && problems[index]) {
    const isChanged = problems[index] !== shown.problem || index !== shown.index

    if (isChanged) setShown({ index, problem: problems[index] })
  }

  if (infoField !== null && infoField !== shownField) setShownField(infoField)

  const { index: shownIndex, problem } = shown
  const shownKey = problem && getProblemKey(problem)

  // Each problem starts at the top
  useEffect(() => {
    bodyRef.current?.closest('[data-sheet-body]')?.scrollTo({ top: 0 })
  }, [shownKey])

  if (!problem) return null

  const title = t(`common.avalancheTypes.${problem.type}`)

  const handleNavigate = (offset: number) => {
    const nextIndex = shownIndex + offset

    if (nextIndex >= 0 && nextIndex < problems.length) onNavigate(nextIndex)
  }

  // ←/→ step through the problems. Keys from the stacked info sheet (portaled
  // outside this popup) bubble here through React too — ignore them, and leave
  // browser shortcuts (Alt+←, Cmd+←) alone.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.target as Node)) return
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowLeft') handleNavigate(-1)
    if (event.key === 'ArrowRight') handleNavigate(1)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  return (
    <Sheet
      header={
        <ProblemSheetHeader
          index={shownIndex}
          onNext={() => handleNavigate(1)}
          onPrevious={() => handleNavigate(-1)}
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
