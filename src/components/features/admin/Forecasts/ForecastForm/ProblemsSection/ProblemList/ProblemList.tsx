import { useCallback } from 'react'
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { isSortableOperation } from '@dnd-kit/react/sortable'
import type { AvalancheProblemTypes, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import { ProblemItem } from './ProblemItem'
import SortableItem from './SortableItem'
import type { FormState } from '../../common'
import { ProblemForm, type ProblemFormProps } from '../ProblemForm'

type ProblemsListProps = {
  formState: FormState
  onDelete: (id: string) => void
  onFormClose: ProblemFormProps['onClose']
  onFormOpen: (state: { mode: 'edit'; id: string }) => void
  onFormSave: ProblemFormProps['onSave']
  onReorder: (from: number, to: number) => void
  problems: Problem[]
  selectedProblemTypes: AvalancheProblemTypes[]
}

const ProblemList = ({
  formState,
  onDelete,
  onFormClose,
  onFormOpen,
  onFormSave,
  onReorder,
  problems,
  selectedProblemTypes,
}: ProblemsListProps) => {
  const t = useTranslations()

  const handleEdit = useCallback(
    (id: string) => {
      onFormOpen({ id, mode: 'edit' })
    },
    [onFormOpen],
  )

  const handleDragEnd = useCallback<DragEndEvent>(
    (event) => {
      if (event.canceled) return
      if (!isSortableOperation(event.operation)) return
      const { source, target } = event.operation

      if (!source || !target) return
      onReorder(source.initialIndex, target.index)
    },
    [onReorder],
  )

  if (problems.length === 0 && formState === null) {
    return (
      <p className="text-center text-gray-500">{t('admin.forecast.form.problems.noProblems')}</p>
    )
  }

  const isEditing = formState !== null

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="space-y-4">
        {problems.map((problem, index) => (
          <SortableItem key={problem.id} disabled={isEditing} id={String(problem.id)} index={index}>
            {(handleRef) =>
              formState?.mode === 'edit' && formState.id === problem.id ? (
                <ProblemForm
                  onClose={onFormClose}
                  onSave={onFormSave}
                  problemData={problem}
                  selectedProblemTypes={selectedProblemTypes}
                />
              ) : (
                <ProblemItem
                  canEdit={formState === null}
                  dragHandleRef={handleRef}
                  onDelete={onDelete}
                  onEdit={handleEdit}
                  order={index + 1}
                  problemData={problem}
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
