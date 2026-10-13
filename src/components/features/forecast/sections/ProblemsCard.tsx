import type { Problem } from '@domain/types'
import { useTranslations } from 'next-intl'

import ProblemRow from './ProblemRow'
import SectionCard from './SectionCard'
import { getProblemKey } from '../model/problemKey'

type ProblemsCardProps = {
  className?: string
  onProblemOpen: (index: number) => void
  // The problem whose sheet is open
  openIndex: number | null
  problems: Problem[]
}

const ProblemsCard = ({ className, onProblemOpen, openIndex, problems }: ProblemsCardProps) => {
  const t = useTranslations()

  return (
    <SectionCard
      className={className}
      count={problems.length}
      id="problems"
      title={t('admin.forecast.form.problems.title')}
    >
      <ol className="flex flex-col gap-2">
        {problems.map((problem, index) => (
          <li key={getProblemKey(problem)}>
            <ProblemRow
              isSelected={index === openIndex}
              onOpen={() => onProblemOpen(index)}
              problem={problem}
            />
          </li>
        ))}
      </ol>
    </SectionCard>
  )
}

export default ProblemsCard
