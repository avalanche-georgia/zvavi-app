import {
  avalancheProblemTypes,
  confidenceLevels,
  distributionTypes,
  sensitivityLevelsSorted,
  trends,
} from '@domain/constants'
import type { AvalancheProblemType } from '@domain/types'
import _range from 'lodash/range'
import { useTranslations } from 'next-intl'

import { generateOptions } from '../helpers'

const useProblemOptions = () => {
  const t = useTranslations()

  const problemTypeOptions = generateOptions(
    Object.values(avalancheProblemTypes),
    'common.avalancheTypes',
    t,
  ) as { label: string; value: AvalancheProblemType }[]

  const avalancheSizeOptions = _range(1, 6).map((level) => ({ label: level, value: level }))
  const sensitivityOptions = generateOptions(
    sensitivityLevelsSorted,
    'admin.forecast.form.problems.options.sensitivityLevel',
    t,
  )
  const distributionOptions = generateOptions(
    Object.values(distributionTypes),
    'admin.forecast.form.problems.options.distribution',
    t,
  )
  const trendOptions = generateOptions(
    Object.values(trends),
    'admin.forecast.form.problems.options.trend',
    t,
  )
  const confidenceOptions = generateOptions(
    Object.values(confidenceLevels),
    'admin.forecast.form.problems.options.confidence',
    t,
  )
  const hazardLevelOptions = _range(0, 6).map((level) => ({ label: level, value: String(level) }))

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
