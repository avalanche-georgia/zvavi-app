import type { AvalancheProblemType, Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type ForecastMetaProps = {
  forecaster: string | null
  // The problem filter, highlighted among the tags
  problem: AvalancheProblemType | null
  problems: Pick<Problem, 'order' | 'type'>[]
}

// Avalanche problem tags, then "· forecaster"
const ForecastMeta = ({ forecaster, problem, problems }: ForecastMetaProps) => {
  const t = useTranslations()

  if (problems.length === 0 && !forecaster) return null

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {problems.map(({ order, type }) => (
        <span
          key={order}
          className={cn(
            'rounded-badge text-caption inline-flex h-6 items-center px-2',
            type === problem
              ? 'bg-accent-soft text-accent font-semibold'
              : 'bg-tile text-body font-medium',
          )}
        >
          {t(`common.avalancheTypes.${type}`)}
        </span>
      ))}
      {forecaster && <span className="text-caption text-muted">· {forecaster}</span>}
    </div>
  )
}

export default ForecastMeta
