import type { FullForecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import { JumpBar, type JumpChip } from './JumpBar'
import AvalanchesCard from './sections/AvalanchesCard'
import ConditionsCard from './sections/ConditionsCard'
import ProblemsCard from './sections/ProblemsCard'
import SummaryCard from './sections/SummaryCard'

type ForecastMainProps = {
  forecast: FullForecast
  onProblemOpen: (index: number) => void
  openProblemIndex: number | null
}

// `order-*` places the cards in the single-column (mobile) sequence, between
// the rail's cards; on desktop the column keeps its own DOM order
const orderClasses = {
  avalanches: 'order-6 lg:order-none',
  conditions: 'order-7 lg:order-none',
  jumpBar: 'order-3 lg:order-none',
  problems: 'order-5 lg:order-none',
  summary: 'order-4 lg:order-none',
}

// Jump bar → Summary → Problems → Recent avalanches → Conditions.
// Sections with nothing to show are left out, and so are their chips.
const ForecastMain = ({ forecast, onProblemOpen, openProblemIndex }: ForecastMainProps) => {
  const t = useTranslations()
  const { additionalHazards, avalancheProblems, recentAvalanches, snowpack, summary, weather } =
    forecast
  const hasProblems = avalancheProblems.length > 0
  const hasConditions = Boolean(snowpack || weather || additionalHazards)

  const chips: (JumpChip | false)[] = [
    Boolean(summary) && { id: 'summary', label: t('common.labels.summary') },
    hasProblems && {
      count: avalancheProblems.length,
      id: 'problems',
      label: t('forecast.page.jump.problems'),
    },
    {
      count: recentAvalanches.length || undefined,
      id: 'avalanches',
      label: t('forecast.page.jump.avalanches'),
    },
    hasConditions && { id: 'conditions', label: t('forecast.page.jump.conditions') },
  ]

  return (
    <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-3">
      <JumpBar chips={chips.filter((chip) => chip !== false)} className={orderClasses.jumpBar} />
      {summary && <SummaryCard className={orderClasses.summary} summary={summary} />}
      {hasProblems && (
        <ProblemsCard
          className={orderClasses.problems}
          onProblemOpen={onProblemOpen}
          openIndex={openProblemIndex}
          problems={avalancheProblems}
        />
      )}
      <AvalanchesCard
        avalanches={recentAvalanches}
        className={orderClasses.avalanches}
        regionId={forecast.regionId}
      />
      {hasConditions && <ConditionsCard className={orderClasses.conditions} forecast={forecast} />}
    </div>
  )
}

export default ForecastMain
