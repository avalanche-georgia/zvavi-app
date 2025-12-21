import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { Icon } from '@components/shared'
import { Button } from '@components/ui'
import { avalancheProblemTypes } from '@domain/constants'
import type { Problem } from '@domain/types'
import _uniqueId from 'lodash/uniqueId'
import { useTranslations } from 'next-intl'

import prepareTimeOfDay from './prepareTimeOfDay'
import { ProblemForm } from './ProblemForm'
import { ProblemList } from './ProblemList'
import type { FormState } from '../common'
import { initialProblemData } from '../constants'

type ProblemsSectionProps = {
  problems: Problem[]
  setProblems: Dispatch<SetStateAction<Problem[]>>
}

const ProblemsSection = ({ problems, setProblems }: ProblemsSectionProps) => {
  const tForecast = useTranslations('admin.forecast')
  const [formState, setFormState] = useState<FormState>(null)
  const selectedProblemTypes = useMemo(() => problems.map((problem) => problem.type), [problems])

  const handleCreateFormOpen = useCallback(() => {
    setFormState({ mode: 'create' })
  }, [])

  const handleFormClose = useCallback(() => {
    setFormState(null)
  }, [])

  const handleSubmit = useCallback(
    (data: Problem) => {
      const preparedProblem: Problem = {
        id: data.id || _uniqueId('problem-'),
        ...data,
        timeOfDay: prepareTimeOfDay(data.timeOfDay),
      }

      setProblems((prev) => {
        const isProblemExists = prev.some((problem) => problem.id === data.id)

        if (isProblemExists) {
          return prev.map((problem) => (problem.id === data.id ? preparedProblem : problem))
        }

        return [...prev, preparedProblem]
      })

      handleFormClose()
    },
    [handleFormClose, setProblems],
  )

  const canAddProblem =
    formState === null && selectedProblemTypes.length < Object.keys(avalancheProblemTypes).length

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{tForecast('form.problems.title')}</h3>

        <Button className="ml-auto" disabled={!canAddProblem} onClick={handleCreateFormOpen}>
          <Icon icon="plus" size="sm" />
          {tForecast('form.problems.labels.addProblem')}
        </Button>
      </div>

      {formState?.mode === 'create' && (
        <ProblemForm
          onClose={handleFormClose}
          onSave={handleSubmit}
          problemData={initialProblemData}
          selectedProblemTypes={selectedProblemTypes}
        />
      )}

      <ProblemList
        formState={formState}
        onDelete={setProblems}
        onFormClose={handleFormClose}
        onFormOpen={setFormState}
        onFormSave={handleSubmit}
        problems={problems}
        selectedProblemTypes={selectedProblemTypes}
      />
    </section>
  )
}

export default ProblemsSection
