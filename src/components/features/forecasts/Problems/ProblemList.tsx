'use client'

import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { SortableItem } from '@components/ui'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'
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

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || !isSortableOperation(event.operation)) return

    const { source, target } = event.operation

    if (source && target) onReorder(source.initialIndex, target.index)
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="flex flex-col gap-3">
        {problems.map(({ fieldKey, ...problem }, index) => (
          <SortableItem key={fieldKey} id={fieldKey} index={index}>
            {(handleRef) => (
              <ProblemCard
                dragHandleRef={handleRef}
                hasAspectsError={!!errors.avalancheProblems?.[index]?.aspects}
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
