'use client'

import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { SortableItem } from '@components/ui'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'
import { useTranslations } from 'next-intl'
import { useFormState } from 'react-hook-form'

import ProblemCard from './ProblemCard'
import type { ProblemValues } from './problemSchema'

type ProblemListProps = {
  onDelete: (index: number) => void
  onEdit: (key: string) => void
  onReorder: (from: number, to: number) => void
  problems: (ProblemValues & { fieldKey: string })[]
}

// Priority-ordered problems; drag to reorder
const ProblemList = ({ onDelete, onEdit, onReorder, problems }: ProblemListProps) => {
  // Saved problems from before aspects were required can fail the forecast's validation
  const { errors } = useFormState<ForecastFormSchema>({ name: 'avalancheProblems' })
  const t = useTranslations()
  const key = 'admin.forecast.editor.problems.errors'

  const getErrorMessage = (index: number) => {
    const problemErrors = errors.avalancheProblems?.[index]

    if (problemErrors?.type) return t(`${key}.duplicateType`)
    if (problemErrors?.aspects) return t(`${key}.aspects`)

    return undefined
  }

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || !isSortableOperation(event.operation)) return

    const { source, target } = event.operation

    if (source && target) onReorder(source.initialIndex, target.index)
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="flex flex-col gap-3">
        {problems.map(({ fieldKey, ...problem }, index) => (
          <SortableItem
            key={fieldKey}
            // Card radius, so the drop-target ring follows the card's corners
            className="group rounded-[14px]"
            id={fieldKey}
            index={index}
          >
            {(handleRef) => (
              <ProblemCard
                dragHandleRef={handleRef}
                errorMessage={getErrorMessage(index)}
                number={index + 1}
                onDelete={() => onDelete(index)}
                onEdit={() => onEdit(fieldKey)}
                problem={problem}
              />
            )}
          </SortableItem>
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default ProblemList
