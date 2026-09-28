'use client'

import { SortableItem } from '@components/ui'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'

import ProblemCard from './ProblemCard'
import ProblemEditor from './ProblemEditor'
import type { ProblemValues } from './problemSchema'
import type { ProblemEditing } from './useProblemsSection'

type ProblemListProps = {
  editing: ProblemEditing
  onCancel: VoidFunction
  onDelete: (index: number) => void
  onDone: (problem: ProblemValues) => void
  onEdit: (key: string) => void
  onReorder: (from: number, to: number) => void
  problems: (ProblemValues & { fieldKey: string })[]
}

// Priority-ordered problems; drag to reorder (off while an editor is open)
const ProblemList = ({
  editing,
  onCancel,
  onDelete,
  onDone,
  onEdit,
  onReorder,
  problems,
}: ProblemListProps) => {
  const isEditing = editing !== null

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled || !isSortableOperation(event.operation)) return

    const { source, target } = event.operation

    if (source && target) onReorder(source.initialIndex, target.index)
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="flex flex-col gap-3">
        {problems.map(({ fieldKey, ...problem }, index) => (
          <SortableItem key={fieldKey} disabled={isEditing} id={fieldKey} index={index}>
            {(handleRef) =>
              editing?.key === fieldKey ? (
                <ProblemEditor
                  initialDraft={problem}
                  isNew={false}
                  number={index + 1}
                  onCancel={onCancel}
                  onDone={onDone}
                />
              ) : (
                <ProblemCard
                  dragHandleRef={isEditing ? null : handleRef}
                  number={index + 1}
                  onDelete={() => onDelete(index)}
                  onEdit={() => onEdit(fieldKey)}
                  problem={problem}
                />
              )
            }
          </SortableItem>
        ))}
      </ul>
    </DragDropProvider>
  )
}

export default ProblemList
