'use client'

import { useState } from 'react'
import type { Problem, RegionId } from '@domain/types'
import { Sheet } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import ProblemBody from './ProblemBody'
import { FieldInfo, InfoSheet, type ProblemField } from '../InfoSheet'
import { getProblemKey } from '../model/problemKey'
import StepSheetHeader from '../sheets/StepSheetHeader'
import useStepSheet from '../sheets/useStepSheet'

type ProblemSheetProps = {
  // The open problem; null closes the sheet
  index: number | null
  // The property being explained in the stacked info sheet
  infoField: ProblemField | null
  onClose: VoidFunction
  onInfoChange: (field: ProblemField | null) => void
  onNavigate: (index: number) => void
  problems: Problem[]
  regionId: RegionId
}

const ProblemSheet = (props: ProblemSheetProps) => {
  const { index, infoField, onClose, onInfoChange, onNavigate, problems, regionId } = props
  const t = useTranslations()
  const {
    scrollKey,
    shownIndex,
    shownItem: problem,
    steps,
  } = useStepSheet({ getKey: getProblemKey, index, items: problems, onNavigate })
  // Keeps the explanation rendered while its sheet animates closed
  const [shownField, setShownField] = useState<ProblemField>(infoField ?? 'size')

  if (infoField !== null && infoField !== shownField) setShownField(infoField)

  if (!problem) return null

  const title = t(`common.avalancheTypes.${problem.type}`)

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose()
  }

  return (
    <Sheet
      header={
        <StepSheetHeader
          nextLabel={t('forecast.page.nextProblem')}
          positionLabel={t('forecast.page.problemPosition', {
            current: shownIndex + 1,
            total: problems.length,
          })}
          previousLabel={t('forecast.page.previousProblem')}
          steps={steps}
          title={title}
        />
      }
      isOpen={index !== null}
      isTall
      onOpenChange={handleOpenChange}
      scrollKey={scrollKey}
      steps={steps}
    >
      <ProblemBody onInfoOpen={onInfoChange} problem={problem} />

      <InfoSheet
        backLabel={title}
        isOpen={infoField !== null && index !== null}
        onClose={() => onInfoChange(null)}
        title={t(`forecast.sections.avalancheProblems.modal.labels.${shownField}`)}
      >
        <FieldInfo field={shownField} problem={problem} regionId={regionId} />
      </InfoSheet>
    </Sheet>
  )
}

export default ProblemSheet
