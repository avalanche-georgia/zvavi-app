import { problemIcons } from '@components/constants'
import { useAspectSummary } from '@components/hooks'
import type { Problem } from '@domain/types'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import ZoneAspectDots from './ZoneAspectDots'

import { cn } from '@/lib/utils'

type ProblemRowProps = {
  isSelected: boolean
  onOpen: VoidFunction
  problem: Problem
}

const optionsKey = 'admin.forecast.form.problems.options'

// Icon · type · "Size 2 · Stubborn · Isolated" · where. Opens the problem sheet.
const ProblemRow = ({ isSelected, onOpen, problem }: ProblemRowProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { aspects, avalancheSize, distribution, sensitivity, type } = problem
  const aspectSummary = getSummary(aspects)

  const meta = [
    t('forecast.page.sizeShort', { size: avalancheSize }),
    t(`${optionsKey}.sensitivityLevel.${sensitivity}`),
    t(`${optionsKey}.distribution.${distribution}`),
  ].join(' · ')

  return (
    <button
      aria-haspopup="dialog"
      className={cn(
        'focus-ring bg-surface grid w-full grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-3 rounded-[14px] border p-3 text-left',
        'transition-[border-color,box-shadow] duration-100',
        isSelected
          ? 'border-primary shadow-[0_0_0_1px_var(--color-primary)]'
          : 'border-rule hover:border-rule-strong',
      )}
      onClick={onOpen}
      type="button"
    >
      <Image
        alt=""
        className="size-13 rounded-xl"
        height={52}
        src={problemIcons[type]}
        width={52}
      />
      <span className="min-w-0">
        <span className="text-ink block text-base font-semibold tracking-[-.01em]">
          {t(`common.avalancheTypes.${type}`)}
        </span>
        <span className="text-body text-copy-sm mt-0.5 block">{meta}</span>
        {aspectSummary && (
          <span className="text-muted text-caption mt-2 flex items-center gap-2">
            <ZoneAspectDots aspects={aspects} />
            <span className="min-w-0">{aspectSummary}</span>
          </span>
        )}
      </span>
      <ChevronRight aria-hidden className="text-muted size-4.5" />
    </button>
  )
}

export default ProblemRow
