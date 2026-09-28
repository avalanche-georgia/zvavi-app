import {
  avalancheProblemTypes,
  confidenceLevels,
  distributionTypes,
  sensitivityLevelsSorted,
  trends,
} from '@domain/constants'
import type { AvalancheProblemType, AvalancheSize } from '@domain/types'
import { useTranslations } from 'next-intl'

// Ordinal order everywhere (low → high), not the legacy alphabetical one
const confidenceOrder = [confidenceLevels.low, confidenceLevels.moderate, confidenceLevels.high]
const trendOrder = [trends.improving, trends.noChange, trends.deteriorating]
const distributionOrder = [
  distributionTypes.isolated,
  distributionTypes.specific,
  distributionTypes.widespread,
]

export const avalancheSizes: AvalancheSize[] = [1, 2, 3, 4, 5]

const useProblemOptions = () => {
  const t = useTranslations()

  const toOptions = <T extends string>(values: readonly T[], getLabel: (value: T) => string) =>
    values.map((value) => ({ label: getLabel(value), value }))

  return {
    confidence: toOptions(confidenceOrder, (value) =>
      t(`admin.forecast.form.problems.options.confidence.${value}`),
    ),
    distribution: toOptions(distributionOrder, (value) =>
      t(`admin.forecast.form.problems.options.distribution.${value}`),
    ),
    sensitivity: toOptions(sensitivityLevelsSorted, (value) =>
      t(`admin.forecast.form.problems.options.sensitivityLevel.${value}`),
    ),
    size: avalancheSizes.map((size) => ({ label: String(size), value: String(size) })),
    trend: toOptions(trendOrder, (value) =>
      t(`admin.forecast.form.problems.options.trend.${value}`),
    ),
    type: Object.values(avalancheProblemTypes).map((type: AvalancheProblemType) => ({
      label: t(`common.avalancheTypes.${type}`),
      value: type,
    })),
  }
}

export default useProblemOptions
