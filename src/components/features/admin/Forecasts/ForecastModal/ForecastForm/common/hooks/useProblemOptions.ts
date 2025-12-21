import {
  avalancheProblemTypes,
  confidenceLevels,
  distributionTypes,
  sensitivityLevelsSorted,
  trends,
} from '@domain/constants'
import type { AvalancheProblemTypes } from '@domain/types'
import _range from 'lodash/range'
import { useTranslations } from 'next-intl'

import { generateOptions } from '../helpers'

const useProblemOptions = () => {
  const tProblems = useTranslations('admin.forecast.form.problems')

  const problemTypeOptions = generateOptions(
    Object.values(avalancheProblemTypes),
    'options.problemType',
    tProblems,
  ) as { label: string; value: AvalancheProblemTypes }[]

  const avalancheSizeOptions = _range(1, 6).map((level) => ({ label: level, value: level }))
  const sensitivityOptions = generateOptions(
    sensitivityLevelsSorted,
    'options.sensitivityLevel',
    tProblems,
  )
  const distributionOptions = generateOptions(
    Object.values(distributionTypes),
    'options.distribution',
    tProblems,
  )

  const trendOptions = generateOptions(Object.values(trends), 'options.trend', tProblems)
  const confidenceOptions = generateOptions(
    Object.values(confidenceLevels),
    'options.confidence',
    tProblems,
  )
  const hazardLevelOptions = _range(1, 6).map((level) => ({ label: level, value: String(level) }))

  return {
    avalancheSizeOptions,
    confidenceOptions,
    distributionOptions,
    hazardLevelOptions,
    problemTypeOptions,
    sensitivityOptions,
    trendOptions,
  }
}

export default useProblemOptions
