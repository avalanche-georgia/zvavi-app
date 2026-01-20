import { useCallback } from 'react'
import type { AvalancheProblemTypes, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import { ProblemItem } from './ProblemItem'
import type { FormState } from '../../common'
import { ProblemForm, type ProblemFormProps } from '../ProblemForm'

type ProblemsListProps = {
  formState: FormState
  onDelete: (id: string) => void
  onFormClose: ProblemFormProps['onClose']
  onFormOpen: (state: { mode: 'edit'; id: string }) => void
  onFormSave: ProblemFormProps['onSave']
  problems: Problem[]
  selectedProblemTypes: AvalancheProblemTypes[]
}

const ProblemList = ({
  formState,
  onDelete,
  onFormClose,
  onFormOpen,
  onFormSave,
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

  if (problems.length === 0 && formState === null) {
    return (
      <p className="text-center text-gray-500">{t('admin.forecast.form.problems.noProblems')}</p>
    )
  }

  return (
    <ul className="space-y-4">
      {problems.map((problem) => (
        <li key={problem.id}>
          {formState?.mode === 'edit' && formState.id === problem.id ? (
            <ProblemForm
              onClose={onFormClose}
              onSave={onFormSave}
              problemData={problem}
              selectedProblemTypes={selectedProblemTypes}
            />
          ) : (
            <ProblemItem
              canEdit={formState === null}
              onDelete={onDelete}
              onEdit={handleEdit}
              problemData={problem}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProblemList
