import {
  distributionTypesSorted,
  sensitivityLevelsSorted,
  sortedElevationZones,
  trendsSorted,
} from '@domain/constants'
import type { AvalancheSize, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import SizeDetails from './SizeDetails'
import type { ProblemField } from './types'

export type FieldInfoItem = {
  badge: string
  description: React.ReactNode
  isCurrent: boolean
  name: string
}

export type FieldInfoContent = {
  items: FieldInfoItem[]
  lead?: string
  listTitle: string
  title: string
}

const infoKey = 'forecast.sections.avalancheProblems.modal.info'
const labelsKey = 'forecast.sections.avalancheProblems.modal.labels'
const optionsKey = 'admin.forecast.form.problems.options'

const sizes: AvalancheSize[] = [1, 2, 3, 4, 5]

// The explanation of one problem property: its scale with this problem's value marked
const useFieldInfo = (field: ProblemField, problem: Problem): FieldInfoContent => {
  const t = useTranslations()
  const scale = { listTitle: t('forecast.page.scale'), title: t(`${labelsKey}.${field}`) }

  const toItems = <T extends string>(
    values: readonly T[],
    current: T,
    getName: (value: T) => string,
    getDescription: (value: T) => string,
  ) =>
    values.map((value, index) => ({
      badge: String(index + 1),
      description: getDescription(value),
      isCurrent: value === current,
      name: getName(value),
    }))

  const contentByField: Record<ProblemField, () => FieldInfoContent> = {
    aspects: () => ({
      items: sortedElevationZones.map((zone) => ({
        badge: t(`common.elevationZonesShort.${zone}`),
        description: t(`observations.form.elevationZones.${zone}`),
        isCurrent: false,
        name: t(`common.elevationZones.${zone}`),
      })),
      lead: t(`${infoKey}.aspects`),
      listTitle: t('forecast.page.elevationBands'),
      title: scale.title,
    }),
    distribution: () => ({
      ...scale,
      items: toItems(
        distributionTypesSorted,
        problem.distribution,
        (value) => t(`${optionsKey}.distribution.${value}`),
        (value) => t(`${infoKey}.distribution.${value}`),
      ),
    }),
    sensitivity: () => ({
      ...scale,
      items: toItems(
        sensitivityLevelsSorted,
        problem.sensitivity,
        (value) => t(`${optionsKey}.sensitivityLevel.${value}`),
        (value) => t(`${infoKey}.sensitivity.${value}`),
      ),
    }),
    size: () => ({
      ...scale,
      items: sizes.map((size) => ({
        badge: String(size),
        description: <SizeDetails size={size} />,
        isCurrent: size === problem.avalancheSize,
        name: t(`${infoKey}.size.${size}.description`),
      })),
    }),
    trend: () => ({
      ...scale,
      items: toItems(
        trendsSorted,
        problem.trend,
        (value) => t(`${optionsKey}.trend.${value}`),
        (value) => t(`${infoKey}.trend.${value}`),
      ),
    }),
  }

  return contentByField[field]()
}

export default useFieldInfo
