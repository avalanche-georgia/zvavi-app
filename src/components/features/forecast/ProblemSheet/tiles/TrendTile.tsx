import { trends } from '@domain/constants'
import type { Trend } from '@domain/types'
import { ArrowDownRight, ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import Tile from './Tile'

import { cn } from '@/lib/utils'

type TrendTileProps = {
  onInfoOpen: VoidFunction
  trend: Trend
}

// Getting better → getting worse
const trendIcons: [Trend, LucideIcon][] = [
  [trends.improving, ArrowDownRight],
  [trends.noChange, ArrowRight],
  [trends.deteriorating, ArrowUpRight],
]

const TrendTile = ({ onInfoOpen, trend }: TrendTileProps) => {
  const t = useTranslations()

  return (
    <Tile
      label={t('forecast.sections.avalancheProblems.modal.labels.trend')}
      onInfoOpen={onInfoOpen}
      value={t(`admin.forecast.form.problems.options.trend.${trend}`)}
    >
      <div aria-hidden className="flex gap-1.5">
        {trendIcons.map(([value, TrendIcon]) => (
          <span
            key={value}
            className={cn(
              'rounded-item grid h-7.5 flex-1 place-items-center',
              value === trend ? 'bg-accent text-white' : 'bg-surface text-off',
            )}
          >
            <TrendIcon className="size-4.5" />
          </span>
        ))}
      </div>
    </Tile>
  )
}

export default TrendTile
