'use client'

import { AspectMiniGrid } from '@components/features/observations'
import { useAspectSummary } from '@components/hooks'
import { useTranslations } from 'next-intl'

import ProblemFacts from './ProblemFacts'
import type { ProblemValues } from './problemSchema'

import { cn } from '@/lib/utils'

type ProblemCardBodyProps = {
  // Under the description, e.g. the form's validation message
  children?: React.ReactNode
  // Replaces the whole indent (a className would keep the default's container-query reset)
  indentClassName?: string
  problem: ProblemValues
}

// Facts, aspects and description — shared by the form card and the read-only view card
const ProblemCardBody = ({
  children,
  indentClassName = 'pl-14.5 @max-[480px]:pl-0',
  problem,
}: ProblemCardBodyProps) => {
  const t = useTranslations()
  const { getSummary } = useAspectSummary()
  const { aspects, description } = problem

  return (
    <div className={cn('flex flex-col gap-3', indentClassName)}>
      <div className="flex gap-6 @max-[700px]:flex-col">
        <div className="flex-1">
          <ProblemFacts problem={problem} />
        </div>
        <div className="flex max-w-60 flex-col gap-1.5">
          <AspectMiniGrid aspects={aspects} />
          <p className="text-caption text-body">
            {getSummary(aspects) ?? t('admin.forecast.editor.problems.noAspects')}
          </p>
        </div>
      </div>
      {description && <p className="text-copy-sm text-body whitespace-pre-line">{description}</p>}
      {children}
    </div>
  )
}

export default ProblemCardBody
