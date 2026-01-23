import { useCallback, useMemo, useState } from 'react'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import { avalancheProblemTypes } from '@domain/constants'
import type { Problem } from '@domain/types'
import _uniqueId from 'lodash/uniqueId'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'

import prepareTimeOfDay from './prepareTimeOfDay'
import { ProblemForm } from './ProblemForm'
import { ProblemList } from './ProblemList'
import type { FormState } from '../common'
import { initialProblemData } from '../constants'
import type { ForecastFormSchema } from '../schema'

const ProblemsSection = () => {
  const tForecast = useTranslations('admin.forecast')

  const { control } = useFormContext<ForecastFormSchema>()
  const { append, fields, remove, update } = useFieldArray({
    control,
    name: 'avalancheProblems',
  })

  const [formState, setFormState] = useState<FormState>(null)

  const selectedProblemTypes = useMemo(() => fields.map((problem) => problem.type), [fields])

  const handleCreateFormOpen = useCallback(() => {
    setFormState({ mode: 'create' })
  }, [])

  const handleFormClose = useCallback(() => {
    setFormState(null)
  }, [])

  const handleSubmit = useCallback(
    (data: Problem) => {
      const preparedProblem = {
        ...data,
        id: data.id ? String(data.id) : _uniqueId('problem-'),
        timeOfDay: prepareTimeOfDay(data.timeOfDay),
      }

      const existingIndex = fields.findIndex((problem) => problem.id === String(data.id))

      if (existingIndex !== -1) {
        update(existingIndex, preparedProblem)
      } else {
        append(preparedProblem)
      }

      handleFormClose()
    },
    [append, fields, handleFormClose, update],
  )

  const handleDelete = (id: string) => {
    const index = fields.findIndex((problem) => problem.id === id)

    if (index !== -1) {
      remove(index)
    }
  }

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
        onDelete={handleDelete}
        onFormClose={handleFormClose}
        onFormOpen={setFormState}
        onFormSave={handleSubmit}
        problems={fields}
        selectedProblemTypes={selectedProblemTypes}
      />
    </section>
  )
}

export default ProblemsSection
