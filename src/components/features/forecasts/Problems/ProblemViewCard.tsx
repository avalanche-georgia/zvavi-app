'use client'

import { useTranslations } from 'next-intl'

import ProblemCardBody from './ProblemCardBody'
import ProblemNumber from './ProblemNumber'
import type { ProblemValues } from './problemSchema'

type ProblemViewCardProps = {
  number: number
  problem: ProblemValues
}

// A problem on the read-only forecast view: priority, type, size, details
const ProblemViewCard = ({ number, problem }: ProblemViewCardProps) => {
  const t = useTranslations()
  const { avalancheSize, type } = problem

  return (
    <div className="border-rule bg-surface @container flex flex-col gap-2 rounded-[14px] border px-3.5 pt-3 pb-3.5">
      <div className="flex items-center gap-2.5">
        <ProblemNumber number={number} />
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="text-ink text-base font-semibold">{t(`common.avalancheTypes.${type}`)}</h3>
          <span className="bg-tile text-ink rounded-badge px-1.5 py-0.5 text-xs font-semibold whitespace-nowrap">
            {t('admin.forecast.editor.problems.size', { size: avalancheSize })}
          </span>
        </div>
      </div>
      <ProblemCardBody indentClassName="pl-8.5 @max-[440px]:pl-0" problem={problem} />
    </div>
  )
}

export default ProblemViewCard
