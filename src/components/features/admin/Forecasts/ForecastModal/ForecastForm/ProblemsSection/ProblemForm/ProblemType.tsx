import { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo } from 'react'
import type { AvalancheProblemTypes } from '@domain/types'
import { useTranslations } from 'next-intl'
import Select, { type SingleValue } from 'react-select'

import type { ProblemFormData } from './ProblemForm'
import { InputBlock } from '../../common'
import { useProblemOptions } from '../../common/hooks'

export type ProblemTypeProps = {
  onTypeChange: Dispatch<SetStateAction<ProblemFormData>>
  problemData: ProblemFormData
  selectedProblemTypes: AvalancheProblemTypes[]
}

const ProblemType = ({ onTypeChange, problemData, selectedProblemTypes }: ProblemTypeProps) => {
  const t = useTranslations()
  const { problemTypeOptions } = useProblemOptions()

  const availableOptions = useMemo(() => {
    const selectedTypes = new Set(selectedProblemTypes.filter(Boolean))

    if (problemData.type) {
      selectedTypes.delete(problemData.type)
    }

    return problemTypeOptions.filter((option) => !selectedTypes.has(option.value))
  }, [problemTypeOptions, selectedProblemTypes, problemData.type])

  const handleTypeChange = useCallback(
    (value: SingleValue<{ value: AvalancheProblemTypes; label: string }>) => {
      onTypeChange((prev) => ({
        ...prev,
        type: value?.value as AvalancheProblemTypes,
      }))
    },
    [onTypeChange],
  )

  useEffect(() => {
    if (!problemData.type && availableOptions.length > 0) {
      onTypeChange((prev) => ({
        ...prev,
        type: availableOptions[0].value,
      }))
    }
  }, [problemData.type, availableOptions.length, availableOptions[0]?.value, onTypeChange]) // eslint-disable-line react-hooks/exhaustive-deps

  const problemTypeValue = useMemo(
    () =>
      availableOptions.find((option) => option.value === problemData.type) ?? availableOptions[0],
    [availableOptions, problemData.type],
  )

  return (
    <InputBlock label={t('admin.forecast.form.problems.labels.problemType')} labelClassName="w-32">
      <Select
        className="flex-1"
        onChange={handleTypeChange}
        options={availableOptions}
        value={problemTypeValue}
      />
    </InputBlock>
  )
}

export default ProblemType
