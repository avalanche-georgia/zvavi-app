import { avalancheProblemTypes } from '@domain/constants'
import type { AvalancheProblemType } from '@domain/types'
import { Select } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ArchiveForecast } from '../model'

type ProblemSelectProps = {
  forecasts: ArchiveForecast[]
  onProblemChange: (problem: AvalancheProblemType | null) => void
  problem: AvalancheProblemType | null
}

const allValue = 'all'

// Only the problems the season has, with how many forecasts name each
const ProblemSelect = ({ forecasts, onProblemChange, problem }: ProblemSelectProps) => {
  const t = useTranslations()

  const countOf = (type: AvalancheProblemType) =>
    forecasts.filter(({ avalancheProblems }) =>
      avalancheProblems.some((avalancheProblem) => avalancheProblem.type === type),
    ).length

  const problemOptions = (Object.keys(avalancheProblemTypes) as AvalancheProblemType[])
    .map((type) => ({ count: countOf(type), type }))
    .filter(({ count }) => count > 0)
    .map(({ count, type }) => ({
      label: t('forecast.history.filters.problemOption', {
        count,
        problem: t(`common.avalancheTypes.${type}`),
      }),
      value: type,
    }))

  const options = [
    { label: t('forecast.history.filters.allProblems'), value: allValue },
    ...problemOptions,
  ]

  const handleValueChange = (value: string) =>
    onProblemChange(value === allValue ? null : (value as AvalancheProblemType))

  return (
    <Select
      ariaLabel={t('forecast.history.filters.problem')}
      className="w-auto max-w-65 min-w-0 flex-1 sm:flex-none"
      isActive={problem !== null}
      onValueChange={handleValueChange}
      options={options}
      size="sm"
      value={problem ?? allValue}
    />
  )
}

export default ProblemSelect
