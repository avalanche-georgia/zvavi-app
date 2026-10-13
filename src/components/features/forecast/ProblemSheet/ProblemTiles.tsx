import { distributionTypesSorted, sensitivityLevelsSorted } from '@domain/constants'
import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import SizeBarsTile from './tiles/SizeBarsTile'
import StepsTile from './tiles/StepsTile'
import TimeTile from './tiles/TimeTile'
import TrendTile from './tiles/TrendTile'
import WhereTile from './tiles/WhereTile'
import type { ProblemField } from '../InfoSheet'

type ProblemTilesProps = {
  onInfoOpen: (field: ProblemField) => void
  problem: Problem
}

const labelsKey = 'forecast.sections.avalancheProblems.modal.labels'
const optionsKey = 'admin.forecast.form.problems.options'

// Where · Size · Sensitivity · Distribution · Trend · Time of day
const ProblemTiles = ({ onInfoOpen, problem }: ProblemTilesProps) => {
  const t = useTranslations()
  const { aspects, avalancheSize, distribution, sensitivity, trend } = problem

  const sensitivityLabel = (value: Problem['sensitivity']) =>
    t(`${optionsKey}.sensitivityLevel.${value}`)
  const distributionLabel = (value: Problem['distribution']) =>
    t(`${optionsKey}.distribution.${value}`)

  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <WhereTile aspects={aspects} onInfoOpen={() => onInfoOpen('aspects')} />
      <SizeBarsTile onInfoOpen={() => onInfoOpen('size')} size={avalancheSize} />
      <StepsTile
        activeIndex={sensitivityLevelsSorted.indexOf(sensitivity)}
        endLabels={[sensitivityLabel('unreactive'), sensitivityLabel('touchy')]}
        label={t(`${labelsKey}.sensitivity`)}
        onInfoOpen={() => onInfoOpen('sensitivity')}
        stepCount={sensitivityLevelsSorted.length}
        value={sensitivityLabel(sensitivity)}
      />
      <StepsTile
        activeIndex={distributionTypesSorted.indexOf(distribution)}
        endLabels={[distributionLabel('isolated'), distributionLabel('widespread')]}
        label={t(`${labelsKey}.distribution`)}
        onInfoOpen={() => onInfoOpen('distribution')}
        stepCount={distributionTypesSorted.length}
        value={distributionLabel(distribution)}
      />
      <TrendTile onInfoOpen={() => onInfoOpen('trend')} trend={trend} />
      <TimeTile problem={problem} />
    </div>
  )
}

export default ProblemTiles
